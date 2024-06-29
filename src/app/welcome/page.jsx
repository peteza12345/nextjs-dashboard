"use client"

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {

   const { data: session, status } = useSession();
   const [postData, setPostData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (status === 'authenticated' && session?.user?.email) {
         const fetchPosts = async () => {
            try {
               const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?email=${session.user.email}`, {
                  method: "GET",
                  cache: "no-store"
               });

               if (!res.ok) {
                  throw new Error("Failed to fetch posts.");
               }

               const data = await res.json();
               setPostData(data.posts);
            } catch (error) {
               setError("Error loading posts.");
               console.error("Error loading posts:", error);
            } finally {
               setLoading(false);
            }
         };

         fetchPosts();
      }
   }, [status, session]);

   if (status === 'loading') return <p>Loading...</p>;
   if (status === 'authenticated' && session?.user?.role === "admin") redirect("/admin")
   if (status === 'unauthenticated') redirect("/login");

   return (
      <Container>
         <Navbar session={session} />

         <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
               {/*===== Profile =====*/}
               <section className='flex justify-between items-center'>

                  <div>
                     <h3 className='text-3xl'>Profile</h3>
                     <p>Welcome, {session?.user?.name}</p>
                     <p>Email: {session?.user?.email}</p>
                  </div>

                  <div>
                     <Link href={'/create'} 
                        className='bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2'
                        >
                        Create Post
                     </Link>
                  </div>

               </section>
               {/*===== User Post Data =====*/}
               <section>
                  {loading ? (
                     <p>Loading posts...</p>
                  ) : error ? (
                     <p className='text-red-500'>{error}</p>
                  ) : postData.length > 0 ? (
                     postData.map((val) => (
                        <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
                           <h4 className='text-2xl'>{val.title}</h4>
                           <Image
                              className='my-3 rounded-md max-w-52 max-h-80'
                              src={val.img}
                              alt={val.title}
                              width={300}
                              height={250}
                              priority
                           />
                           <p>{val.content}</p>
                           <div className='mt-5'>
                              <Link href={`/edit/${val._id}`} className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2 me-2'>
                                 Edit
                              </Link>
                              <DeleteBtn id={val._id} />
                           </div>
                        </div>
                     ))
                  ) : (
                     <p className='bg-gray-100 p-3 my-3'>You do not have any posts yet.</p>
                  )} 

               </section>

            </div>
         </div>

         <Footer/>
      </Container>
   )
}

export default WelcomePage