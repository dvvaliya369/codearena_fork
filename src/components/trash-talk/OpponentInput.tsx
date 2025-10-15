"use client";

import { Button } from "@/components/ui/button";
import { exampleTrashTalks } from "@/lib/trash-talk-generator";
import { useState } from "react";

interface OpponentInputProps {
  opponent: string;
  onOpponentChange: (opponent: string) => void;
}

export function OpponentInput({ opponent, onOpponentChange }: OpponentInputProps) {
  const [showExamples, setShowExamples] = useState(false);

  const handleExampleClick = (example: string) => {
    // Extract just the name from the example (first word after the comma before the first space)  
    const name = example.split(',')[0];
    onOpponentChange(name);
    setShowExamples(false);
  };

  const exampleNames = ["Dave", "Sarah", "Mike", "Jenny", "Alex", "Chris", "Taylor", "Jordan"];

  return (
    <div className="space-y-3">
      <div className="relative">
        <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 mb-1">
          Who&apos;s your opponent? 🥊
        </label>
        <div className="relative">
          <input
            id="opponent"
            type="text"
            value={opponent}
            onChange={(e) => onOpponentChange(e.target.value)}
            placeholder="Enter opponent's name (e.g., Dave, Sarah, Mike...)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            maxLength={20}
          />
          {opponent && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-orange-500" role="img" aria-label="target">
                🎯
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowExamples(!showExamples)}
          className="text-xs"
        >
          {showExamples ? "Hide" : "Show"} Examples
        </Button>
        <span className="text-xs text-gray-500">
          Need inspiration? Try these names!
        </span>
      </div>

      {showExamples && (
        <div className="space-y-2">
          <div className="text-xs text-gray-600 font-medium">Quick Names:</div>
          <div className="flex flex-wrap gap-1">
            {exampleNames.map((name) => (
              <Button
                key={name}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpponentChange(name)}
                className="text-xs px-2 py-1 h-auto hover:bg-orange-100 hover:border-orange-300"
              >
                {name}
              </Button>
            ))}
          </div>
          
          <div className="text-xs text-gray-600 font-medium mt-3">Example Trash Talks:</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {exampleTrashTalks.slice(0, 3).map((example, index) => (
              <div
                key={index}
                className="text-xs p-2 bg-orange-50 border border-orange-200 rounded cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => handleExampleClick(example)}
              >
                &quot;{example}&quot;
              </div>
            ))}
          </div>
        </div>
      )}

      {opponent && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <div className="text-xs text-red-700">
            <span className="font-medium">Target locked:</span> {opponent} is about to get roasted! 🔥
          </div>
        </div>
      )}
    </div>
  );
}
