'use client';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import StepperTwo from '@/components/Elements/stepperTwo';
import SignupOne from '@/components/private/SignupOne';
import SignUpTwo from '@/components/private/SignupTwo';

import { auth } from '@/firebase/firebase';
import { addData } from '@/firebase/firestore/data';

interface Params {
  lng: string;
}

const CompanySignUpPage = ({ params: { lng } }: { params: Params }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const finalSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);

    console.log('final submit data');
    console.log(finalData);
    const filteredData = { ...finalData };

    delete filteredData.confirmPassword;
    delete filteredData.password;
    delete filteredData.email;

    createUserWithEmailAndPassword(auth, finalData.email, finalData.password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        await sendEmailVerification(user);

        const userDetails = {
          email: user.email,
          userId: user.uid,
          userRole: 'supplier',
          userType: 'private',
          displayName: finalData.firstName + ' ' + finalData.lastName,
          createdAt: user.metadata.creationTime,
        };
        const userData = { ...userDetails, ...filteredData };
        console.log(userData);
        // const { error } = addData('users', userData);

        // if (error) {
        //   toast.error(error);
        // }

        addData('users', userData)
          .then(({ error }) => { // Destructure result and error directly from the resolved value
            if (error) {
              //toast.error(error);
              console.log(error);
            }
          })
          .catch((error) => {
            // Handle errors from addData
            console.error("Error adding user data:", error);
            toast.error('Failed to add user data. Please try again.');
          });

        toast.success('New supplier created successfully');
        router.push('/partner/private/signup');
        // ...
      })
      .catch((error) => {

        setStep(2);
        if (error.code === 'auth/email-already-in-use') {

          toast.error("This email is already in use. Please use a different email address or log in.");
        } else {
          // Handle other errors
          toast.error("An error occurred. Please try again.");

        }

      });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const stepDetails = [
  //   { stepid: 1, stepTitle: 'Personal Information' },
  //   { stepid: 2, stepTitle: 'Additional Information' },
  // ];
  return (
    <div className='py-8 md:pt-0 md:pb-20 px-4 flex justify-center'>
      {/* <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg'> */}
      <div className='xl:container'>
        <div className='mx-auto lg:w-10/12 xl:w-8/12'>
          {/* <Stepper currPage={step} /> */}
          <StepperTwo currPage={step} />
          {/* <DynamicStepper currPage={step} stepDetails={stepDetails} /> */}
          {step === 1 && (
            <SignupOne
              nextStep={nextStep}
              formData={formData}
              updateFormData={updateFormData}
              lang={lng}
            />
          )}
          {step === 2 && (
            <SignUpTwo
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              updateFormData={updateFormData}
              finalSubmit={finalSubmit}
              lang={lng}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySignUpPage;
