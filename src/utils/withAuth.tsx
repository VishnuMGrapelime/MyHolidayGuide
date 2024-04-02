// utils/withAuth.js

import { useSession } from 'next-auth/react';

const withAuth = (WrappedComponent) => {
  return function WithAuthVerification(props) {
    const { data: session, status } = useSession({
      required: true,
      // onUnauthenticated() {
      //   redirect('/signin');
      // },
    });

    if (status === 'loading') {
      // Render loading state or spinner while session status is being fetched
      return <p></p>;
    }

    if (!session) {
      //console.log('before redirect');
      // If no session is found, redirect to login page
      // return <RedirectToLogin />;
    } else {
      // console.log(session);
    }

    // If session exists, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
