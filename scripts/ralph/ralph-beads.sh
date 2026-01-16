#!/bin/bash
# ralph-beads.sh - Autonomous workflow combining Beads + Ralph Loop + Compound Agents
#
# Usage: ./ralph-beads.sh [options]
#   --max-iterations N    Maximum iterations (default: 50)
#   --dry-run             Show what would happen without executing
#   --reset-circuit       Reset circuit breaker state
#   --verbose             Enable verbose logging

set -euo pipefail

# Configuration
MAX_ITERATIONS="${MAX_ITERATIONS:-50}"
RATE_LIMIT_HOURLY="${RATE_LIMIT_HOURLY:-100}"
CIRCUIT_ERROR_THRESHOLD=3
CIRCUIT_SUCCESS_THRESHOLD=2

# State files
STATE_DIR=".ralph"
LOG_DIR="$STATE_DIR/logs"
RESPONSE_FILE="$STATE_DIR/response.json"
CIRCUIT_STATE_FILE="$STATE_DIR/circuit_state"
CONSECUTIVE_ERRORS_FILE="$STATE_DIR/consecutive_errors"
CONSECUTIVE_SUCCESSES_FILE="$STATE_DIR/consecutive_successes"
PREVIOUS_HASH_FILE="$STATE_DIR/previous_hash"
CALL_COUNT_FILE="$STATE_DIR/call_count"
HOUR_START_FILE="$STATE_DIR/hour_start"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
  local level="$1"
  shift
  local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
  local color=""

  case "$level" in
    INFO)  color="$BLUE" ;;
    OK)    color="$GREEN" ;;
    WARN)  color="$YELLOW" ;;
    ERROR) color="$RED" ;;
  esac

  echo -e "${color}[$timestamp] [$level]${NC} $*"
  echo "[$timestamp] [$level] $*" >> "$LOG_DIR/ralph.log"
}

# Initialize state directory
init_state() {
  mkdir -p "$STATE_DIR" "$LOG_DIR"

  # Initialize files if they don't exist
  [[ ! -f "$CIRCUIT_STATE_FILE" ]] && echo "CLOSED" > "$CIRCUIT_STATE_FILE"
  [[ ! -f "$CONSECUTIVE_ERRORS_FILE" ]] && echo "0" > "$CONSECUTIVE_ERRORS_FILE"
  [[ ! -f "$CONSECUTIVE_SUCCESSES_FILE" ]] && echo "0" > "$CONSECUTIVE_SUCCESSES_FILE"
  [[ ! -f "$CALL_COUNT_FILE" ]] && echo "0" > "$CALL_COUNT_FILE"

  log INFO "State directory initialized: $STATE_DIR"
}

# Check if beads is available
check_prerequisites() {
  if ! command -v bd &> /dev/null; then
    log ERROR "beads (bd) not found. Install with: npm install -g @beads/bd"
    exit 1
  fi

  if ! command -v claude &> /dev/null; then
    log ERROR "claude CLI not found. Install Claude Code first."
    exit 1
  fi

  if [[ ! -d ".beads" ]]; then
    log ERROR ".beads directory not found. Run: bd init"
    exit 1
  fi

  if ! command -v jq &> /dev/null; then
    log ERROR "jq not found. Install with: brew install jq"
    exit 1
  fi

  log OK "Prerequisites check passed"
}

# Get next ready task from beads
get_next_task() {
  local task_json
  task_json=$(bd ready --json --limit 1 2>/dev/null || echo "[]")

  if [[ "$task_json" == "[]" ]] || [[ -z "$task_json" ]]; then
    echo ""
    return
  fi

  echo "$task_json" | jq -r '.[0] // empty'
}

# Detect phase from task labels
detect_phase() {
  local task_json="$1"
  local labels
  labels=$(echo "$task_json" | jq -r '.labels // [] | .[]' 2>/dev/null)

  # Priority order: plan -> work -> review -> compound
  if echo "$labels" | grep -q "^plan$"; then
    echo "plan"
  elif echo "$labels" | grep -q "^review$"; then
    echo "review"
  elif echo "$labels" | grep -q "^compound$"; then
    echo "compound"
  else
    echo "work"  # Default phase
  fi
}

# Get compound agents for phase
get_agents_for_phase() {
  local phase="$1"

  case "$phase" in
    "plan")
      echo "repo-research-analyst, best-practices-researcher, framework-docs-researcher, spec-flow-analyzer"
      ;;
    "work")
      echo "execution with TodoWrite tracking"
      ;;
    "review")
      echo "kieran-typescript-reviewer, security-sentinel, performance-oracle, architecture-strategist, code-simplicity-reviewer, pattern-recognition-specialist"
      ;;
    "compound")
      echo "documentation agents for capturing learnings"
      ;;
    *)
      echo "general-purpose"
      ;;
  esac
}

