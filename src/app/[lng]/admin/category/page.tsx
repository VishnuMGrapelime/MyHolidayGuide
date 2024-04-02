'use client';

import { useSelector } from 'react-redux';

import CategoryList from '@/components/Category/CategoryList';

import withAuth from '@/utils/withAuth';

const Category = ({ params: { lng } }) => {
  const user = useSelector((state) => state.session.user);

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
