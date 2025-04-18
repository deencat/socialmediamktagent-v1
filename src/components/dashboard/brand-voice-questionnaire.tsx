"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  type: "text" | "radio" | "select" | "textarea";
  question: string;
  description?: string;
  options?: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "brand-name",
    type: "text",
    question: "What is your brand name?",
    description: "This will be used to personalize your content"
  },
  {
    id: "brand-industry",
    type: "select",
    question: "What industry is your brand in?",
    description: "This helps us understand your target market",
    options: [
      { value: "tech", label: "Technology" },
      { value: "retail", label: "Retail" },
      { value: "food", label: "Food & Beverage" },
      { value: "health", label: "Health & Wellness" },
      { value: "finance", label: "Finance" },
      { value: "other", label: "Other" }
    ]
  },
  {
    id: "brand-tone",
    type: "radio",
    question: "What tone best describes your brand voice?",
    description: "This will influence the style of your content",
    options: [
      { value: "professional", label: "Professional & Formal" },
      { value: "casual", label: "Casual & Friendly" },
      { value: "playful", label: "Playful & Fun" },
      { value: "innovative", label: "Innovative & Bold" }
    ]
  },
  {
    id: "brand-values",
    type: "textarea",
    question: "What are your brand's core values?",
    description: "List 3-5 values that define your brand"
  }
];

export function BrandVoiceQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case "text":
        return (
          <Input
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here"
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswer}
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "select":
        return (
          <Select
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswer}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here"
            rows={4}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Brand Voice Setup</CardTitle>
        <CardDescription>
          Help us understand your brand better to create content that matches your voice
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          {currentQuestion.description && (
            <p className="text-sm text-muted-foreground">
              {currentQuestion.description}
            </p>
          )}
        </div>
        <div className="mt-4">{renderQuestionInput()}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id] || currentStep === questions.length - 1}
        >
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
} 