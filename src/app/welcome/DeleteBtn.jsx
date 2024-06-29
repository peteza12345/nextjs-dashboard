"use client"

import React from 'react'

export default function DeleteBtn({ id }) {

   const handleDelete = async () => {
      const confirmed = confirm("Are you sure? ");

      if (confirmed) {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?id=${id}`, {
            method: "DELETE"
         })

         if (res.ok) {
            window.location.reload();
         }
      }
   };

   return (
      <button onClick={handleDelete} 
         className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'
         >
         Delete
      </button>
   )
}