# Rate limiting
check_rate_limit() {
  local current_hour=$(date +%H)
  local stored_hour=$(cat "$HOUR_START_FILE" 2>/dev/null || echo "-1")

  # Reset counter on new hour
  if [[ "$current_hour" != "$stored_hour" ]]; then
    echo "0" > "$CALL_COUNT_FILE"
    echo "$current_hour" > "$HOUR_START_FILE"
    log INFO "Rate limit counter reset for new hour"
  fi

  local count=$(cat "$CALL_COUNT_FILE")
  if [[ $count -ge $RATE_LIMIT_HOURLY ]]; then
    local mins_remaining=$((60 - $(date +%M)))
    log WARN "Rate limit reached ($count/$RATE_LIMIT_HOURLY). Waiting $mins_remaining minutes..."
    sleep $((mins_remaining * 60))
    echo "0" > "$CALL_COUNT_FILE"
  fi

  echo $((count + 1)) > "$CALL_COUNT_FILE"
}

# Circuit breaker
check_circuit_breaker() {
  local state=$(cat "$CIRCUIT_STATE_FILE" 2>/dev/null || echo "CLOSED")

  if [[ "$state" == "OPEN" ]]; then
    log ERROR "Circuit breaker OPEN - too many consecutive failures"
    log ERROR "Run with --reset-circuit to reset"
    return 1
  fi

  return 0
}

update_circuit_breaker() {
  local success="$1"
  local state=$(cat "$CIRCUIT_STATE_FILE")
  local consecutive_errors=$(cat "$CONSECUTIVE_ERRORS_FILE")
  local consecutive_successes=$(cat "$CONSECUTIVE_SUCCESSES_FILE")

  case "$state" in
    "CLOSED")
      if [[ "$success" == "false" ]]; then
        consecutive_errors=$((consecutive_errors + 1))
        echo "$consecutive_errors" > "$CONSECUTIVE_ERRORS_FILE"
        echo "0" > "$CONSECUTIVE_SUCCESSES_FILE"

        if [[ $consecutive_errors -ge $CIRCUIT_ERROR_THRESHOLD ]]; then
          echo "OPEN" > "$CIRCUIT_STATE_FILE"
          log ERROR "Circuit breaker OPENED after $consecutive_errors consecutive failures"
          return 1
        fi
      else
        echo "0" > "$CONSECUTIVE_ERRORS_FILE"
      fi
      ;;
    "HALF_OPEN")
      if [[ "$success" == "true" ]]; then
        consecutive_successes=$((consecutive_successes + 1))
        echo "$consecutive_successes" > "$CONSECUTIVE_SUCCESSES_FILE"

        if [[ $consecutive_successes -ge $CIRCUIT_SUCCESS_THRESHOLD ]]; then
          echo "CLOSED" > "$CIRCUIT_STATE_FILE"
          echo "0" > "$CONSECUTIVE_ERRORS_FILE"
          log OK "Circuit breaker CLOSED - recovered"
        fi
      else
        echo "OPEN" > "$CIRCUIT_STATE_FILE"
        log ERROR "Circuit breaker reopened - recovery failed"
        return 1
      fi
      ;;
  esac

  return 0
}

reset_circuit_breaker() {
  echo "CLOSED" > "$CIRCUIT_STATE_FILE"
  echo "0" > "$CONSECUTIVE_ERRORS_FILE"
  echo "0" > "$CONSECUTIVE_SUCCESSES_FILE"
  log OK "Circuit breaker reset to CLOSED"
}

# Detect stagnation (no progress)
detect_stagnation() {
  if [[ ! -f "$RESPONSE_FILE" ]]; then
    return 0  # No stagnation on first run
  fi

  local current_hash=$(md5 -q "$RESPONSE_FILE" 2>/dev/null || md5sum "$RESPONSE_FILE" | cut -d' ' -f1)
  local previous_hash=$(cat "$PREVIOUS_HASH_FILE" 2>/dev/null || echo "")

  if [[ "$current_hash" == "$previous_hash" ]]; then
    log WARN "Stagnation detected - identical response to previous iteration"
    return 1
  fi

  echo "$current_hash" > "$PREVIOUS_HASH_FILE"
  return 0
}

# Dual-gate exit detection
check_exit_conditions() {
  local response_file="$1"
  local completion_indicators=0
  local exit_signal="false"

  if [[ ! -f "$response_file" ]]; then
    return 1
  fi

  # Gate 1: Heuristic pattern matching
  if grep -qiE "(all tasks (are )?complete|nothing left to do|workflow complete)" "$response_file"; then
    completion_indicators=$((completion_indicators + 1))
  fi

  if grep -qiE "(ready to ship|fully implemented|successfully finished)" "$response_file"; then
    completion_indicators=$((completion_indicators + 1))
  fi

  # Gate 2: Explicit signal (look for RALPH_STATUS block)
  if grep -q "EXIT_SIGNAL.*true" "$response_file"; then
    exit_signal="true"
  fi

  # Also check if beads has no ready tasks
  local ready_count=$(bd ready --json 2>/dev/null | jq 'length' 2>/dev/null || echo "1")

  log INFO "Exit check: indicators=$completion_indicators, explicit_signal=$exit_signal, ready_tasks=$ready_count"

  # BOTH gates must pass, OR no ready tasks
  if [[ "$ready_count" == "0" ]]; then
    log OK "All beads tasks completed!"
    return 0
  fi

  if [[ $completion_indicators -ge 2 ]] && [[ "$exit_signal" == "true" ]]; then
    return 0
  fi

  return 1
}

