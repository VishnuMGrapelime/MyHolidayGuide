'use client';

import { useSelector } from 'react-redux';

import CategoryList from '@/components/Category/CategoryList';

import withAuth from '@/utils/withAuth';

interface Params {
  lng: string;
}

const Category = ({ params: { lng } }: { params: Params }) => {
  const user = useSelector((state: any) => state.session.user);

  if (user?.userRole !== 'admin') {
    return <p>Restricted page</p>;
  }

  return (
    <div>
      <CategoryList lang={lng} />
    </div>
  );
};

export default withAuth(Category);
