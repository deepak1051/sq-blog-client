import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../utils/instance';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import useUserData from '../hooks/useUserData';

const Comment = () => {
  const usersQuery = useUserData();

  const { id } = useParams();
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const commentQuery = useQuery(['blogs', id, 'comments'], ({ signal }) =>
    instance.get(`/comments/${id}`, { signal }).then((res) => res.data)
  );

  const mutation = useMutation({
    mutationFn: (text) => {
      return instance.post(`/comments/${id}`, text);
    },

    onSuccess() {
      queryClient.invalidateQueries(['blogs', id, 'comments']);
      setText('');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ commentId }) => {
      return instance.delete(`/comments/${commentId}`);
    },

    onSuccess() {
      queryClient.invalidateQueries(['blogs', id, 'comments']);
      setText('');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ text });
  };

  const handleDelete = (commentId) => {
    console.log(commentId);
    deleteMutation.mutate({ commentId });
  };

  if (commentQuery.isLoading) return <p>Loading...</p>;
  if (commentQuery.isError) return <p>{commentQuery.error.message}</p>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
      >
        <div className="px-3 mb-2 mt-2">
          <textarea
            placeholder="comment"
            className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end px-4">
          <button
            type="submit"
            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
          >
            Comment
          </button>
        </div>
      </form>

      <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
        <h3 className="font-bold">Discussion ({commentQuery.data.length})</h3>

        <div className="flex flex-col">
          {commentQuery.data.map((item) => (
            <div
              className="border rounded-md p-3 ml-3 my-3 relative"
              key={item._id}
            >
              <div className="flex gap-3 items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-8 h-8 rounded-full 
                    border-2 border-emerald-400  shadow-emerald-400
                    "
                />

                <h3 className="font-bold">{item.authorName}</h3>

                <span>
                  {' '}
                  {format(
                    item?.createdAt ? new Date(item?.createdAt) : new Date(),
                    'dd-MM-yyyy'
                  )}
                </span>
              </div>

              <p className="text-gray-600 mt-2">{item.text}</p>
              {usersQuery.data._id === item.author && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
