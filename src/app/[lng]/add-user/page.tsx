'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import { AddUserDetails } from '@/components/AddUserDetails';

import withAuth from '@/utils/withAuth';

interface Params {
  lng: string;
}

function AddUser({ params: { lng } }: { params: Params }) {
  const user = useSelector((state: any) => state.session.user);

  if (user?.userRole !== 'admin') {
    return <p>Restricted page</p>;
  }

  return (
    <>
      <AddUserDetails lang={lng} />
    </>
  );
}

export default withAuth(AddUser);
