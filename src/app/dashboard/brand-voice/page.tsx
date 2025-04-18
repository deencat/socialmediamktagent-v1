"use client";

import { BrandVoiceQuestionnaire } from "@/components/dashboard/brand-voice-questionnaire";

export default function BrandVoicePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Brand Voice Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete this questionnaire to help us understand your brand&apos;s voice and create content that resonates with your audience.
        </p>
      </div>
      <BrandVoiceQuestionnaire />
    </div>
  );
} 