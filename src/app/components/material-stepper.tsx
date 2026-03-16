import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface MaterialStepperProps {
  steps: Step[];
  activeStep: number;
}

export function MaterialStepper({ steps, activeStep }: MaterialStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <div key={index} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {/* Circle */}
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                      ${isCompleted ? "bg-[#7cb342] text-white" : ""}
                      ${isActive ? "bg-[#7cb342] text-white ring-4 ring-[#7cb342]/20" : ""}
                      ${!isActive && !isCompleted ? "bg-muted text-muted-foreground" : ""}
                    `}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  
                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`
                        h-0.5 flex-1 mx-2 transition-all
                        ${isCompleted ? "bg-[#7cb342]" : "bg-muted"}
                      `}
                    />
                  )}
                </div>
                
                {/* Label */}
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
