"use client"

import React, { useEffect, useState } from 'react'
import AdminCon from '../components/AdminCon'
import AdminNav from '../components/AdminNav'
import AdminFooter from '../components/AdminFooter'
import SideNav from '../components/SideNav'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'

export default function UserPage() {

   const { data: session, status } = useSession();

   if (status === 'unauthenticated') redirect("/login");
   if (session?.user?.role !== "admin") redirect('/welcome');

   const [allUser, setAllUser] = useState([]);

   const getAllUser = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
            cache: 'no-store'
         })

         if (!res.ok) {
            throw new Error("Failed to fetch user.");
         }

         const data = await res.json();
         setAllUser(data.totalUsers);

      } catch (error) {
         console.log("Error loading user.", error)
      }
   };

   useEffect(() => {
      getAllUser();
   }, []);

   if (status === 'loading') return <p>Loading...</p>;

   return (
      <AdminCon>
         <AdminNav session={session} />
         <div className='flex-grow'>
            <div className='container mx-auto'>
               <div className='flex mt-10'>

                  <SideNav/>
                  <section className='p-10'>
                     <h3 className='text-3xl mb-3'>Manage Users</h3>
                     <p>A List of users retrieved from MongoDB database</p>

                     <div className='shadow-lg overflow-x-auto'>
                        <table className='text-left rounded-md mt-3 table-fixed w-full'>
                           <thead>
                              <tr className='bg-gray-400'>
                                 <th className='p-5'>ID</th>
                                 <th className='p-5'>Username</th>
                                 <th className='p-5'>Email</th>
                                 <th className='p-5'>Role</th>
                                 <th className='p-5'>Actions</th>
                              </tr>
                           </thead>

                           <tbody>
                              {allUser?.map((val) => (
                                 <tr key={val._id}>
                                    <td className='p-5'>{val._id}</td>
                                    <td className='p-5'>{val.name}</td>
                                    <td className='p-5'>{val.email}</td>
                                    <td className='p-5'>{val.role}</td>
                                    <td className='p-5'>
                                       <Link href={`/admin/users/edit/${val._id}`} 
                                          className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2 me-2'
                                          >
                                          Edit
                                       </Link>
                                       <DeleteBtn id={val._id} />
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
