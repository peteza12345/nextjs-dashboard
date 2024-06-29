import React from 'react'
import Logo from '/public/next.svg'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

function AdminNav({ session }) {
   return (
      <nav className='shadow-xl'>
         <div className='container mx-auto'>
            <div className='flex justify-between items-center p-4'>

               <div>
                  <Link href={'/'}>
                     <Image src={Logo} alt='NextJS Logo' className='w-20 h-8 ' />
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
                        <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 text-lg rounded-md my-2 cursor-pointer'>
                           Logout
                        </a>
                     </li>
                  )}
                  
               </ul>

            </div>
         </div>
      </nav>
   )
}

export default AdminNav