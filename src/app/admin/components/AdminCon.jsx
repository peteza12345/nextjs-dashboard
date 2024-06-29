import React from 'react'

function AdminCon({ children }) {
   return (
      <div className='flex flex-col min-h-screen'>
         {children}
      </div>
   )
}

export default AdminCon