"use client";

import { getRandomTrashTalkCollection, TrashTalkConfig } from "@/lib/trash-talk";
import { useState, useEffect } from "react";

interface TrashTalkDisplayProps {
  config: TrashTalkConfig;
}

export function TrashTalkDisplay({ config }: TrashTalkDisplayProps) {
  const [visibleRoasts, setVisibleRoasts] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (config.enabled && config.opponent) {
      // Generate new roasts when config changes
      const roasts = getRandomTrashTalkCollection(config.opponent, 3);
      animateRoasts(roasts);
    } else {
      setVisibleRoasts([]);
    }
  }, [config]);

  const animateRoasts = (roasts: string[]) => {
    setIsAnimating(true);
    setVisibleRoasts([]);
    
    // Show roasts one by one with delay
    roasts.forEach((roast, index) => {
      setTimeout(() => {
        setVisibleRoasts(prev => [...prev, roast]);
        if (index === roasts.length - 1) {
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, index * 1000);
    });
  };

  const refreshRoasts = () => {
    if (config.opponent) {
      const newRoasts = getRandomTrashTalkCollection(config.opponent, 3);
      animateRoasts(newRoasts);
    }
  };

  if (!config.enabled || !config.opponent) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🔥</span>
          <h3 className="font-bold text-red-900">Trash Talk Arena</h3>
        </div>
        <button
          onClick={refreshRoasts}
          disabled={isAnimating}
          className="text-sm text-red-600 hover:text-red-700 underline disabled:text-gray-400 disabled:no-underline"
        >
          {isAnimating ? "Loading..." : "New Roasts"}
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm font-medium text-red-800">
          🎯 Target: <span className="text-red-900">{config.opponent.name}</span>
          {config.opponent.description && (
            <span className="text-red-700"> ({config.opponent.description})</span>
          )}
        </p>
      </div>
      
      <div className="space-y-3">
        {visibleRoasts.map((roast, index) => (
          <div
            key={index}
            className="transform transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-left-2"
          >
            <div className="bg-white rounded-md p-3 border-l-4 border-orange-500 shadow-sm">
              <p className="text-sm text-gray-800">
                💬 <strong>AI Roast #{index + 1}:</strong> {roast}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {visibleRoasts.length === 0 && !isAnimating && (
        <div className="text-center text-gray-500 py-4">
          <p className="text-sm">Ready to serve some fresh roasts! 🍽️</p>
        </div>
      )}
      
      {isAnimating && (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 text-sm text-orange-600">
            <div className="animate-spin h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full"></div>
            <span>Cooking up some fire roasts...</span>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 border-t border-red-200 pt-3">
        <p>💡 <strong>Pro Tip:</strong> These roasts are just for fun! The AI will use this competitive energy to write better code! 🚀</p>
      </div>
    </div>
  );
}
