
import React from 'react';
import { Check, X } from 'lucide-react';

interface FeatureItem {
  feature: string;
  veriWrite: boolean;
  competitors: boolean;
}

const features: FeatureItem[] = [
  {
    feature: 'Text-based plagiarism detection',
    veriWrite: true,
    competitors: true,
  },
  {
    feature: 'Handwritten document scanning',
    veriWrite: true,
    competitors: false,
  },
  {
    feature: 'Semantic analysis for paraphrased content',
    veriWrite: true,
    competitors: false,
  },
  {
    feature: 'Cross-language plagiarism detection',
    veriWrite: true,
    competitors: false,
  },
  {
    feature: 'Source tracking & citation assistance',
    veriWrite: true,
    competitors: true,
  },
  {
    feature: 'Classroom integration',
    veriWrite: true,
    competitors: true,
  },
  {
    feature: 'AI writing detection',
    veriWrite: true,
    competitors: false,
  },
];

const FeatureComparison: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary/70">
              <th className="py-4 px-6 text-left font-semibold">Feature</th>
              <th className="py-4 px-6 text-center font-semibold">
                <span className="flex items-center justify-center gap-2">
                  <span className="text-veri">Veri</span>
                  <span className="text-write">Write</span>
                </span>
              </th>
              <th className="py-4 px-6 text-center font-semibold">Competitors</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {features.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}>
                <td className="py-4 px-6">{item.feature}</td>
                <td className="py-4 px-6 text-center">
                  {item.veriWrite ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.competitors ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;
