'use client';
import React from 'react';

import ItemForm from '@/components/Items/ItemForm';

const addBeach = () => {
  const itemsData = {};

  return (
    <div>
      <ItemForm
        page='Add'
        itemId={null}
        itemName='Beach'
        itemsData={itemsData}
        category='beach'
        returnUrl='/admin/beaches'
      />
    </div>
  );
};

export default addBeach;
