import React from 'react';
// import { auth } from '@/auth';
// import NotAuthenticated from './UnAuthenticated';
import { MyForm } from './Form'; // Import the renamed Form component

const FormPage = async () => {
  // const session = await auth();
  // const user = session?.user;

  // if (!session) {
  //   return (
  //     <div>
  //       <NotAuthenticated />
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* <div>Hey {user?.name}</div> */}
      <MyForm />
    </div>
  );
};

export default FormPage;
