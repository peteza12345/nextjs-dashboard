import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faSignsPost } from '@fortawesome/free-solid-svg-icons'

function Content({ totalUser, totalPost }) {
   return (
      <div className='px-10 rounded-lg'>
         <div className='flex'>

            <section className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
               <h3 className='flex items-center'> <FontAwesomeIcon icon={faUsers} className='mr-2 size-8' /> Total Users </h3>
               <p className='text-5xl mt-10'> { totalUser?.length } </p>
            </section>

            <section className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
               <h3 className='flex items-center'> <FontAwesomeIcon icon={faSignsPost} className='mr-2 size-8' /> Total Posts </h3>
               <p className='text-5xl mt-10'> { totalPost?.length } </p>
            </section>

         </div>
         <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione placeat repellendus harum, perspiciatis nostrum voluptas, et aliquid impedit, repellat sunt odio hic optio tenetur. Autem cumque quam doloremque ut natus!
         </p>
      </div>
   )
}

export default Content