import instance from '../utils/instance';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const blogsQuery = useQuery(['users', 'blogs'], () =>
    instance.get('/blogs/public').then((res) => res.data)
  );

  const location = useLocation();

  useEffect(() => {
    if (location?.state?.message) {
      toast.error(location.state.message);
    }
  }, [location?.state?.message]);

  if (blogsQuery.isError) return <p>{blogsQuery.error.message}</p>;

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                Very proud to introduce
              </p>

              <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                Revolutionary way to build the web
              </h1>

              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#"
                  className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Start now
                </a>

                <a
                  href="#"
                  className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                >
                  Take tour
                </a>
              </div>
            </div>

            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
              <img
                src="https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&q=75&fit=crop&w=1000"
                loading="lazy"
                alt="Photo by Fakurian Design"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Blog
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {/* <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
              <a
                href="#"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    New trends in Tech
                  </a>
                </h2>

                <p className="mb-8 text-gray-500">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text.
                </p>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1611898872015-0571a9e38375?auto=format&q=75&fit=crop&w=64"
                        loading="lazy"
                        alt="Photo by Brock Wegner"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div>
                      <span className="block text-indigo-500">Mike Lane</span>
                      <span className="block text-sm text-gray-400">
                        July 19, 2021
                      </span>
                    </div>
                  </div>

                  <span className="rounded border px-2 py-1 text-sm text-gray-500">
                    Article
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
              <a
                href="#"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Lorenzo Herrera"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    Working with legacy stacks
                  </a>
                </h2>

                <p className="mb-8 text-gray-500">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text.
                </p>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1586116104126-7b8e839d5b8c?auto=format&q=75&fit=crop&w=64"
                        loading="lazy"
                        alt="Photo by peter bucks"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div>
                      <span className="block text-indigo-500">
                        Jane Jackobs
                      </span>
                      <span className="block text-sm text-gray-400">
                        April 07, 2021
                      </span>
                    </div>
                  </div>

                  <span className="rounded border px-2 py-1 text-sm text-gray-500">
                    Article
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
              <a
                href="#"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Magicle"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    10 best smartphones for devs
                  </a>
                </h2>

                <p className="mb-8 text-gray-500">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text.
                </p>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1592660503155-7599a37f06a6?auto=format&q=75&fit=crop&w=64"
                        loading="lazy"
                        alt="Photo by Jassir Jonis"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div>
                      <span className="block text-indigo-500">Tylor Grey</span>
                      <span className="block text-sm text-gray-400">
                        March 15, 2021
                      </span>
                    </div>
                  </div>

                  <span className="rounded border px-2 py-1 text-sm text-gray-500">
                    Article
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
              <a
                href="#"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Martin Sanchez"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <a
                    href="#"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    8 High performance Notebooks
                  </a>
                </h2>

                <p className="mb-8 text-gray-500">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text.
                </p>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&q=75&fit=crop&w=64"
                        loading="lazy"
                        alt="Photo by Aiony Haust"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div>
                      <span className="block text-indigo-500">Ann Park</span>
                      <span className="block text-sm text-gray-400">
                        January 27, 2021
                      </span>
                    </div>
                  </div>

                  <span className="rounded border px-2 py-1 text-sm text-gray-500">
                    Article
                  </span>
                </div>
              </div>
            </div> */}

            {blogsQuery.isLoading ? (
              <p>Loading...</p>
            ) : (
              blogsQuery.data.map((blog) => (
                <div
                  className="flex flex-col overflow-hidden rounded-lg border bg-white"
                  key={blog._id}
                >
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                  >
                    <img
                      src={blog.cover}
                      loading="lazy"
                      alt="Photo by Martin Sanchez"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                      >
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="mb-8 text-gray-500">
                      {blog.summary.substring(0, 50)}...
                    </p>

                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&q=75&fit=crop&w=64"
                            loading="lazy"
                            alt="Photo by Aiony Haust"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div>
                          <span className="block text-indigo-500">
                            {blog.author.name}
                          </span>
                          <span className="block text-sm text-gray-400">
                            {format(new Date(blog.createdAt), 'dd-MM-yyyy')}
                          </span>
                        </div>
                      </div>

                      <span className="rounded border px-2 py-1 text-sm text-gray-500">
                        Article
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Home;