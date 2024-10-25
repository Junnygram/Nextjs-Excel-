// Step1.tsx
import React from 'react';
import PrimaryInput from './PrimaryInput';
import { StepProps } from '../validate/type';

const Step1: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <PrimaryInput
        label="First Name"
        {...register('firstName', { required: 'First name is required' })}
        errorMessage={errors.firstName?.message}
      />
      <PrimaryInput
        label="Last Name"
        {...register('lastName', { required: 'Last name is required' })}
        errorMessage={errors.lastName?.message}
      />
    </div>
  );
};

export default Step1;
