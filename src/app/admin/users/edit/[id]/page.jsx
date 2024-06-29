"use client"

import React, { useEffect, useState } from 'react'
import AdminCon from '../../../components/AdminCon'
import AdminNav from '../../../components/AdminNav'
import AdminFooter from '../../../components/AdminFooter'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export default function UserEditePage({ params }) {

   const { data: session, status } = useSession();
   if (status === 'unauthenticated') redirect("/login");
   if (session?.user?.role !== "admin") redirect('/welcome');
   
   const { id } = params;
   const [userOld, setUserOld] = useState([]);
   
   // New user data
   const [newName, setNewName] = useState("");
   const [newEmail, setNewEmail] = useState("");
   const [newPassword, setNewPassword] = useState("");
   
   const router = useRouter();

   const getUserById = async (id) => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
            method: "GET",
            cache: "no-store"
         })

         if (!res.ok) {
            throw new Error("Failed to fetch user.");
         }

         const data = await res.json();
         setUserOld(data.user);

      } catch (error) {
         console.log("Error to fetch data.", error);
      }
   };

   useEffect(() => {
      getUserById(id);
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ newName, newEmail, newPassword })
         })

         if (!res.ok) {
            throw new Error("Failed to up date user.");
         }

         router.refresh();
         router.push("/admin/users");

      } catch (error) {
         console.log("Error to fetch data", error);
      }
   };

   if (status === 'loading') return <p>Loading...</p>;

   return (
      <AdminCon>
         <AdminNav session={session} />
         <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>

               <Link href={'/admin/users'}
                  className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'
                  >
                  Go back
               </Link>

               <hr className='my-3' />
               <h3 className='text-3xl'>Admin Edit User</h3>

               <form onSubmit={handleSubmit}>
                  <input type="text" name="username" id="username" 
                     placeholder={userOld?.name} 
                     value={newName}
                     onChange={(e) => setNewName(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <input type="email" name="useremail" id="useremail" 
                     placeholder={userOld?.email} 
                     value={newEmail}
                     onChange={(e) => setNewEmail(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <input type="password" name="userpassword" id="userpassword" 
                     placeholder={userOld?.password} 
                     value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <button type="submit"
                     className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                     >
                     Update User
                  </button>
               </form>

            </div>
         </div>
         <AdminFooter/>
      </AdminCon>
   )
}
