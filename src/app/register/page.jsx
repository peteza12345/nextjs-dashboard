"use client";

import React, { useState } from 'react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

function RegisterPage() {

   const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
   });
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const router = useRouter();

   const { data: session, status } = useSession();
   if (status === 'authenticated') redirect("/welcome");
   if (status === 'authenticated' && session?.user?.role === "admin") redirect("/admin");

   const validateForm = () => {
      if (!user.name || !user.email || !user.password || !user.confirmpassword) {
         setError('Please complete all inputs');
         return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
         setError('Please enter a valid email address');
         return false;
      }

      if (user.password !== user.confirmpassword) {
         setError('Passwords do not match');
         return false;
      }

      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      try {

         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: user.name,
               email: user.email,
               password: user.password
            })
         });

         if (res.ok) {
            setError(null);
            setSuccess("User registered successfully");
            setUser({ name: '', email: '', password: '', confirmpassword: '' });
         } else {
            const errorData = await res.json();
            setError(errorData.message || "User registration failed.");
         }

         router.push('/login');

      } catch (error) {
         console.log("Error during registration:", error);
         setError("An error occurred during registration. Please try again later.");
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser(prevState => ({
         ...prevState,
         [name]: value
      }));
      setError(null);
      setSuccess(null);
   }; 

   if (status === 'loading') return <p>Loading...</p>;

   return (
      <Container>
         <Navbar session={session}/>

         <div className='flex-grow'>
            <div className='flex justify-center items-center'>

               <section className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                  <h3 className='text-3xl'>Register</h3>
                  <hr className='my-3' />

                  <form onSubmit={handleSubmit}>

                     {success && (
                        <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                           {success}
                        </div>
                     )}

                     <input 
                        type="text" name="name" id="name"
                        onChange={handleChange}
                        value={user.name}
                        placeholder='Enter your name' 
                        className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                     />       
                     <input 
                        type="email" name="email" id="email"
                        onChange={handleChange}
                        value={user.email}
                        placeholder='Enter your email' 
                        className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                     />
                     <input 
                        type="password" name="password" id="password"
                        onChange={handleChange}
                        value={user.password}
                        placeholder='Enter your password' 
                        className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                     />
                     <input 
                        type="password" name="confirmpassword" id="confirmpassword"
                        onChange={handleChange}
                        value={user.confirmpassword}
                        placeholder='Confirm your password' 
                        className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                     />

                     {error && <p style={{ color: 'red' }}>{error}</p>}

                     <button type='submit'
                        className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                     >
                        Sign Up
                     </button>

                     <hr className='my-3' />
                     <p>
                        Already have an account? Go to 
                        <Link href={'/login'} className='text-blue-500 hover:underline'> Login </Link> 
                        Page
                     </p>
                  </form>
                    
               </section>

            </div>
         </div>

         <Footer />
      </Container>  
   );
}

export default RegisterPage;