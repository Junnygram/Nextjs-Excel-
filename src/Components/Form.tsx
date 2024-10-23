// MyForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryInput from './PrimaryInput';
import { formSchema } from './validate/validatonSchema';
import type { FormModel } from './validate/type';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';

export function MyForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
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

  async function onSubmit(values: FormModel) {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/submitform', values);
      setIsLoading(false);
      if (response.status === 200) {
        reset();
        toast.success('Successfully submitted');
      } else {
        toast.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <div className="container mx-auto px-4 py-16  rounded-lg shadow-lg max-w-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Submit Your Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PrimaryInput
          label="First Name"
          {...register('firstName')}
          errorMessage={errors.firstName?.message}
        />
        <PrimaryInput
          label="Last Name"
          {...register('lastName')}
          errorMessage={errors.lastName?.message}
        />
        <PrimaryInput
          label="Email"
          type="email"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <PrimaryInput
          label="Phone Number"
          type="tel"
          {...register('phoneNumber')}
          errorMessage={errors.phoneNumber?.message}
        />

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 dark:text-white">
            Profile Type
          </label>
          <select
            {...register('type')}
            className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${
              errors.type ? 'border-red-500' : 'border-gray-300'
            } `}
          >
            <option value="">Select Profile Type</option>
            <option value="Engineer">I am a Engineer</option>
            <option value="Designer">I am a Designer</option>
            <option value="Product Manager">I am a Product Manager</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>

        <PrimaryInput
          label="Why would you like to work with us?"
          {...register('comment')}
          errorMessage={errors.comment?.message}
        />

        <button
          type="submit"
          className={`w-[80%] mx-auto  max-w-[12rem] py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition duration-200 ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
