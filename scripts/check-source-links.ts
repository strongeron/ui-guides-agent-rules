#!/usr/bin/env npx tsx
/**
 * Source Links Checker
 * Validates all sourceLink URLs in principles are accessible
 */

import { writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { principles as principlesData } from '../src/data/principles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface SourceLink {
  text: string;
  url: string;
}

interface LinkCheckResult {
  url: string;
  text: string;
  principleId: string;
  status: 'ok' | 'error' | 'redirect' | 'timeout';
  statusCode?: number;
  redirectUrl?: string;
  error?: string;
  responseTime?: number;
}

interface PrincipleLinks {
  id: string;
  category: string;
  title: string;
  sourceLinks: SourceLink[];
}

function extractSourceLinks(): PrincipleLinks[] {
  return principlesData.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    sourceLinks: p.sourceLinks,
  }));
}

// Check a single URL using native fetch
async function checkUrl(url: string, principleId: string, text: string): Promise<LinkCheckResult> {
  const startTime = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const request = (method: 'HEAD' | 'GET') =>
      fetch(url, {
        method,
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PrincipleValidator/1.0)',
        },
      });

    let response = await request('HEAD');

    // Some hosts (material.io, several CDNs) reject HEAD outright. A 405/403 says
    // nothing about whether the page exists, so confirm with GET before calling it
    // broken — otherwise the checker invents dead links that load fine in a browser.
    if (response.status === 405 || response.status === 403) {
      response = await request('GET');
    }

    clearTimeout(timeout);
    const responseTime = Date.now() - startTime;

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get('location') || undefined;
      return {
        url,
        text,
        principleId,
        status: 'redirect',
        statusCode: response.status,
        redirectUrl,
        responseTime,
      };
    }

    // Handle success
    if (response.ok) {
      return {
        url,
        text,
        principleId,
        status: 'ok',
        statusCode: response.status,
        responseTime,
      };
    }

    // Handle errors
    return {
      url,
      text,
      principleId,
      status: 'error',
      statusCode: response.status,
      error: `HTTP ${response.status}`,
      responseTime,
    };
  } catch (err) {
    clearTimeout(timeout);
    const error = err as Error;

    if (error.name === 'AbortError') {
      return {
        url,
        text,
        principleId,
        status: 'timeout',
        error: 'Request timed out after 10s',
      };
    }

    return {
      url,
      text,
      principleId,
      status: 'error',
      error: error.message,
    };
  }
}

// Main function
async function main() {
  console.log('🔗 Checking Source Links...\n');

  const principles = extractSourceLinks();
  const allLinks: { url: string; text: string; principleId: string }[] = [];

  // Collect all unique URLs
  for (const principle of principles) {
    for (const link of principle.sourceLinks) {
      allLinks.push({
        url: link.url,
        text: link.text,
        principleId: principle.id,
      });
    }
  }

  console.log(`Found ${allLinks.length} source links across ${principles.length} principles\n`);

  // Check all URLs with concurrency limit
  const results: LinkCheckResult[] = [];
  const batchSize = 5;

  for (let i = 0; i < allLinks.length; i += batchSize) {
    const batch = allLinks.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(link => checkUrl(link.url, link.principleId, link.text))
    );
    results.push(...batchResults);

    // Progress indicator
    const progress = Math.min(i + batchSize, allLinks.length);
    process.stdout.write(`\rChecked ${progress}/${allLinks.length} links...`);
  }

  console.log('\n');

  // Categorize results
  const ok = results.filter(r => r.status === 'ok');
  const redirects = results.filter(r => r.status === 'redirect');
  const errors = results.filter(r => r.status === 'error');
  const timeouts = results.filter(r => r.status === 'timeout');

  // Print summary
  console.log('📊 Summary\n');
  console.log(`✅ OK: ${ok.length}`);
  console.log(`↪️ Redirects: ${redirects.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⏱️ Timeouts: ${timeouts.length}`);

  // Print details for issues
  if (errors.length > 0) {
    console.log('\n\n❌ Error Details\n');
    for (const result of errors) {
      console.log(`**${result.principleId}**`);
      console.log(`  URL: ${result.url}`);
      console.log(`  Text: ${result.text}`);
      console.log(`  Error: ${result.error}`);
      console.log('');
    }
  }

  if (redirects.length > 0) {
    console.log('\n↪️ Redirect Details\n');
    for (const result of redirects) {
      console.log(`**${result.principleId}**`);
      console.log(`  URL: ${result.url}`);
      console.log(`  Redirects to: ${result.redirectUrl}`);
      console.log('');
    }
  }

  if (timeouts.length > 0) {
    console.log('\n⏱️ Timeout Details\n');
    for (const result of timeouts) {
      console.log(`**${result.principleId}**`);
      console.log(`  URL: ${result.url}`);
      console.log('');
    }
  }

  // Save results to JSON
  const outputPath = join(rootDir, 'doc/source-links-results.json');
  writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalLinks: allLinks.length,
    summary: {
      ok: ok.length,
      redirects: redirects.length,
      errors: errors.length,
      timeouts: timeouts.length,
    },
    results,
  }, null, 2));

  console.log(`\n📁 Results saved to ${relative(rootDir, outputPath)}`);

  // Exit with error if issues found
  const hasIssues = errors.length > 0 || timeouts.length > 0;
  process.exit(hasIssues ? 1 : 0);
}

main().catch(console.error);
