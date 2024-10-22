import { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const PrimaryInput = forwardRef<HTMLInputElement, PrimaryInputProps>(
  ({ label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 outline-none dark:text-black ${
            errorMessage ? 'border-red-500' : ''
          }`}
        />
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      </div>
    );
  }
);

PrimaryInput.displayName = 'PrimaryInput';

export default PrimaryInput;
