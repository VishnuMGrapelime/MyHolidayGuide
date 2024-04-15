import React from 'react';

import ItemsList from '@/components/Items/ItemsList';
import SideMenu from '@/components/Admin/SideMenu/SideMenu';

interface Params {
  lng: string;
}

const BeachPage = ({ params: { lng } }: { params: Params }) => {
  return (<>

    <SideMenu />
    <ItemsList lang={lng} itemName='Beach' itemAddUrl="/admin/beaches/add-beach" itemEditUrl="/admin/beaches" itemCatName="beach" />
  </>);
};

export default BeachPage;
