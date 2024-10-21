import React from 'react';
import { auth } from '@/auth';
import NotAuthenticated from './UnAuthenticated';

const FormPage = async () => {
  const session = await auth();
  const user = session?.user;

  console.log('email:', user?.name, 'user:', user?.email);
  if (!session)
    return (
      <div className="">
        <NotAuthenticated />
      </div>
    );

  return <div>Welcome {user?.name}</div>;
};

export default FormPage;
