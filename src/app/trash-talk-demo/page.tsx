'use client';

import React from 'react';
import TrashTalkUI from '../../components/trash-talk-ui';
import { TrashTalkConfig } from '../../lib/trash-talk';

export default function TrashTalkDemo() {
  const handleConfigChange = (config: TrashTalkConfig) => {
    console.log('Trash Talk Config Updated:', config);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔥 Trash Talk Feature Demo
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            A funny AI agent enhancement that adds opponent-specific roasts to prompts
          </p>
          <p className="text-sm text-gray-500">
            Toggle on the feature, set your opponent, and watch the AI get sassy! 😈
          </p>
        </div>

        <div className="grid gap-8">
          <TrashTalkUI onConfigChange={handleConfigChange} />

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Toggle on/off functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Custom opponent names</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Multiple roast styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Adjustable intensity levels</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Live preview generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Prompt enhancement system</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>TypeScript support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Easy integration</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎭 Roast Styles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">💻 Programming</h3>
                <p className="text-sm text-blue-600">Tech-focused roasts about coding, bugs, and development fails</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-700 mb-2">🎮 Gaming</h3>
                <p className="text-sm text-purple-600">Gaming-themed insults about skills, strategy, and performance</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">🌍 General</h3>
                <p className="text-sm text-green-600">Universal roasts that work in any context</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-700 mb-2">🎲 Random</h3>
                <p className="text-sm text-orange-600">Mix of all styles for maximum variety</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🌶️ Intensity Levels</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">😊</div>
                <h3 className="font-bold text-green-700 mb-2">Mild</h3>
                <p className="text-sm text-green-600">Gentle teasing with love</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">😈</div>
                <h3 className="font-bold text-yellow-700 mb-2">Medium</h3>
                <p className="text-sm text-yellow-600">Standard roast level</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="font-bold text-red-700 mb-2">Savage</h3>
                <p className="text-sm text-red-600">No mercy, maximum burn</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">⚡ Quick Setup</h2>
            <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`// Easy setup with utility functions
import { enableTrashTalk, trashTalk } from './lib/trash-talk';

// Enable trash talk for your opponent
enableTrashTalk('ChatGPT', 'programming', 'medium');

// Enhance your prompts
const enhanced = trashTalk.enhancePrompt('Help me code');
console.log(enhanced.enhancedPrompt);

// Get a preview roast
console.log(trashTalk.getPreview());`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
