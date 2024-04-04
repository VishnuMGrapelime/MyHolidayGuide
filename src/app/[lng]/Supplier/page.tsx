import { BookOpen, ChevronUp, DollarSign, Expand, } from 'lucide-react';
import React from 'react'
import Image from 'next/image';
import Main from '~/images/Main.jpg'
import Main2 from '~/images/Main2.jpg'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import {Button} from '@/components/Elements/Button';
function page() {
  return (
    <>
      <div className='' id='_holidayGuide'>
        <div id='Supplier_area' className='' style={{ outline: 'none' }}>
          <div style={{ outline: 'none' }}>
            <div className='min-w-[350]'>

              <div></div>
              <div style={{ outline: 'none' }}>
                <div className='font-body'>
                  <section className="font-body flex items-center justify-center py-20 px-4 w-full relative bg-cover bg-center h-auto md:py-14 md:min-h-[620px] lg:h-[calc(100vh-300px)] before:inset-0 before:absolute before:z-0 before:bg-gradient-to-b before:from-[#0F1A3666] before:to-[#0F1A3610]"
                  // style={{ backgroundImage: `url(https://user-images.githubusercontent.com/75487668/141353341-0c11a1a6-89cb-4731-b4c0-c288d2d3c6b0.jpg)` }}>
                  >
                    <div className="absolute inset-0">
                      <Image src={Main} alt="Main" layout="fill" objectFit="cover"/>
                    </div>
                    <div className="xl:container mx-auto relative flex flex-col justify-center items-center">
                      <div className="flex flex-col justify-between text-center gap-y-16 md:gap-y-[140px]">
                        <h1 className="text-[2rem] w-10/12 text-left md:text-[4rem] font-normal md:leading-snug text-neutral-50">
                          <span className='leading-10'>Reach hundreds of thousands of customers with your tours and activities</span>
                        </h1>
                        <p className="text-center">
                          <div className="pt-4 text-center md:pt-6 space-y-4 md:space-x-6">
                            <Button label={'Private Host'} />
                            <Button label={'Company Host'} />
                          </div>
                        </p>
                      </div>
                    </div>
                  </section>
                  {/* 1 */}
                  <section className="py-9 md:py-20 px-4 dark:text-neutral-50">
                    <div className="xl:container xl:mx-auto">
                      <div className="flex flex-col gap-y-12 md:gap-y-20">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full">
                              <span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5">
                                <Expand />
                              </span><h3 className="text-h4 font-semibold">Expand your market</h3>
                              <p className="text-p3 sm:text-p2">Increase awareness of your travel products. We promote and distribute them through our partner network.</p>
                            </div>
                          </div>
                          <div className="flex-1"><div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full">
                            <span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5">
                              <BookOpen size={28} />
                            </span><h3 className="text-h4 font-semibold">Create your products in multiple languages</h3><p className="text-p3 sm:text-p2">Our content experts will optimize your products for the global market in multiple languages.</p></div>
                          </div>
                          <div className="flex-1"><div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full">
                            <span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5">
                              <DollarSign size={28} />
                            </span><h3 className="text-h4 font-semibold">Get your payout directly</h3>
                            <p className="text-p3 sm:text-p2">You will pay commission only on successful bookings.</p>
                          </div>
                          </div>
                        </div>
                        <div className="text-center"><h2 className="text-h2 font-bold"><span>Becoming a partner is easy</span></h2>
                          <p className="text-p2"><span>It takes less than 10 minutes.</span></p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full">
                              <span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5">
                                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-900 text-lg font-bold dark:border-neutral-50 md:w-8 md:h-8">1</span></span>
                              <h3 className="text-h4 font-semibold"> Tell us about your company</h3>
                              <p className="text-p3 sm:text-p2">We will make your company more competitive and successful</p></div>
                          </div><div className="flex-1"><div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full">
                            <span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5">
                              <span className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-900 text-lg font-bold dark:border-neutral-50 md:w-8 md:h-8">2</span>
                            </span><h3 className="text-h4 font-semibold">We review your application</h3><p className="text-p3 sm:text-p2">We look at your company, your business offers, your business registration and your insurance.</p></div>
                          </div><div className="flex-1"><div className=" bg-[#1FCE1C14] bg-opacity-[0.08] text-neutral-900 flex flex-col gap-4 py-8 px-6 md:py-14 md:px-8 items-center text-center font-body rounded-2xl shadow-box-light dark:shadow-box-dark dark:bg-neutral-800 dark:bg-opacity-100 dark:text-neutral-50 h-full"><span className="text-neutral-900 dark:text-neutral-50 bg-transparent scale-125 md:scale-[2.25] md:my-5"><span className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-900 text-lg font-bold dark:border-neutral-50 md:w-8 md:h-8">3</span>
                          </span>
                            <h3 className="text-h4 font-semibold">Start adding your activities and tours</h3>
                            <p className="text-p3 sm:text-p2">After approval, you can submit your products for review and optimization.</p>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* 2 */}

                  <section className='md:mb-4'>
                    <div className="md:w-1/3 mx-auto  flex justify-center text-center">
                      <h2 className="font-bold">
                        Are you a private or a company host?<br />
                        You will need to provide more information if you are a company host
                      </h2>
                    </div>
                  </section>

                  <section className="py-8 md:pt-0 md:pb-20 px-4">
                    <div className="xl:container mx-auto">
                      <div className="mx-auto lg:w-10/12 xl:w-8/12">
                        <div style={{ outline: "none" }}>
                          <form>
                            <div>
                              <div style={{ outline: "none", width: "100%;" }}>
                                <div className="pt-4 text-center space-y-4 md:pt-6 md:space-x-6">
                                  <Button label={'Private Host'}/>
                                  <Button label={'Company Host'}/>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 3 */}
                  <section className="font-body flex items-center pt-24 pb-52 md:py-14 px-4 w-full relative bg-cover  bg-center md:bg-right-bottom 
                h-auto min-h-auto md:min-h-[620px] lg:h-[calc(100vh-300px)] after:inset-0 after:absolute after:z-0 after:bg-neutral-800 
                after:bg-opacity-60 before:inset-0 before:absolute before:z-0 lg:after:bg-opacity-0  
                lg:before:bg-gradient-to-r lg:before:from-[#0F1A3666] lg:before:to-[#0F1A3610]"
                    style={{ backgroundImage: `url(https://user-images.githubusercontent.com/75487668/141359343-ebf316c7-eec0-4267-847b-d8fb61219edd.jpg)` }}>
                    {/* <div className="absolute inset-0">
                    <Image src={Main2} alt="Main2" layout='fill' objectFit='cover' />
                  </div> */}
                    <div className="xl:container mx-auto h-1/2 relative z-10 text-neutral-50">
                      <div className="flex flex-col gap-y-8 ">
                        <div className="flex flex-col gap-y-8 ">
                          <h2 className="text-[1.5rem] md:text-[50px] md:leading-10 lg:w-7/12 xl:w-3/12  font-bold">
                            <span className='leading-tight'>We promote local tourism</span>
                          </h2>
                          <p className="text-[1.125rem]  font-semibold md:text-[31px] md:font-bold lg:w-7/12 xl:w-5/12">
                            <span className='md:leading-10'>We are your strong partner in tourism marketing. Increase your turnover with us and raise your profile for a successful season.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      <ScrollToTopButton />
    </>
  )
}

export default page