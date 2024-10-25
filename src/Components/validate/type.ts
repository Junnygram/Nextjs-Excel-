// types.ts
import { UseFormRegister, FieldErrors } from 'react-hook-form';

export type Step1Data = {
  firstName: string;
  lastName: string;
};

export type Step2Data = {
  email: string;
  phoneNumber: string;
};

export type Step3Data = {
  type: string;
  comment: string;
};

export type FormModel = Step1Data & Step2Data & Step3Data;

// Props types for steps now use FormModel as the generic type
export type StepProps = {
  register: UseFormRegister<FormModel>;
  errors: FieldErrors<FormModel>;
};

export type FormFields = keyof FormModel;
