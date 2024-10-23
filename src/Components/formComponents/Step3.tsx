// Step1.tsx
import React from 'react';
import PrimaryInput from './PrimaryInput';
import { StepProps } from '../validate/type';

const Step3: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2">Profile Type</label>
        <select
          {...register('type', { required: 'Profile type is required' })}
          className={`border rounded-lg p-2 focus:outline-none ${
            errors.type ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Profile Type</option>
          <option value="Engineer">I am an Engineer</option>
          <option value="Designer">I am a Designer</option>
          <option value="Product Manager">I am a Product Manager</option>
        </select>
        {errors.type && (
          <span className="text-red-500 text-sm">{errors.type.message}</span>
        )}
      </div>
      <PrimaryInput
        label="Comment"
        {...register('comment', { required: 'comment is required' })}
        errorMessage={errors.comment?.message}
      />
    </div>
  );
};

export default Step3;
