import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import instance from '../utils/instance';
import { format } from 'date-fns';
import Comment from '../components/Comment';

const SingleBlog = () => {
  const { id } = useParams();
  const { isLoading, error, isError, data } = useQuery(
    ['blogs', id],
    () => instance.get(`/blogs/${id}`).then((res) => res.data),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    }
  );

  if (isError) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto w-3/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-500 text-sm">
              Published on {format(new Date(data?.createdAt), 'dd-MM-yyyy')}
            </p>
          </div>

          <img
            src={data.cover}
            alt="Featured image"
            className="w-full h-auto mb-8"
          />

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              varius fringilla augue, vel vestibulum nisl mattis vel. Praesent
              porttitor pharetra purus eu tincidunt.
            </p>
            <p>
              Nullam vitae sapien non est suscipit blandit quis sit amet ipsum.
              Aliquam euismod accumsan nunc, in convallis felis luctus in. Sed
              rhoncus metus a elit rutrum aliquam.
            </p>
            <p>
              Integer ullamcorper leo nulla, nec commodo metus vehicula eget.
              Duis vel vestibulum tellus, eget mattis quam. Nullam euismod
              libero sed nibh tristique, vel eleifend risus sagittis. In hac
              habitasse platea dictumst. Sed dapibus magna at arcu euismod, a
              pulvinar turpis tristique. Suspendisse imperdiet velit nec lectus
              rutrum varius.
            </p>
          </div>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default SingleBlog;
