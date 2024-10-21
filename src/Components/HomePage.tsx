import { signIn } from '@/auth';

export default async function HomePage() {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/form' });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
