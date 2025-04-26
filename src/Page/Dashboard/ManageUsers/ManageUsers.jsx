import React from 'react'
import useUsers from '../../../Components/Hooks/useUsers'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure'

const ManageUsers = () => {
  const {users, refetch} = useUsers() 
  const axiosSecure = useAxiosSecure()

  const handleMakeAdmin = (id) => {
    // You can integrate your backend API here
    console.log('Make Admin for:', id);
  };

  const handleDelete = (id) => {
  
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your user has been deleted.",
                  icon: "success"
                });
                refetch()
              }
            })
        }
      });
    }
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">#</th>
              <th className="text-left py-3 px-4">First Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 capitalize">{user.name || 'N/A'}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role || 'user'}</td>
                <td className="py-3 px-4 space-x-2">
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers;
