/**
 * Trash Talk Controls Component
 * UI component for controlling trash talk settings
 */

"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { useTrashTalk } from './trash-talk-provider';
import { TrashTalkConfig } from '../lib/trash-talk';

interface TrashTalkControlsProps {
  className?: string;
  compact?: boolean;
}

export function TrashTalkControls({ className = "", compact = false }: TrashTalkControlsProps) {
  const { config, updateConfig, toggleTrashTalk, setOpponent } = useTrashTalk();
  const [opponentInput, setOpponentInput] = useState(config.opponent || '');
  const [showSettings, setShowSettings] = useState(false);

  const handleOpponentSubmit = () => {
    if (opponentInput.trim()) {
      setOpponent(opponentInput.trim());
      if (!config.isEnabled) {
        toggleTrashTalk();
      }
    }
  };

  const handleIntensityChange = (intensity: TrashTalkConfig['intensity']) => {
    updateConfig({ intensity });
  };

  const handleCategoryChange = (category: TrashTalkConfig['category']) => {
    updateConfig({ category });
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          type="button"
          variant={config.isEnabled ? "default" : "outline"}
          size="sm"
          onClick={toggleTrashTalk}
          className={`text-xs ${config.isEnabled ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          🗣️ Trash Talk {config.isEnabled ? 'ON' : 'OFF'}
        </Button>
        
        {config.isEnabled && (
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="Opponent name"
              value={opponentInput}
              onChange={(e) => setOpponentInput(e.target.value)}
              onBlur={handleOpponentSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleOpponentSubmit()}
              className="border border-gray-300 px-2 py-1 text-xs rounded w-24"
            />
            {config.opponent && (
              <span className="text-xs text-red-500 font-bold">vs {config.opponent}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-4 p-4 border border-gray-300 rounded-lg bg-gray-50 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">🗣️ Trash Talk Mode</h3>
        <Button
          type="button"
          variant={config.isEnabled ? "default" : "outline"}
          onClick={toggleTrashTalk}
          className={config.isEnabled ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          {config.isEnabled ? 'ON' : 'OFF'}
        </Button>
      </div>

      {config.isEnabled && (
        <div className="space-y-3">
          {/* Opponent Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opponent Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter opponent name..."
                value={opponentInput}
                onChange={(e) => setOpponentInput(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Button 
                type="button"
                onClick={handleOpponentSubmit}
                size="sm"
                disabled={!opponentInput.trim()}
              >
                Set
              </Button>
            </div>
            {config.opponent && (
              <p className="text-sm text-red-600 mt-1 font-semibold">
                Current opponent: {config.opponent}
              </p>
            )}
          </div>

          {/* Settings Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-600 hover:text-gray-900"
          >
            {showSettings ? '▼' : '▶'} Advanced Settings
          </Button>

          {/* Advanced Settings */}
          {showSettings && (
            <div className="space-y-3 pl-4 border-l-2 border-gray-300">
              {/* Intensity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roast Intensity
                </label>
                <div className="flex gap-2">
                  {(['mild', 'medium', 'savage'] as const).map((intensity) => (
                    <Button
                      key={intensity}
                      type="button"
                      variant={config.intensity === intensity ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleIntensityChange(intensity)}
                      className={`capitalize ${
                        config.intensity === intensity && intensity === 'savage' 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : ''
                      }`}
                    >
                      {intensity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roast Category
                </label>
                <div className="flex gap-2 flex-wrap">
                  {(['coding', 'general', 'gaming', 'random'] as const).map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={config.category === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {config.opponent && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Preview:</strong> When you submit a prompt, it will include a roast against{' '}
                <span className="font-semibold">{config.opponent}</span> with{' '}
                <span className="font-semibold">{config.intensity}</span> intensity and{' '}
                <span className="font-semibold">{config.category}</span> category insults.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TrashTalkControls;
