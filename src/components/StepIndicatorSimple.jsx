import { Check } from 'lucide-react';

const StepIndicatorSimple = ({ currentStep, totalSteps = 3 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                step < currentStep
                  ? 'bg-green-500 text-white shadow-md'
                  : step === currentStep
                  ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-200'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            
            {/* Simple line connector */}
            {index < steps.length - 1 && (
              <div className="w-12 h-1 bg-gray-200 rounded-full">
                {step < currentStep && (
                  <div className="w-full h-full bg-green-500 rounded-full transition-all duration-500"></div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicatorSimple;
