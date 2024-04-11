// export const metadata: Metadata = {
//   title: 'Sign Up Page',
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
    title: messages.signup.metatitle,
    description: messages.signup.metadescription,
  };
}

import { UserSignup } from '@/components/Auth/UserSignup';

export default function Signup({ params: { lng } }: { params: Params }) {
  return <UserSignup lang={lng} />;
}
