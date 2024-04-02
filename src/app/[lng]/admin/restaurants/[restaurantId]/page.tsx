'use client';

import { cache, useEffect, useState } from 'react';

import ItemForm from '@/components/Items/ItemForm';
import Loader from '@/components/Loader';

import { getSingleData } from '@/firebase/firestore/data';

interface pageProps {
  params: { restaurantId: string };
}

export const getItem = cache(async (restaurantId: string) => {
  const servicesItems = await getSingleData('services', restaurantId);
  return servicesItems;
});

const EditPage = ({ params }) => {
  const [beachData, setBeachData] = useState(null);

  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    async function getBeachData(restaurantId) {
      const servicesItems = (await getSingleData('services', restaurantId))
        .result;
      console.log('getting restaurantData');
      console.log(servicesItems);
      setRestaurantData(servicesItems);
    }

    getBeachData(params.restaurantId);
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
    <div>
      {restaurantData ? (
        <ItemForm
          itemName='Restaurant'
          itemId={params.restaurantId}
          page='Edit'
          itemsData={restaurantData}
          category='restaurant'
          returnUrl='/admin/restaurants'
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
  );
};

export default EditPage;
