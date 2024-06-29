"use client"

import React, { useEffect, useState } from 'react'
import AdminCon from '../components/AdminCon'
import AdminNav from '../components/AdminNav'
import AdminFooter from '../components/AdminFooter'
import SideNav from '../components/SideNav'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

export default function UserPostsPage() {

   const { data: session, status } = useSession();
   const [postsData, setPostsData] = useState([]);

   const getPostsData = async () => {
      try {

         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {
            method: "GET",
            cache: "no-store"
         })

         if (!res.ok) {
            throw new Error('Failed to fetch posts');
         }

         const data = await res.json();
         setPostsData(data.totalPosts);
         
      } catch (error) {
         console.log("Error Loading Posts...", error);
      }
   };

   useEffect(() => {
      getPostsData();
   }, []);

   if (status === "unauthenticated") redirect("/login");
   if (session?.user?.role !== "admin") redirect("/welcome");
   if (status === "loading") return <p>Loading...</p>;

   return (
      <AdminCon>
         <AdminNav session={session} />
         <div className='flex-grow'>
            <div className='container mx-auto'>
               <div className='flex mt-10'>

                  <SideNav/>
                  <section className='p-10'>
                     <h3 className='text-3xl mb-3'>Manage Poosts</h3>
                     <p>A List of posts retrieved from MongoDB database</p>

                     <div className='shadow-lg overflow-x-auto'>
                        <table className='text-left rounded-md mt-3 table-fixed w-full'>
                           <thead>
                              <tr className='bg-gray-400'>
                                 <th className='p-5'>Post ID</th>
                                 <th className='p-5'>Post Title</th>
                                 <th className='p-5'>Post Image</th>
                                 <th className='p-5'>Post Content</th>
                                 <th className='p-5'>Actions</th>
                              </tr>
                           </thead>

                           <tbody>
                              {postsData.map((val) => (
                                 <tr key={val._id}>
                                    <td className='p-5'>{val._id}</td>
                                    <td className='p-5'>{val.title}</td>
                                    <td className='p-5'>
                                       <Image
                                          className='size-16 my-3 rounded-md'
                                          src={val.img}
                                          alt={val.title} width={64} height={64}
                                       />
                                    </td>
                                    <td className='p-5'>{val.content}</td>
                                    <td className='p-5'>
                                       <Link href={`/admin/posts/edit/${val._id}`} 
                                          className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2 me-2'
                                          >
                                          Edit
                                       </Link>
                                       
                                       <DeleteBtn id={val._id}/>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>

                     </div>
                  </section>

               </div>
            </div>
         </div>
         <AdminFooter/>
      </AdminCon>
   )
}
