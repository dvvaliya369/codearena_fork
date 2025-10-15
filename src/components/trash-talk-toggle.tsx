"use client";

import { OpponentInfo, TrashTalkConfig, generateTrashTalk } from "@/lib/trash-talk";
import { useState } from "react";

interface TrashTalkToggleProps {
  config: TrashTalkConfig;
  onChange: (config: TrashTalkConfig) => void;
}

export function TrashTalkToggle({ config, onChange }: TrashTalkToggleProps) {
  const [localOpponent, setLocalOpponent] = useState<Partial<OpponentInfo>>(
    config.opponent || { name: "", description: "" }
  );
  const [showPreview, setShowPreview] = useState(false);

  const handleToggle = (enabled: boolean) => {
    if (!enabled) {
      onChange({ enabled: false, opponent: null });
      setShowPreview(false);
    } else {
      onChange({ enabled: true, opponent: config.opponent });
    }
  };

  const handleOpponentChange = (field: keyof OpponentInfo, value: string) => {
    const updatedOpponent = { ...localOpponent, [field]: value };
    setLocalOpponent(updatedOpponent);
    
    if (updatedOpponent.name && updatedOpponent.name.trim()) {
      const validOpponent: OpponentInfo = {
        name: updatedOpponent.name.trim(),
        description: updatedOpponent.description?.trim() || undefined,
      };
      onChange({ ...config, opponent: validOpponent });
    } else {
      onChange({ ...config, opponent: null });
    }
  };

  const generatePreview = () => {
    if (config.opponent && config.enabled) {
      setShowPreview(true);
      setTimeout(() => setShowPreview(false), 3000); // Auto-hide after 3 seconds
    }
  };

  return (
    <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🔥</span>
          <label className="font-medium text-gray-900">
            Trash Talk Mode
          </label>
        </div>
        <button
          type="button"
          onClick={() => handleToggle(!config.enabled)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
            config.enabled ? "bg-orange-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              config.enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      
      {config.enabled && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opponent Name *
            </label>
            <input
              type="text"
              value={localOpponent.name || ""}
              onChange={(e) => handleOpponentChange("name", e.target.value)}
              placeholder="Enter your opponent's name..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opponent Description (optional)
            </label>
            <input
              type="text"
              value={localOpponent.description || ""}
              onChange={(e) => handleOpponentChange("description", e.target.value)}
              placeholder="e.g., 'knows Python but struggles with JavaScript'"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          {config.opponent && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                Ready to roast {config.opponent.name}! 🎯
              </span>
              <button
                type="button"
                onClick={generatePreview}
                disabled={showPreview}
                className="text-xs text-orange-600 hover:text-orange-700 underline disabled:text-gray-400"
              >
                {showPreview ? "Roasting..." : "Preview Roast"}
              </button>
            </div>
          )}
          
          {showPreview && config.opponent && (
            <div className="mt-2 rounded-md bg-yellow-50 border border-yellow-200 p-3">
              <p className="text-sm text-yellow-800 font-medium">🔥 Sample Roast:</p>
              <p className="text-sm text-yellow-700 mt-1">
                {generateTrashTalk(config.opponent)}
              </p>
            </div>
          )}
          
          <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
            <p>💡 <strong>Note:</strong> Trash talk will be added to your prompt to motivate the AI to create superior code!</p>
          </div>
        </div>
      )}
    </div>
  );
}
