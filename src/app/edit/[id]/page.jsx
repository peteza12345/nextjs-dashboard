"use client"

import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

function EditPage({ params }) {

   const { data: session, status } = useSession();
   if (status === 'unauthenticated') redirect("/login");

   const { id } = params;
   const [postData , setPostData] = useState("");

   // New data of post
   const [newTitle, setNewTitle] = useState("");
   const [newImg, setNewImg] = useState("");
   const [newContent, setNewContent] = useState("");

   const router = useRouter();

   const getPostById = async (id) => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
            method: "GET",
            cache: "no-store"
         })

         if (!res.ok) {
            throw new Error("Failed to fetch post");
         }

         const data = await res.json();
         setPostData(data);

      } catch (error) {
         console.log("Failed to fetch data. ", error);
      }
   };

   useEffect(() => {
      getPostById(id);
   }, [session, id]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ newTitle, newImg, newContent })
         })

         if (!res.ok) {
            throw new Error("Failed to update post.");
         }

         router.refresh();
         router.push("/welcome");

      } catch (error) {
         console.log("Failed to edit post", error);
      }
   };

   if (status === "loading") return <p>Loading...</p>;

   return (
      <Container>
         <Navbar session={session} />

         <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>

               <Link href={'/welcome'}
                  className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'
                  >
                  Go back
               </Link>

               <hr className='my-3' />
               <h3 className='text-3xl'>Edit Post</h3>

               <form onSubmit={handleSubmit}>
                  <input type="text" name="post" id="post" 
                     placeholder={postData?.post?.title} 
                     onChange={(e) => setNewTitle(e.target.value)} 
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <input type="text" name="img" id="img" 
                     placeholder={postData?.post?.img} 
                     onChange={(e) => setNewImg(e.target.value)} 
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <textarea name="postcontent" id="postcontent" cols='30' role='10'
                     placeholder={postData?.post?.content} 
                     onChange={(e) => setNewContent(e.target.value)}
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                     >
                  </textarea>

                  <button type="submit"
                     className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                     >
                     Edit Post
                  </button>
               </form>

            </div>
         </div>

         <Footer/>
      </Container>
   )
}

export default EditPage