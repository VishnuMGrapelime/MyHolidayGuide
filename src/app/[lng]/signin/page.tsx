import { UserSignIn } from '@/components/Auth/UserSignIn';

// export const metadata: Metadata = {
//   title: 'Sign In Page',
//   description: 'Pre-built components with awesome default',
// };

interface Params {
  lng: string;
}

export async function generateMetadata({ params: { lng } }: { params: Params }) {
  const messages = (await import(`../../i18n/locales/${lng}/meta-data.json`))
    .default;

  // return an object
  return {
    title: messages.signin.metatitle,
    description: messages.signin.metadescription,
  };
}

export default async function Signin({ params: { lng } }: { params: Params }) {
  return (
    <>
      <UserSignIn lang={lng} />
    </>
  );
}
