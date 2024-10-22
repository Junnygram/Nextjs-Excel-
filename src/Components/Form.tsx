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

// interface IForm{
//   email: string | undefined
// }
export function MyForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormModel>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      type: '',
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-5 pb-10">
        <div className="grid grid-cols-2 gap-x-3">
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
        </div>
        <PrimaryInput
          label="Email Address"
          type="email"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white">
            Profile Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:text-black focus:ring focus:ring-indigo-500"
          >
            <option value="">Select Profile Type</option>
            <option value="Creator">I am a Creator</option>
            <option value="Brand">We are a Brand</option>
          </select>
          {errors.type && (
            <span className="text-red-500">{errors.type.message}</span>
          )}
        </div>
        <PrimaryInput
          label="Phone Number"
          {...register('phoneNumber')}
          errorMessage={errors.phoneNumber?.message}
        />
        <div className="w-[80%] mx-auto max-w-[10rem]">
          <button
            type="submit"
            className="bg-[#5645F5] text-white z-20 relative w-full px-8 py-3 border-r-2 border-b-2 rounded-md"
          >
            {isLoading ? (
              <FaSpinner size={20} className="animate-spin  w-full mx-auto" />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
