"use client"

import React, { useEffect, useState } from 'react'
import AdminCon from '../../../components/AdminCon'
import AdminNav from '../../../components/AdminNav'
import AdminFooter from '../../../components/AdminFooter'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export default function AdminEditePostsPage({ params }) {

   const { data: session, status } = useSession();
   const { id } = params;
   const router = useRouter();

   const [oldPostData, setOldPostData] = useState([]);
   const [newTitle, setNewTitle] = useState("");
   const [newImg, setNewImg] = useState("");
   const [newContent, setNewContent] = useState("");

   const getPostById = async (id) => {
      try {

         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
            method: "GET",
            cache: "no-store"
         })

         if (!res.ok) {
            throw new Error("Failed to fetch totalposts.");
         }

         const data = await res.json();
         setOldPostData(data.post);
         
      } catch (error) {
         console.log("Error to get data.", error);
      }
   };

   useEffect(() => {
      getPostById(id);
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {

         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ newTitle, newImg, newContent })
         })

         if (!res.ok) {
            throw new Error("Failed to put totalpost.");
         }

         router.refresh();
         router.push("/admin/posts");
         
      } catch (error) {
         console.log("Error to get data.", error);
      }
   };

   if (session?.user?.role !== "admin") redirect("/welcome");
   if (status === "unauthenticated") redirect("/login");
   if (status === "loading") return <p>Loding...</p>;

   return (
      <AdminCon>
         <AdminNav session={session}/>
         <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>

               <Link href={'/admin/posts'}
                  className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'
                  >
                  Go back
               </Link>

               <hr className='my-3' />
               <h3 className='text-3xl'>Admin Edit User Post</h3>

               <form onSubmit={handleSubmit}>
                  <input type="text" name="post" id="post" 
                     placeholder={oldPostData?.title} 
                     onChange={(e) => setNewTitle(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <input type="text" name="img" id="img" 
                     placeholder={oldPostData?.img} 
                     onChange={(e) => setNewImg(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <textarea name="postcontent" id="postcontent" cols='30' role='10'
                     placeholder={oldPostData?.content} 
                     onChange={(e) => setNewContent(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                     >
                  </textarea>

                  <button type="submit"
                     className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                     >
                     Update Post
                  </button>
               </form>

            </div>
         </div>
         <AdminFooter/>
      </AdminCon>
   )
}
