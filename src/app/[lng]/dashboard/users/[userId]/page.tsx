'use client';

import { cache, useEffect, useState } from 'react';

import Loader from '@/components/Loader';

import { getSingleData } from '@/firebase/firestore/data';
import UsersForm from '@/components/Users/UsersForm';
import { SideMenuNew } from '@/components/Admin/SideMenu/SideMenuNew';

interface pageProps {
  params: { beachId: string };
}

export const getItem = cache(async (userId: string) => {
  const servicesItems = await getSingleData('users', userId);
  return servicesItems;
});

const EditUserPage = ({ params }: { params: any }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("User id page " + params.userId);
    async function getUserData(userId: any) {
      const servicesItems: any = (await getSingleData('users', userId)).result;
      console.log('getting userData');
      console.log(servicesItems);
      setUserData(servicesItems);
    }

    getUserData(params.userId);
  }, [getSingleData]);

  // async function getBeachData(beachId) {
  //   const servicesItems = (await getSingleData('services', beachId)).result;
  //   console.log('getting beachdata');
  //   console.log(servicesItems);
  //   setBeachData(servicesItems);
  // }

  // getBeachData(params.beachId);

  //console.log('Beach ID:', beachData);

  return (
    <div className="flex w-full">
      <SideMenuNew />
      <div className="w-4/5 bg-white mr-1 mt-4">
        <h1 className="text-2xl font-bold pb-8">Suppliers Deatils</h1>

        {userData ? (
          <UsersForm
            itemName='Supplier'
            itemId={params.beachId}
            page='Edit'
            itemsData={userData}
            category='supplier'
            returnUrl='/dashboard/users'
          />
        ) : (
          <div
            style={{
              width: '100px',
              margin: 'auto',
              minHeight: '600px',
            }}
          >
            <Loader />
          </div>
        )}

      </div>
    </div>
  );
};

export default EditUserPage;
