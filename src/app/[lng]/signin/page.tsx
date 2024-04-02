import { UserSignIn } from '@/components/Auth/UserSignIn';

// export const metadata: Metadata = {
//   title: 'Sign In Page',
//   description: 'Pre-built components with awesome default',
// };

export async function generateMetadata({ params: { lng } }) {
  const messages = (await import(`../../i18n/locales/${lng}/meta-data.json`))
    .default;

  // return an object
  return {
    title: messages.signin.metatitle,
    description: messages.signin.metadescription,
  };
}

export default async function Signin({ params: { lng } }) {
  return (
    <>
      <UserSignIn lang={lng} />
    </>
  );
}
