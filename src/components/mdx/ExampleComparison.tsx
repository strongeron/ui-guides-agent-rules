import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  CheckmarkCircle01Icon,
} from '@hugeicons/core-free-icons';
import { ExampleRenderer } from '../ExampleRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExampleComparisonProps {
  badKey: string;
  goodKey: string;
  badTitle?: string;
  goodTitle?: string;
}

export function ExampleComparison({
  badKey,
  goodKey,
  badTitle = 'Bad Example',
  goodTitle = 'Good Example',
}: ExampleComparisonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      <Card className="border-2 border-red-200 overflow-hidden">
        <CardHeader className="bg-red-50 border-b-2 border-red-200 py-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-red-900">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              size={20}
              className="text-red-600"
            />
            {badTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
          <ExampleRenderer exampleKey={badKey} />
        </CardContent>
      </Card>

      <Card className="border-2 border-green-200 overflow-hidden">
        <CardHeader className="bg-green-50 border-b-2 border-green-200 py-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-green-900">
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              size={20}
              className="text-green-600"
            />
            {goodTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 min-h-[200px] flex items-center justify-center">
          <ExampleRenderer exampleKey={goodKey} />
        </CardContent>
      </Card>
    </div>
  );
}
