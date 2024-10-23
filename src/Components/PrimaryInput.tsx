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
        <label className="text-gray-700 mb-2 dark:text-white">{label}</label>
        <input
          ref={ref}
          className={`border rounded-lg p-2 focus:outline-none focus:ring-2 dark:text-black ${
            errorMessage ? 'border-red-500' : 'border-gray-300'
          } `}
          {...props}
        />
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);
PrimaryInput.displayName = 'PrimaryInput';

export default PrimaryInput;
