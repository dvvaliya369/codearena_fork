"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TrashTalkToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function TrashTalkToggle({ isEnabled, onToggle }: TrashTalkToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle(!isEnabled);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex items-center justify-center gap-3 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-label="fire">
          🔥
        </span>
        <span className="font-medium text-gray-900">Trash Talk Mode</span>
      </div>
      
      <Button
        type="button"
        onClick={handleToggle}
        variant={isEnabled ? "destructive" : "outline"}
        size="sm"
        className={`
          transition-all duration-300 font-bold
          ${isEnabled 
            ? "bg-red-500 hover:bg-red-600 text-white shadow-lg" 
            : "bg-white hover:bg-orange-100 text-gray-700 border-orange-300"
          }
          ${isAnimating ? "scale-95" : "scale-100"}
        `}
      >
        {isEnabled ? (
          <>
            <span className="mr-1" role="img" aria-label="fire">🔥</span>
            ON
            <span className="ml-1" role="img" aria-label="fire">🔥</span>
          </>
        ) : (
          <>
            <span className="mr-1" role="img" aria-label="sleeping">😴</span>
            OFF
          </>
        )}
      </Button>
      
      {isEnabled && (
        <div className="animate-pulse">
          <span className="text-sm text-orange-600">
            Ready to roast! 🥊
          </span>
        </div>
      )}
    </div>
  );
}
