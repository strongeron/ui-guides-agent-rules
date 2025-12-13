import { ExternalLink, AlertCircle, CheckCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Principle } from '../types/principle';
import { ExampleRenderer } from './ExampleRenderer';
import { getAgentRule } from '../data/agentRules';

interface PrincipleViewProps {
  principle: Principle;
}

export function PrincipleView({ principle }: PrincipleViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAgentRule = async () => {
    const agentRule = getAgentRule(principle.id);
    try {
      await navigator.clipboard.writeText(agentRule);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="pt-16 pb-24 px-4 max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
            {principle.category.toUpperCase()}
          </div>
          <button
            onClick={handleCopyAgentRule}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            aria-label="Copy agent rule"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Agent Rule</span>
              </>
            )}
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {principle.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{principle.description}</p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">
            From the Guidelines:
          </h2>
          <blockquote className="text-sm text-blue-800 italic">
            "{principle.sourceQuote}"
          </blockquote>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">
            Additional Context:
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {principle.additionalExplanation}
          </p>
        </div>

        {principle.sourceLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {principle.sourceLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
              >
                {link.text}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-2 border-red-200 rounded-xl overflow-hidden bg-white">
          <div className="bg-red-50 border-b-2 border-red-200 px-4 py-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Bad Example</h3>
          </div>
          <div className="p-6 min-h-[300px] flex items-center justify-center">
            <ExampleRenderer exampleKey={principle.badExampleKey} />
          </div>
        </div>

        <div className="border-2 border-green-200 rounded-xl overflow-hidden bg-white">
          <div className="bg-green-50 border-b-2 border-green-200 px-4 py-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Good Example</h3>
          </div>
          <div className="p-6 min-h-[300px] flex items-center justify-center">
            <ExampleRenderer exampleKey={principle.goodExampleKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
