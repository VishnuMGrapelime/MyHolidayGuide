import React from 'react';

import ItemsList from '@/components/Items/ItemsList';

interface Params {
  lng: string;
}

const RestaurantsPage = ({ params: { lng } }: { params: Params }) => {
  return (
    <ItemsList
      lang={lng}
      itemName='Restaurants'
      itemAddUrl='/admin/restaurants/add-restaurant'
      itemEditUrl='/admin/restaurants'
      itemCatName='restaurant'
    />
  );
};

export default RestaurantsPage;
