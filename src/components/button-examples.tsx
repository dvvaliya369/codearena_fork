import React, { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";

// Example icons (you can replace with your preferred icon library)
const HeartIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default function ButtonExamples() {
  const [loadingStates, setLoadingStates] = useState({
    default: false,
    async: false,
    download: false,
  });

  const handleAsyncAction = async () => {
    setLoadingStates((prev) => ({ ...prev, async: true }));
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingStates((prev) => ({ ...prev, async: false }));
  };

  const handleDownload = async () => {
    setLoadingStates((prev) => ({ ...prev, download: true }));
    // Simulate download
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingStates((prev) => ({ ...prev, download: false }));
  };

  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Enhanced Button Examples</h2>
        <p className="text-gray-600">
          Showcasing various button variants, sizes, and states with enhanced
          features.
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <EnhancedButton variant="default">Default</EnhancedButton>
          <EnhancedButton variant="destructive">Destructive</EnhancedButton>
          <EnhancedButton variant="outline">Outline</EnhancedButton>
          <EnhancedButton variant="secondary">Secondary</EnhancedButton>
          <EnhancedButton variant="ghost">Ghost</EnhancedButton>
          <EnhancedButton variant="link">Link</EnhancedButton>
          <EnhancedButton variant="gradient">Gradient</EnhancedButton>
          <EnhancedButton variant="success">Success</EnhancedButton>
          <EnhancedButton variant="warning">Warning</EnhancedButton>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <EnhancedButton size="sm">Small</EnhancedButton>
          <EnhancedButton size="default">Default</EnhancedButton>
          <EnhancedButton size="lg">Large</EnhancedButton>
          <EnhancedButton size="xl">Extra Large</EnhancedButton>
          <EnhancedButton size="icon">
            <HeartIcon />
          </EnhancedButton>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <EnhancedButton leftIcon={<HeartIcon />}>Like</EnhancedButton>
          <EnhancedButton rightIcon={<ArrowIcon />} variant="outline">
            Next Step
          </EnhancedButton>
          <EnhancedButton
            leftIcon={<DownloadIcon />}
            rightIcon={<ArrowIcon />}
            variant="secondary"
          >
            Download & Continue
          </EnhancedButton>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Loading States</h3>
        <div className="flex flex-wrap gap-3">
          <EnhancedButton loading>Loading...</EnhancedButton>
          <EnhancedButton
            loading={loadingStates.async}
            onClick={handleAsyncAction}
            variant="outline"
          >
            {loadingStates.async ? "Processing..." : "Start Async Task"}
          </EnhancedButton>
          <EnhancedButton
            loading={loadingStates.download}
            onClick={handleDownload}
            leftIcon={!loadingStates.download ? <DownloadIcon /> : undefined}
            variant="gradient"
          >
            {loadingStates.download ? "Downloading..." : "Download File"}
          </EnhancedButton>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex flex-wrap gap-3">
          <EnhancedButton>Normal</EnhancedButton>
          <EnhancedButton disabled>Disabled</EnhancedButton>
          <EnhancedButton loading>Loading</EnhancedButton>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Real-world Examples</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <EnhancedButton className="w-full" variant="default">
              Sign Up
            </EnhancedButton>
            <EnhancedButton className="w-full" variant="outline">
              Log In
            </EnhancedButton>
          </div>
          <div className="space-y-2">
            <EnhancedButton
              className="w-full"
              variant="success"
              leftIcon={<HeartIcon />}
            >
              Add to Favorites
            </EnhancedButton>
            <EnhancedButton className="w-full" variant="destructive">
              Delete Account
            </EnhancedButton>
          </div>
          <div className="space-y-2">
            <EnhancedButton className="w-full" variant="gradient" size="lg">
              Get Premium
            </EnhancedButton>
            <EnhancedButton className="w-full" variant="ghost">
              Maybe Later
            </EnhancedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
