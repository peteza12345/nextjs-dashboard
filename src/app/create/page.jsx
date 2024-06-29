"use client"

import React, { useState } from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

function CreatePage() {

   const { data: session, status } = useSession();
   if (status === 'unauthenticated') redirect("/login");

   const userEmail = session?.user?.email;

   const [title, setTitle] = useState("");
   const [img, setImg] = useState("");
   const [content, setContent] = useState("");

   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title || !img || !content) {
         alert("Please complete all inputs.")
         return;
      }

      try {

         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({title, img, content, userEmail})
         })

         if (res.ok) {
            router.push("/welcome");
         } else {
            throw new Error("Failed to create a post");
         }

      } catch (err) {
         console.log(err);
      }
   };

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
               <h3 className='text-3xl'>Create Post</h3>

               <form onSubmit={handleSubmit}>
                  <input type="text" name="post" id="post" 
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder='Post title' 
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <input type="text" name="img" id="img" 
                     onChange={(e) => setImg(e.target.value)}
                     placeholder='Post Img url' 
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                  />

                  <textarea name="postcontent" id="postcontent" cols='30' role='10'
                     onChange={(e) => setContent(e.target.value)}
                     placeholder='Enter your content'
                     className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 outline-none'
                     >
                  </textarea>

                  <button type="submit"
                     className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'
                     >
                     Create Post
                  </button>
               </form>

            </div>
         </div>

         <Footer/>
      </Container>
   )
}

export default CreatePage