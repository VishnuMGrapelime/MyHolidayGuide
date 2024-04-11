import React from 'react';

import ItemsList from '@/components/Items/ItemsList';

interface Params {
  lng: string;
}

const BeachPage = ({ params: { lng } }: { params: Params }) => {
  return <ItemsList lang={lng} itemName='Beach' itemAddUrl="/admin/beaches/add-beach" itemEditUrl="/admin/beaches" itemCatName="beach" />;
};

export default BeachPage;
