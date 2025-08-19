import { SquarePen, Trash } from 'lucide-react'
import React from 'react'
import { useUser } from '../../hooks/useUser'
import type { IFormData } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { udpatingValues } from '../../redux/features/user'
import type { RootState } from '../../redux'
import { useNavigate } from 'react-router-dom'

const UsersView = () => {
  const { deleteUser, getUsers } = useUser()
  const { data } = getUsers()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.value)
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    if (user?.id == id) {
      dispatch(udpatingValues(null))
    }
    deleteUser.mutate(id)
  }

  const handleUpdate = (user: IFormData) => {
    dispatch(udpatingValues(user))
    navigate('/')
  }

  return (
    <div className="bg-[#F9F9F9] dark:bg-gray-900 min-h-[94vh] py-10">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#AC4D39] to-[#CCAA66] text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold">#</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Full Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Username</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Phone Number</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Password</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Update</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((u: IFormData, index: number) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                             hover:bg-[#CCAA66]/20 dark:hover:bg-[#AC4D39]/30 transition"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{u.fullName}</td>
                  <td className="py-3 px-6">{u.username}</td>
                  <td className="py-3 px-6">{u.email}</td>
                  <td className="py-3 px-6">{u.phoneNumber}</td>
                  <td className="py-3 px-6">{u.password}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleUpdate(u)}
                      className="p-2 rounded-md bg-[#CCAA66] text-white hover:bg-[#AC4D39] transition"
                    >
                      <SquarePen size={16} />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDelete(u.id || '')}
                      className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500 dark:text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UsersView)
