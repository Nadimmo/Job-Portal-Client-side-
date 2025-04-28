import React from 'react';
import useMessage from '../../../Components/Hooks/useMessage';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import { Trash2 } from 'lucide-react'; // using a nice trash icon

const UsersMessage = () => {
  const { messages, refetch } = useMessage();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: '#f0f4f8',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/contact/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Message has been deleted.', 'success');
            refetch();
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="min-h-screen  p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-10">Users Messages</h2>

        <div className="space-y-6">
          {messages?.length > 0 ? (
            messages.map((message) => (
              <div
                key={message._id}
                className="relative bg-white p-8 rounded-2xl shadow-lg lg:flex flex-col md:flex-row md:justify-between gap-6 hover:shadow-2xl transition-all"
              >
                {/* Left side: Message */}
                <div className="flex-1">
                  <p className="text-gray-700 text-lg">{message.message}</p>
                </div>

                {/* Right side: Name and Email */}
                <div className="md:w-1/3 flex flex-col justify-center bg-blue-50 p-6 rounded-xl w-full mt-4 md:mt-0">
                  <h4 className="text-xl font-semibold text-blue-700 mb-2">{message.name}</h4>
                  <p className="text-gray-600">{message.email}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(message._id)}
                  className="absolute top-34 right-4 text-red-500  hover:text-red-700 cursor-pointer transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersMessage;
