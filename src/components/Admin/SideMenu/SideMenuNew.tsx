import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const SideMenuNew = () => {
  return (
    <div className="w-1/5 bg-white h-screen mt-4">
      <ul className="text-gray-800">
        <button>
          <div className='flex gap-x-3 items-center dark:text-neutral-50'>
            <Link href="#">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </div>
        </button>

        <li className="flex items-center py-4 px-6">
          <Link href="/dashboard/users">
            <i className="fas fa-users mr-2"></i> Users
          </Link>
        </li>
        <li className="flex items-center py-4 px-6">
          <i className="fas fa-box mr-2"></i> Products
        </li>
        {/* <li className="flex items-center py-4 px-6">
          <i className="fas fa-shopping-cart mr-2"></i> Orders
        </li> */}
        <li className="flex items-center py-4 px-6">
          <i className="fas fa-cog mr-2"></i> Settings
        </li>
      </ul>
    </div>
  )
}
