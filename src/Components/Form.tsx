'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './validate/validatonSchema';
import type { FormModel, StepProps, FormFields } from './validate/type';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import Step1 from './formComponents/Step1';
import Step2 from './formComponents/Step2';
import Step3 from './formComponents/Step3';
import SideComponents from './formComponents/Stepper';

type StepComponent = React.FC<StepProps>;

const steps: StepComponent[] = [Step1, Step2, Step3];

// Define the fields to validate for each step
const STEP_FIELDS: Record<number, FormFields[]> = {
  1: ['firstName', 'lastName'],
  2: ['email', 'phoneNumber'],
  3: ['type', 'comment'],
} as const;

export function MyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormModel>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      type: '',
      comment: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const nextStep = async () => {
    const fieldsToValidate =
      STEP_FIELDS[currentStep as keyof typeof STEP_FIELDS];
    const result = await trigger(fieldsToValidate);
    if (result) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (values: FormModel) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/submitform', values);
      if (response.status === 200) {
        reset();
        setCurrentStep(1);

        toast.success('Successfully submitted');
      } else {
        toast.error('Form submission failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const StepComponent = steps[currentStep - 1];

  return (
    <div className="container mx-auto px-4 py-16 rounded-lg md:shadow-lg max-w-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Submit Your Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {steps.map((step, index) => (
          <SideComponents key={index} currentStep={currentStep} />
        ))}
        {StepComponent && <StepComponent register={register} errors={errors} />}
        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="
                py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-20"
              aria-label="Go back to the previous step"
              disabled={isLoading} // Optionally disable the button if loading
            >
              Back
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
              aria-label="Go to the next step"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition duration-200 ${
                isLoading ? 'cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
              aria-label="Submit the form"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