# Build prompt for Claude
build_prompt() {
  local task_json="$1"
  local phase="$2"
  local agents="$3"
  local task_id=$(echo "$task_json" | jq -r '.id')
  local task_title=$(echo "$task_json" | jq -r '.title')
  local task_description=$(echo "$task_json" | jq -r '.description // "No description"')

  cat << EOF
# Ralph-Beads Iteration

## Current Task
- **ID**: $task_id
- **Title**: $task_title
- **Phase**: $phase
- **Description**: $task_description

## Instructions

You are in a Ralph loop iteration. This means:
1. You have fresh context - previous iterations are not in your memory
2. State is preserved in .beads/ (use \`bd\` commands to read/update)
3. Complete this task, then update beads status

## Phase: $phase

For this phase, consider using these compound agents via the Task tool:
$agents

## Workflow

1. **Read current state**: Check \`bd ready --json\` for context
2. **Execute the task**: Do the work described above
3. **Update beads**:
   - \`bd update $task_id --status in_progress\` (if not already)
   - Create subtasks if needed: \`bd create "title" --deps discovered-from:$task_id\`
   - When done: \`bd close $task_id --reason "description of what was done"\`
4. **Report status**: Include a RALPH_STATUS block in your response

## RALPH_STATUS Block (REQUIRED)

At the end of your response, include:

\`\`\`json
{
  "ralph_status": {
    "task_id": "$task_id",
    "status": "COMPLETE|IN_PROGRESS|BLOCKED",
    "exit_signal": true/false,
    "work_summary": "Brief description of what was done",
    "next_steps": "What remains, if anything"
  }
}
\`\`\`

Set \`exit_signal: true\` ONLY if:
- This task is fully complete AND
- You've updated beads (closed the task) AND
- No immediate follow-up work is needed

Now proceed with the task.
EOF
}

# Main execution loop
run_iteration() {
  local iteration="$1"
  local task_json="$2"
  local phase="$3"
  local agents="$4"
  local task_id=$(echo "$task_json" | jq -r '.id')

  log INFO "=== Iteration $iteration: $task_id ($phase phase) ==="

  # Build prompt
  local prompt
  prompt=$(build_prompt "$task_json" "$phase" "$agents")

  # Check rate limit
  check_rate_limit

  # Execute Claude with fresh context
  log INFO "Executing Claude Code..."

  # Save prompt for debugging
  echo "$prompt" > "$STATE_DIR/last_prompt.md"

  # Run Claude and capture output
  if claude --print -p "$prompt" --output-format json > "$RESPONSE_FILE" 2>&1; then
    log OK "Claude execution completed"
    return 0
  else
    log ERROR "Claude execution failed"
    return 1
  fi
}

# Main function
main() {
  local dry_run=false
  local verbose=false

  # Parse arguments
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --max-iterations)
        MAX_ITERATIONS="$2"
        shift 2
        ;;
      --dry-run)
        dry_run=true
        shift
        ;;
      --reset-circuit)
        init_state
        reset_circuit_breaker
        exit 0
        ;;
      --verbose)
        verbose=true
        shift
        ;;
      *)
        log ERROR "Unknown option: $1"
        exit 1
        ;;
    esac
  done

  # Initialize
  init_state
  check_prerequisites

  log INFO "Starting Ralph-Beads workflow (max iterations: $MAX_ITERATIONS)"

  # Main loop
  for iteration in $(seq 1 "$MAX_ITERATIONS"); do
    # Check circuit breaker
    if ! check_circuit_breaker; then
      exit 1
    fi

    # Get next ready task
    local task_json
    task_json=$(get_next_task)

    if [[ -z "$task_json" ]]; then
      log OK "No ready tasks - workflow complete!"
      exit 0
    fi

    local task_id=$(echo "$task_json" | jq -r '.id')
    local task_title=$(echo "$task_json" | jq -r '.title')

    # Detect phase
    local phase
    phase=$(detect_phase "$task_json")

    # Get agents for phase
    local agents
    agents=$(get_agents_for_phase "$phase")

    log INFO "Task: $task_id - $task_title"
    log INFO "Phase: $phase | Agents: $agents"

    if [[ "$dry_run" == "true" ]]; then
      log INFO "[DRY RUN] Would execute iteration $iteration"
      continue
    fi

    # Run iteration
    local success=true
    if ! run_iteration "$iteration" "$task_json" "$phase" "$agents"; then
      success=false
    fi

    # Check for stagnation
    if ! detect_stagnation; then
      update_circuit_breaker "false"
      continue
    fi

    # Update circuit breaker
    update_circuit_breaker "$success"

    # Check exit conditions
    if check_exit_conditions "$RESPONSE_FILE"; then
      log OK "Exit conditions met - workflow complete!"
      exit 0
    fi

    # Brief pause between iterations
    sleep 2
  done

  log WARN "Max iterations ($MAX_ITERATIONS) reached"
  exit 1
}

# Run main
main "$@"
