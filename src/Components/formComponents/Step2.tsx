// Step1.tsx
import React from 'react';
import PrimaryInput from './PrimaryInput';
import { StepProps } from '../validate/type';

const Step2: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <PrimaryInput
        label="Email"
        {...register('email', { required: 'First name is required' })}
        errorMessage={errors.email?.message}
      />
      <PrimaryInput
        label="Phone Number"
        {...register('phoneNumber', { required: 'Last name is required' })}
        errorMessage={errors.phoneNumber?.message}
      />
    </div>
  );
};

export default Step2;
