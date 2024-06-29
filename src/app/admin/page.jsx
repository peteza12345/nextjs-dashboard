"use client"

import React, { useEffect, useState } from 'react'
import AdminNav from './components/AdminNav'
import AdminFooter from './components/AdminFooter'
import AdminCon from './components/AdminCon'
import SideNav from './components/SideNav'
import Content from './components/Content'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminPage() {

   const { data: session, status } = useSession();
   const [totalUser, setTotalUser] = useState([]);
   const [totalPost, setTotalPost] = useState([]);

   const fetchData = async (url, setState) => {
      try {
         const res = await fetch(url, { method: "GET", cache: 'no-store' });

         if (!res.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
         }

         const data = await res.json();
         setState(data);
      } catch (error) {
         console.error(`Failed to fetch data from ${url}`, error);
      }
   };

   useEffect(() => {
      fetchData(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, (data) => setTotalUser(data.totalUsers));
      fetchData(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, (data) => setTotalPost(data.totalPosts));
   }, []);

   if (status === 'unauthenticated') redirect("/login");
   if (session?.user?.role !== "admin") redirect('/welcome');
   if (status === 'loading') return <p>Loading...</p>;

   return (
      <AdminCon>
         <AdminNav session={session} />

         <div className='flex-grow'>
            <div className='container mx-auto'>

               <section className='flex justify-between mt-10'>
                  <SideNav/>
                  <Content totalUser={totalUser} totalPost={totalPost} />
               </section>

            </div>
         </div>

         <AdminFooter/>
      </AdminCon>
   )
}

export default AdminPage