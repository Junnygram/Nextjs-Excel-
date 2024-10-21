'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-5 pb-10"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Profile Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Creator">I am a Creator</SelectItem>
                  <SelectItem value="Brand">We are a Brand</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="bg-[#5645F5] z-20 relative w-full px-8 py-3 border-r-2 border-b-2 border-[#DEDF4A]"
        >
          Join Waitlist
        </button>
      </form>
    </Form>
  );
}
