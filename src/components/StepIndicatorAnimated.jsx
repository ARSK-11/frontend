import { Check } from 'lucide-react';

const StepIndicatorAnimated = ({ currentStep, totalSteps = 3 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle with animations */}
            <div className="relative group">
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Main step circle */}
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${
                  step < currentStep
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transform scale-110'
                    : step === currentStep
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl transform scale-110 ring-4 ring-blue-100'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 shadow-sm hover:shadow-md'
                }`}
              >
                {step < currentStep ? (
                  <div className="animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                ) : (
                  <span className={`${step === currentStep ? 'animate-pulse' : ''}`}>
                    {step}
                  </span>
                )}
              </div>
              
              {/* Step label with animation */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  step <= currentStep ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {step === 1 ? 'Nama' : step === 2 ? 'Alamat' : 'Foto'}
                </span>
              </div>
            </div>
            
            {/* Animated connector line */}
            {index < steps.length - 1 && (
              <div className="w-16 h-2 relative">
                {/* Background line */}
                <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                  {/* Progress line with animation */}
                  <div 
                    className={`h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out ${
                      step < currentStep ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
                
                {/* Animated dots */}
                <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                <div className="absolute top-1/2 left-2/3 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                
                {/* Progress dots */}
                {step < currentStep && (
                  <>
                    <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-2/3 transform -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
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

export default StepIndicatorAnimated;
