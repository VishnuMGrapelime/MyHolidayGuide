'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';

import { deleteData, getAllDataByFieldValue } from '@/firebase/firestore/data';

const ItemsList = ({
  lang,
  itemName,
  itemAddUrl,
  itemEditUrl,
  itemCatName,
}) => {
  console.log(lang);
  const [enableAdd, setEnableAdd] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [deleteStat, setDeleteStat] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setDeleteStat(false);
    const getServiceList = async () => {
      const servicesItems = await getAllDataByFieldValue(
        'services',
        'itemCategory',
        itemCatName,
      );
      console.log(servicesItems);

      const formatedData = servicesItems?.map((item) => ({
        id: item.id,
        itemName: item[item.languages[0]].itemName,
        itemType: item[item.languages[0]].itemType,
        itemAddress: item[item.languages[0]].itemAddress,
        itemDetails: item[item.languages[0]].itemDetails,
        itemLatitude: item[item.languages[0]].itemLatitude,
        itemLongitude: item[item.languages[0]].itemLongitude,
      }));

      setServiceList(formatedData);
      setLoading(false);
    };

    getServiceList();
  }, [getAllDataByFieldValue, deleteStat]);

  const handleCloseModal = () => {
    setEnableAdd(false);
  };

  const handleDelete = (serviceId) => {
    const { error } = deleteData('services', serviceId);
    if (error) {
      toast.error(error);
    }

    toast.success('Service Deleted successfully', {
      duration: 4000,
      position: 'top-center',
    });

    setDeleteStat(true);
  };

  return (
    <div className='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
      <link
        rel='stylesheet'
        href='https://cdn.tailgrids.com/tailgrids-fallback.css'
      />

      <section className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <div className='container' style={{ minHeight: '700px' }}>
          <div style={{ padding: '10px 0px' }}>
            <Link
              href={itemAddUrl}
              className='
              border border-primary
              py-2
              px-6
              text-primary
              inline-block
              rounded
              hover:bg-primary hover:text-white
              '
            >
              Add {itemName}
            </Link>

            {enableAdd === true && (
              <div className='modal-overlay'>
                <div className='modal'>
                  <button
                    className='modal-close-btn'
                    onClick={handleCloseModal}
                  >
                    &times; close model
                  </button>
                  <div className='modal-content'>
                    {/* Modal content goes here */}
                  </div>
                </div>
              </div>
            )}
          </div>
          {loading ? (
            <div
              style={{
                width: '100px',
                margin: 'auto',
                minHeight: '600px',
              }}
            >
              <Loader />
            </div>
          ) : (
            <div className='flex flex-wrap -mx-4'>
              <div className='w-full px-4'>
                <div className='max-w-full overflow-x-auto'>
                  <table className='table-auto w-full'>
                    <thead>
                      <tr className='bg-primary text-center'>
                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           '
                        >
                          {itemName} Id
                        </th>
                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           '
                        >
                          {itemName} Name
                        </th>

                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           '
                        >
                          {itemName} Type
                        </th>

                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           '
                        >
                          {itemName} Details
                        </th>

                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           '
                        >
                          {itemName} Location
                        </th>

                        <th
                          className='
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           '
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceList.map((service, id) => (
                        <tr key={id}>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           '
                          >
                            {service.id}
                          </td>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           '
                          >
                            {service.itemName}
                          </td>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           '
                          >
                            {service.itemType}
                          </td>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           '
                          >
                            {service.itemDetails}
                          </td>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           '
                          >
                            {service.itemAddress}
                          </td>
                          <td
                            className='
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-r border-[#E8E8E8]
                           '
                          >
                            <a
                              href={`${itemEditUrl}/${service.id}`}
                              className='
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              '
                            >
                              Edit
                            </a>

                            <a
                              onClick={() => handleDelete(service.id)}
                              className='
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              '
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ItemsList;
