'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader';

import { deleteData, getPaginatedDataByFieldValue } from '@/firebase/firestore/data';

const UsersList = ({
  lang,
  itemName,
  itemAddUrl,
  itemEditUrl,
  itemCatName,
}: {
  lang: any,
  itemName: any,
  itemAddUrl: any,
  itemEditUrl: any,
  itemCatName: any,
}) => {
  console.log(lang);
  const [enableAdd, setEnableAdd] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [deleteStat, setDeleteStat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setDeleteStat(false);
    const getServiceList = async () => {
      const servicesItems = await getPaginatedDataByFieldValue(
        'users',
        'userRole',
        'supplier',
        null,
        10,
        "load"
      );
      console.log(servicesItems);

      const formatedData: any = servicesItems?.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        preferedLanguage: item.preferedLanguage,
        userRole: item.userRole,
        userType: item.userType,
        createdAt: item.createdAt,
      }));

      setServiceList(formatedData);
      setLoading(false);
    };

    getServiceList();
  }, [getPaginatedDataByFieldValue, deleteStat]);

  const handleCloseModal = () => {
    setEnableAdd(false);
  };

  const handleDelete = (serviceId: any) => {
    const { error }: any = deleteData('services', serviceId);
    if (error) {
      toast.error(error);
    }

    toast.success('Service Deleted successfully', {
      duration: 4000,
      position: 'top-center',
    });

    setDeleteStat(true);
  };

  const showNext = async ({ item }: { item: any }) => {
    if (serviceList.length === 0) {
      alert("Thats all we have for now !")
    } else {
      console.log(item);
      // const fetchNextData = async () => {
      //   await firebase.firestore().collection('users')
      //     .orderBy('created', 'desc')
      //     .limit(5)
      //     .startAfter(item.created)
      //     .onSnapshot(function (querySnapshot) {
      //       const items = [];
      //       querySnapshot.forEach(function (doc) {
      //         items.push({ key: doc.id, ...doc.data() });
      //       });
      //       setList(items);
      //       setPage(page + 1)
      //     })
      // };
      // fetchNextData();

      const servicesItems = await getPaginatedDataByFieldValue(
        'users',
        'userRole',
        'supplier',
        item.createdAt,
        10,
        "next"
      );

      const formatedData: any = servicesItems?.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        preferedLanguage: item.preferedLanguage,
        userRole: item.userRole,
        userType: item.userType,
        createdAt: item.createdAt,
      }));

      setServiceList(formatedData);
      setLoading(false);
      setPage(page + 1)
    }
  };

  const showPrevious = async ({ item }: { item: any }) => {
    // const fetchPreviousData = async () => {
    //   await firebase.firestore().collection('users')
    //     .orderBy('created', 'desc')
    //     .endBefore(item.created)
    //     .limitToLast(5)
    //     .onSnapshot(function (querySnapshot) {
    //       const items = [];
    //       querySnapshot.forEach(function (doc) {
    //         items.push({ key: doc.id, ...doc.data() });
    //       });
    //       setList(items);
    //       setPage(page - 1)
    //     })
    // };
    // fetchPreviousData();

    const servicesItems = await getPaginatedDataByFieldValue(
      'users',
      'userRole',
      'supplier',
      item.createdAt,
      10,
      "previous"
    );

    const formatedData: any = servicesItems?.map((item) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      preferedLanguage: item.preferedLanguage,
      userRole: item.userRole,
      userType: item.userType,
      createdAt: item.createdAt,
    }));

    setServiceList(formatedData);
    setLoading(false);
    setPage(page - 1)
  };

  return (
    <div className='bg-white dark:bg-gray-800'>
      {/* <link
        rel='stylesheet'
        href='https://cdn.tailgrids.com/tailgrids-fallback.css'
      /> */}

      <section className='w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between'>
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
              hover:bg-[#1CCFB9] hover:text-white
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
                      <tr className='bg-[#1CCFB9] text-center'>
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
                          {itemName} Email
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
                          Supplier Type
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
                      {serviceList.map((service: any, id) => (
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
                            {service.firstName + " " + service.lastName}
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
                            {service.email}
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
                            {service.userType}
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
                            {service.userType}
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
                              hover:bg-[#1CCFB9] hover:text-white
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
                              hover:bg-[#1CCFB9] hover:text-white
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
                <div className="flex justify-end mt-4">
                  {page === 1 ? '' : (<button onClick={() => showPrevious({ item: serviceList[0] })} className="bg-[#1CCFB9] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous</button>)}
                  {serviceList.length < 5 ? '' : (<button onClick={() => showNext({ item: serviceList[serviceList.length - 1] })} className="bg-[#1CCFB9] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Next</button>)}

                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>


  );
};

export default UsersList;
