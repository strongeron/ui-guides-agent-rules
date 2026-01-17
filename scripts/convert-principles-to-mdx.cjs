#!/usr/bin/env node
/**
 * Script to convert principles from TypeScript to MDX files
 * Run with: node scripts/convert-principles-to-mdx.js
 */

const fs = require('fs');
const path = require('path');

// Read the principles.ts file
const principlesPath = path.join(__dirname, '../src/data/principles.ts');
const principlesContent = fs.readFileSync(principlesPath, 'utf8');

// Extract principles array using regex (since we can't import TS directly)
const principlesArrayMatch = principlesContent.match(/export const principles: Principle\[\] = \[([\s\S]*)\];/);
if (!principlesArrayMatch) {
  console.error('Could not find principles array');
  process.exit(1);
}

// Parse individual principle objects
const principleRegex = /\{[\s\S]*?id:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?source:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?description:\s*'([^']*)'[\s\S]*?sourceQuote:\s*'([^']*)'[\s\S]*?additionalExplanation:\s*'([^']*)'[\s\S]*?sourceLinks:\s*\[([\s\S]*?)\][\s\S]*?badExampleKey:\s*'([^']+)'[\s\S]*?goodExampleKey:\s*'([^']+)'/g;

// More robust parsing - split by principle objects
const principleBlocks = principlesContent.split(/(?=\{\s*id:\s*')/g).filter(block => block.includes("id: '"));

const principles = [];

for (const block of principleBlocks) {
  // Skip if not a complete block
  if (!block.includes('goodExampleKey')) continue;

  const idMatch = block.match(/id:\s*'([^']+)'/);
  const categoryMatch = block.match(/category:\s*'([^']+)'/);
  const sourceMatch = block.match(/source:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const descriptionMatch = block.match(/description:\s*'([^']*)'/);
  const sourceQuoteMatch = block.match(/sourceQuote:\s*'([^']*)'/);
  const additionalExplanationMatch = block.match(/additionalExplanation:\s*'([^']*)'/);
  const badExampleKeyMatch = block.match(/badExampleKey:\s*'([^']+)'/);
  const goodExampleKeyMatch = block.match(/goodExampleKey:\s*'([^']+)'/);

  // Extract source links
  const sourceLinksMatch = block.match(/sourceLinks:\s*\[([\s\S]*?)\]/);
  const sourceLinks = [];
  if (sourceLinksMatch) {
    const linksText = sourceLinksMatch[1];
    const linkMatches = linksText.matchAll(/\{\s*text:\s*'([^']+)',\s*url:\s*'([^']+)'\s*\}/g);
    for (const match of linkMatches) {
      sourceLinks.push({ text: match[1], url: match[2] });
    }
  }

  if (idMatch && categoryMatch && titleMatch) {
    principles.push({
      id: idMatch[1],
      category: categoryMatch[1],
      source: sourceMatch ? sourceMatch[1] : 'vercel',
      title: titleMatch[1],
      description: descriptionMatch ? descriptionMatch[1].replace(/\\'/g, "'") : '',
      sourceQuote: sourceQuoteMatch ? sourceQuoteMatch[1].replace(/\\'/g, "'") : '',
      additionalExplanation: additionalExplanationMatch ? additionalExplanationMatch[1].replace(/\\'/g, "'") : '',
      sourceLinks,
      badExampleKey: badExampleKeyMatch ? badExampleKeyMatch[1] : '',
      goodExampleKey: goodExampleKeyMatch ? goodExampleKeyMatch[1] : ''
    });
  }
}

console.log(`Found ${principles.length} principles`);

// Existing MDX files (to skip)
const existingMdx = [
  'forms-enter-submits',
  'animations-prefers-reduced-motion',
  'content-inline-help-first',
  'design-layered-shadows',
  'interactions-keyboard-everywhere',
  'layout-optical-alignment',
  'performance-large-lists'
];

const contentDir = path.join(__dirname, '../content/principles');

// Ensure category directories exist
const categories = [...new Set(principles.map(p => p.category))];
for (const category of categories) {
  const categoryDir = path.join(contentDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
    console.log(`Created directory: ${categoryDir}`);
  }
}

let created = 0;
let skipped = 0;

for (const principle of principles) {
  // Skip if already has MDX file
  if (existingMdx.includes(principle.id)) {
    skipped++;
    continue;
  }

  // Generate filename from id (e.g., forms-textarea-behavior -> textarea-behavior.mdx)
  const filename = principle.id.replace(`${principle.category}-`, '') + '.mdx';
  const filepath = path.join(contentDir, principle.category, filename);

  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`Skipping existing: ${filepath}`);
    skipped++;
    continue;
  }

  // Generate MDX content
  const sourceLinksSection = principle.sourceLinks.length > 0
    ? `\n## Learn More\n\n${principle.sourceLinks.map(link => `- [${link.text}](${link.url})`).join('\n')}\n`
    : '';

  const mdxContent = `---
id: ${principle.id}
category: ${principle.category}
source: ${principle.source}
title: ${principle.title}
description: ${principle.description}
badExampleKey: ${principle.badExampleKey}
goodExampleKey: ${principle.goodExampleKey}
---

import { Callout, ExampleComparison } from '@/components/mdx';

<Callout type="quote" title="From the Guidelines">
  ${principle.sourceQuote}
</Callout>

## Why This Matters

${principle.additionalExplanation}

## Implementation

<ExampleComparison
  badKey="${principle.badExampleKey}"
  goodKey="${principle.goodExampleKey}"
/>
${sourceLinksSection}`;

  fs.writeFileSync(filepath, mdxContent);
  console.log(`Created: ${filepath}`);
  created++;
}

console.log(`\nDone! Created ${created} MDX files, skipped ${skipped}`);
