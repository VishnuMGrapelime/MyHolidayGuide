import React from 'react';

import ItemsList from '@/components/Items/ItemsList';

const BeachPage = ({ params: { lng } }) => {
  return <ItemsList lang={lng} itemName='Beach' itemAddUrl="/admin/beaches/add-beach" itemEditUrl="/admin/beaches" itemCatName="beach"/>;
};

export default BeachPage;
