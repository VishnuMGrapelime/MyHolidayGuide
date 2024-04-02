import React from 'react';

import ItemsList from '@/components/Items/ItemsList';

const RestaurantsPage = ({ params: { lng } }) => {
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
