---
status: pending
priority: p2
issue_id: "007"
tags: [components, agent-rules, shadcn]
dependencies: []
---

# Create AgentRuleCard Component for Copyable Rules

## Problem Statement

Agent rules exist in `src/data/agentRules.ts` but there's no dedicated card component for displaying them. Current implementation is just a copy button in PrincipleView.

## Findings

Current implementation:
- Copy button in PrincipleView header
- Rules stored in agentRules.ts with MUST/SHOULD/NEVER priorities
- No visual indication of rule priority

Desired:
- Dedicated card component showing the rule
- Priority badge (MUST=red, SHOULD=yellow, NEVER=gray)
- Copy button with success feedback
- Code example display (if present)

## Proposed Solutions

Create `src/components/AgentRuleCard.tsx`:

```tsx
interface AgentRuleCardProps {
  rule: AgentRule;
  onCopy?: () => void;
}

export function AgentRuleCard({ rule, onCopy }: AgentRuleCardProps) {
  return (
    <Card>
      <CardHeader>
        <Badge variant={priorityVariant[rule.priority]}>
          {rule.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{rule.rule}</p>
        {rule.codeExample && <pre>{rule.codeExample}</pre>}
      </CardContent>
      <CardFooter>
        <Button onClick={onCopy}>Copy Rule</Button>
      </CardFooter>
    </Card>
  );
}
```

## Recommended Action

_To be filled during triage_

## Acceptance Criteria

- [ ] AgentRuleCard component created
- [ ] Priority badges display correctly
- [ ] Copy functionality works
- [ ] Code examples render with syntax highlighting
- [ ] Integrated into PrincipleView

## Work Log

### 2025-01-15 - Created Issue

**By:** Claude Code

**Actions:**
- Created tracking issue
- Documented component interface
