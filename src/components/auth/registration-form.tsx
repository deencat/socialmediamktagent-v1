"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // "sme" or "provider"
    companyName: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      // In a real app, this would create a user account
      // For now, just redirect to the appropriate dashboard
      if (formData.role === "sme") {
        router.push("/dashboard");
      } else {
        router.push("/tasks");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="registration-form">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm" data-testid="error-message">
          {error}
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {i < step ? '✓' : i}
            </div>
            <div className="text-xs mt-1 text-gray-500">
              {i === 1 ? 'Account' : i === 2 ? 'Role' : 'Details'}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="you@example.com"
              required
              data-testid="email-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="u2022u2022u2022u2022u2022u2022u2022u2022"
              required
              data-testid="password-input"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="u2022u2022u2022u2022u2022u2022u2022u2022"
              required
              data-testid="confirm-password-input"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={!formData.email || !formData.password || !formData.confirmPassword}
              data-testid="next-button"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-center">I am a...</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRoleSelect("sme")}
              className="p-6 border rounded-lg hover:border-primary hover:bg-blue-50 transition-colors flex flex-col items-center text-center"
              data-testid="role-sme"
            >
              <div className="text-3xl mb-2">🏢</div>
              <div className="font-medium">Business Owner</div>
              <div className="text-sm text-gray-500 mt-1">I want to grow my social media presence</div>
            </button>
            
            <button
              type="button"
              onClick={() => handleRoleSelect("provider")}
              className="p-6 border rounded-lg hover:border-primary hover:bg-blue-50 transition-colors flex flex-col items-center text-center"
              data-testid="role-provider"
            >
              <div className="text-3xl mb-2">👤</div>
              <div className="font-medium">Service Provider</div>
              <div className="text-sm text-gray-500 mt-1">I want to earn rewards by engaging with content</div>
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.role === "sme" ? (
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Your Company"
                required
                data-testid="company-name-input"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Your Name"
                required
                data-testid="full-name-input"
              />
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
            
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isLoading || (formData.role === "sme" ? !formData.companyName : !formData.fullName)}
              data-testid="register-button"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}