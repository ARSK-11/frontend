import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle with enhanced styling */}
            <div className="relative">
              {/* Background glow effect for current step */}
              {step === currentStep && (
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
              )}
              
              {/* Main step circle */}
              <div
                className={`relative w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                  step < currentStep
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110'
                    : step === currentStep
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200 scale-110 ring-4 ring-blue-100'
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 shadow-sm hover:scale-105 transition-transform'
                }`}
              >
                {step < currentStep ? (
                  <Check className="w-7 h-7 animate-bounce" />
                ) : (
                  <span className={`font-bold ${step === currentStep ? 'animate-pulse' : ''}`}>
                    {step}
                  </span>
                )}
              </div>
              
              {/* Step label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className={`text-xs font-medium ${
                  step <= currentStep ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {step === 1 ? 'Nama' : step === 2 ? 'Alamat' : 'Foto'}
                </span>
              </div>
            </div>
            
            {/* Enhanced connector line */}
            {index < steps.length - 1 && (
              <div className="w-20 h-2 mx-3 relative">
                {/* Main line background */}
                <div className={`h-full rounded-full transition-all duration-500 ${
                  step < currentStep
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                    : 'bg-gradient-to-r from-slate-200 to-slate-300'
                }`}>
                  {/* Animated progress overlay */}
                  {step < currentStep && (
                    <div className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Decorative elements on line */}
                <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm opacity-80"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm opacity-80"></div>
                <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm opacity-80"></div>
                
                {/* Animated dots for completed steps */}
                {step < currentStep && (
                  <>
                    <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
