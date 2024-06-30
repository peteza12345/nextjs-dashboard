"use client";

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

function LoginPage() {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const router = useRouter();

   const { data:session, status } = useSession();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await signIn("credentials", {
            email, password, redirect: false
         })

         if (res.error) {
            setError("Invalid Credentials");
            return;
         }

         router.replace("/welcome");

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (status === 'authenticated' && session?.user?.role !== "admin") router.replace("/welcome");
      if (status === 'authenticated' && session?.user?.role === "admin") router.replace("/admin");
   }, [session, status, router]);
   
   if (status === "loading") return <p>Loding...</p>;

   return (
      <Container>
         <Navbar/>

            <div className='flex-grow'>
               <div className='flex justify-center items-center'>

                  <section className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                     <h3 className='text-3xl'>Login</h3>
                     <hr className='my-3' />

                     <form onSubmit={handleSubmit}>

                        {error && (
                           <div className='bg-red-500 w-fit text-white text-sm py-1 px-3 rounded-md mt-2'>
                              {error}
                           </div>
                        )}

                        <input 
                           type="email" name="email" id="email" 
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder='Enter your email' 
                           className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                        />
                        <input 
                           type="password" name="password" id="password" 
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder='Enter your password'
                           className='w-full bg-gray-200 border outline-none py-2 px-3 rounded text-lg my-2'   
                        />

                        <button type='submit'
                           className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                           >
                           Sign In
                        </button>

                        <hr className='my-3' />
                        <p>
                           Do not have an account ? Go to 
                           <Link href={'/register'} className='text-blue-500 hover:underline'> Register </Link> 
                           Page
                        </p>
                     </form>
                  
                  </section>

               </div>
            </div>

         <Footer/>
      </Container>
   )
}

export default LoginPage