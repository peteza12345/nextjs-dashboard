"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '/public/next.svg'
import { signOut } from 'next-auth/react'

function Navbar({ session }) {
   return (
      <nav className='shadow-xl'>
         <div className='container mx-auto'>
            <section className='flex justify-between items-center p-4'>

               <div>
                  <Link href={'/'}>
                     <Image src={Logo} alt='Nextjs Logo' className='w-20 h-8' />
                  </Link>
               </div>

               <ul className='flex'>
                  {!session ? (
                     <>
                        <li className='mx-3'><Link href={'/login'}>Login</Link></li>
                        <li className='mx-3'><Link href={'/register'}>Register</Link></li>
                     </>
                  ) : (
                     <li className='mx-3'>
                        <Link href='/welcome' className='bg-gray-500 text-white border py-2 px-3 text-lg rounded-md my-2 me-2'>
                           Profile
                        </Link>
                        <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 text-lg rounded-md my-2 cursor-pointer'>
                           Logout
                        </a>
                     </li>
                  )}
                  
               </ul>

            </section>
         </div>
      </nav>
   )
}

export default Navbar