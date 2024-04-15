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
    <div className='py-8 md:pt-0 md:pb-20 px-4 flex justify-center'>
      {/* <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg'> */}
      <div className='sm:container mx-auto px-4'>
        <div className='mx-auto lg:w-10/12 xl:w-8/12'>
          <UserSignIn lang={lng} />
        </div>
      </div>
    </div>
  );
}
