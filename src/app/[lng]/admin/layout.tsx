import * as React from 'react';

import SideMenu from '@/components/Admin/SideMenu/SideMenu';

// export const metadata: Metadata = {
//   title: 'Add User page',
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
    title: messages.adduser.metatitle,
    description: messages.adduser.metadescription,
  };
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideMenu />
      {children}
    </>
  );
}
