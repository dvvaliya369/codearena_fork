'use client';

import React, { useState, useEffect } from 'react';
import { TrashTalkManager, TrashTalkConfig } from '../lib/trash-talk';

interface TrashTalkUIProps {
  onConfigChange?: (config: TrashTalkConfig) => void;
  className?: string;
}

export const TrashTalkUI: React.FC<TrashTalkUIProps> = ({ onConfigChange, className = '' }) => {
  const [trashTalkManager] = useState(() => new TrashTalkManager());
  const [config, setConfig] = useState<TrashTalkConfig>(trashTalkManager.getConfig());
  const [opponent, setOpponent] = useState('');
  const [preview, setPreview] = useState('');

  const updateConfig = (newConfig: Partial<TrashTalkConfig>) => {
    if (newConfig.opponent !== undefined) {
      trashTalkManager.setOpponent(newConfig.opponent);
      setOpponent(newConfig.opponent);
    }
    if (newConfig.intensity) {
      trashTalkManager.setIntensity(newConfig.intensity);
    }
    if (newConfig.style) {
      trashTalkManager.setStyle(newConfig.style);
    }
    if (newConfig.enabled !== undefined && newConfig.enabled !== config.enabled) {
      trashTalkManager.toggle();
    }

    const updatedConfig = trashTalkManager.getConfig();
    setConfig(updatedConfig);
    onConfigChange?.(updatedConfig);

    // Update preview if enabled and opponent is set
    if (updatedConfig.enabled && updatedConfig.opponent) {
      setPreview(trashTalkManager.getPreview());
    } else {
      setPreview('');
    }
  };

  const handleToggle = () => {
    if (!config.enabled && !opponent.trim()) {
      alert('Please set an opponent before enabling trash talk!');
      return;
    }
    updateConfig({ enabled: !config.enabled });
  };

  const handleOpponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpponent = e.target.value;
    setOpponent(newOpponent);
    updateConfig({ opponent: newOpponent });
  };

  const generateNewPreview = () => {
    if (config.enabled && config.opponent) {
      setPreview(trashTalkManager.getPreview());
    }
  };

  useEffect(() => {
    if (config.enabled && config.opponent) {
      setPreview(trashTalkManager.getPreview());
    }
  }, [config.enabled, config.opponent, config.style, config.intensity]);

  return (
    <div className={`p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
          🔥 Trash Talk Mode
        </h3>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            config.enabled
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {config.enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Opponent Input */}
        <div>
          <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 mb-2">
            Who's your opponent? 🎯
          </label>
          <input
            id="opponent"
            type="text"
            value={opponent}
            onChange={handleOpponentChange}
            placeholder="e.g., ChatGPT, Claude, my coworker Dave..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Roast Style 🎭
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['programming', 'general', 'gaming', 'random'] as const).map((style) => (
              <button
                key={style}
                onClick={() => updateConfig({ style })}
                className={`px-3 py-2 text-sm rounded-md capitalize transition-colors ${
                  config.style === style
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intensity Level 🌶️
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['mild', 'medium', 'savage'] as const).map((intensity) => (
              <button
                key={intensity}
                onClick={() => updateConfig({ intensity })}
                className={`px-3 py-2 text-sm rounded-md capitalize transition-colors ${
                  config.intensity === intensity
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {intensity}
                {intensity === 'mild' && ' 😊'}
                {intensity === 'medium' && ' 😈'}
                {intensity === 'savage' && ' 🔥'}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div className="bg-white border border-gray-200 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Preview Roast:</span>
              <button
                onClick={generateNewPreview}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                🎲 New Roast
              </button>
            </div>
            <p className="text-sm text-gray-600 italic">"{preview}"</p>
          </div>
        )}

        {/* Status */}
        <div className={`text-center py-2 px-3 rounded-md text-sm font-medium ${
          config.enabled
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {config.enabled
            ? `🔥 Trash talk is ON! Ready to roast ${config.opponent}!`
            : '😴 Trash talk is OFF. Playing nice for now...'
          }
        </div>
      </div>
    </div>
  );
};

export default TrashTalkUI;
