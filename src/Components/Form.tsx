'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './validate/validatonSchema';
import type { FormModel, StepProps, FormFields } from './validate/type';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Step1 from './formComponents/Step1';
import Step2 from './formComponents/Step2';
import Step3 from './formComponents/Step3';
import SideComponents from './formComponents/Stepper';

type StepComponent = React.FC<StepProps>;

const steps: StepComponent[] = [Step1, Step2, Step3];

const STEP_FIELDS: Record<number, FormFields[]> = {
  1: ['firstName', 'lastName'],
  2: ['email', 'phoneNumber'],
  3: ['type', 'comment'],
} as const;

export function MyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const prevStep = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNextStep = async () => {
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
  const isLastStep = currentStep === steps.length;

  return (
    <div>
      <button
        onClick={prevStep}
        disabled={isLoading}
        className={`bg-gray-200 flex p-2 justify-start size-10 rounded-full m-2 ${
          isLoading ? 'cursor-not-allowed' : 'hover:bg-gray-300'
        }`}
        aria-label="Go back"
      >
        <IoIosArrowBack size={20} />
      </button>

      <div className="container mx-auto px-4 py-16 rounded-lg md:shadow-lg max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit Your Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SideComponents currentStep={currentStep} />

          {StepComponent && (
            <StepComponent register={register} errors={errors} />
          )}

          <div className="flex justify-between mt-4 w-[80%] mx-auto max-w-20">
            {!isLastStep ? (
              // Next button for steps 1 and 2
              <button
                type="button"
                onClick={handleNextStep}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition duration-200 w-full"
                aria-label="Next step"
              >
                Next
              </button>
            ) : (
              // Submit button for the last step
              <button
                type="submit"
                className={`py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition duration-200 w-full ${
                  isLoading ? 'cursor-not-allowed opacity-70' : ''
                }`}
                disabled={isLoading}
                aria-label="Submit form"
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Submit'}
              </button>
            )}
          </div>
        </form>

        {/* Embed the Google Sheets document */}
        <div className="my-3">
          <iframe
            src="https://docs.google.com/spreadsheets/d/19wkPNYGXzEnTrUjo7ubPRHrhNl-5YVxP7eRTPVPuUSw/edit?usp=sharing"
            width="80%"
            className="mx-auto"
            height="200"
          />
        </div>
      </div>
    </div>
  );
}
