import { signIn } from '@/auth';
import Image from 'next/image';

export default async function HomePage() {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/form' });
        }}
      >
        <button
          className="shadow-xl p-2 rounded-md flex items-center"
          type="submit"
        >
          <Image
            src="/assets/g.png"
            alt="Google logo"
            width={100}
            height={100}
            className="h-5 w-5 mr-2" // Adjust the size and margin as needed
          />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
