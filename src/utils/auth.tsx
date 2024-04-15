import { getSession, signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { setUserData } from '@/redux/slices/sessionSlice';

async function syncFirebaseAuth(session: any) {
  if (session && session.firebaseToken) {
    try {
      // console.log("signin with custom token"+session.firebaseToken);
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error('Error signing in with custom token:', error); // eslint-disable-line
    }
  } else {
    auth.signOut();
  }
}


export function signInAndSync(type: string, email: string, password: string, router: any, dispatch: any) {

  return signIn(type, {
    email,
    password,
    redirect: false,
    callbackUrl: `/`,
  }).then(async (response: any) => {

    if (response?.ok) {
      const session = await getSession();
      await syncFirebaseAuth(session);
      dispatch(setUserData(email));

      router.push(`/`);
      return "Authsuccess";
    } else {

      return 'Invalid Username or password';
    }
  });

}