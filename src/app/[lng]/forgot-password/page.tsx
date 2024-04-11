import { UserForgotPassword } from '@/components/Auth/UserForgotPassword';

// export const metadata: Metadata = {
//   title: 'Forgot Password Page',
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
    title: messages.forgotpassword.metatitle,
    description: messages.forgotpassword.metadescription,
  };
}

export default function ForgotPassword({ params: { lng } }: { params: Params }) {
  return <UserForgotPassword lang={lng} />;
}
