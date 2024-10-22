import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import PrimaryInput from './PrimaryInput'; // Import the new input component

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  type: z.string({
    required_error: 'Please select a Profile type to display.',
  }),
});
export default formSchema;

export function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      type: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('/api/submitForm', values);

      if (response.status === 200) {
        form.reset();
        console.log('Successfully submitted');
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-5 pb-10"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <PrimaryInput
            label="First Name"
            {...form.register('firstName')}
            errorMessage={form.formState.errors.firstName?.message}
          />
          <PrimaryInput
            label="Last Name"
            {...form.register('lastName')}
            errorMessage={form.formState.errors.lastName?.message}
          />
        </div>
        <PrimaryInput
          label="Email Address"
          type="email"
          {...form.register('email')}
          errorMessage={form.formState.errors.email?.message}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Profile Type
          </label>
          <select
            {...form.register('type')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
          >
            <option value="">Select Profile Type</option>
            <option value="Creator">I am a Creator</option>
            <option value="Brand">We are a Brand</option>
          </select>
          {form.formState.errors.type && (
            <span className="text-red-500">
              {form.formState.errors.type.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#5645F5] z-20 relative w-full px-8 py-3 border-r-2 border-b-2 border-[#DEDF4A]"
        >
          Join Waitlist
        </button>
      </form>
    </div>
  );
}
