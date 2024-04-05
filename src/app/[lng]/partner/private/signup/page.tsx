'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Stepper from '@/components/Elements/Stepper';
import SignupOne from '@/components/private/SignupOne';
import SignUpTwo from '@/components/private/SignupTwo';

import { auth } from '@/firebase/firebase';
import { addData } from '@/firebase/firestore/data';

const CompanySignUpPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const finalSubmit = (data) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);

    console.log('final submit data');
    console.log(finalData);
    const filteredData = { ...finalData };

    delete filteredData.confirmPassword;
    delete filteredData.password;
    delete filteredData.email;

    createUserWithEmailAndPassword(auth, finalData.email, finalData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        const userDetails = {
          email: user.email,
          userId: user.uid,
          userRole: 'supplier',
          userType: 'private',
          displayName: finalData.firstName + ' ' + finalData.lastName,
          createdAt: user.metadata.createdAt,
        };
        const userData = { ...userDetails, ...filteredData };
        console.log(userData);
        const { error } = addData('users', userData);

        if (error) {
          toast.error(error);
        }

        toast.success('New user created successfully');
        router.push('/partner/company/signup');
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setStep(2);
        toast.error(errorMessage);
        // ..
      });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='py-8 md:pt-0 md:pb-20 px-4 flex justify-center'>
      {/* <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg'> */}
      <div className='xl:container'>
        <div className='mx-auto lg:w-10/12 xl:w-8/12'>
          <Stepper currPage={step} />
          {step === 1 && (
            <SignupOne
              nextStep={nextStep}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {step === 2 && (
            <SignUpTwo
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              updateFormData={updateFormData}
              finalSubmit={finalSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySignUpPage;
