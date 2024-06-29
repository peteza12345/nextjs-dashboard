import Link from 'next/link'
import React from 'react'

function SideNav() {
   return (
      <nav className='shadow-lg p-10 rounded-lg'>
         <ul>
            <li className='black my-3 p-3 rounded-lg'> <Link href={'/admin'}>Dashboard</Link> </li>
            <li className='black my-3 p-3 rounded-lg'> <Link href={'/admin/users'}>Users</Link> </li>
            <li className='black my-3 p-3 rounded-lg'> <Link href={'/admin/posts'}>Posts</Link> </li>
         </ul>
      </nav>
   )
}

export default SideNav