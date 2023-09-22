import { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import instance from '../utils/instance';

const cloud_name = import.meta.env.VITE__CLOUD_NAME;
const upload_preset = import.meta.env.VITE__UPLOAD_PRESET;

const CreateBlog = () => {
  const [cover, setCover] = useState(null);

  const [imageLoading, setImageLoading] = useState(false);

  const [blogData, setBlogData] = useState({
    title: '',
    summary: '',
    content: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const profileImage = e.target.files[0];

    try {
      setImageLoading(true);
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', cloud_name);
        image.append('upload_preset', upload_preset);

        // Save image to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dzwub5bux/image/upload',
          { method: 'post', body: image }
        );

        const imgData = await response.json();

        setCover(imgData.url.toString());
      }

      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await instance.post('/blogs', {
        ...blogData,
        cover,
      });

      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <form className="container mx-auto w-1/2" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Blog
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={blogData.title}
                    id="title"
                    name="title"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Summary
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={handleChange}
                    value={blogData.summary}
                    id="summary"
                    name="summary"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about blog.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    value={blogData.content}
                    onChange={handleChange}
                    id="content"
                    name="content"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a full content about blog.
                </p>
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div> */}

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        {imageLoading ? (
                          <span>Uploading file please wait....</span>
                        ) : (
                          <span>Upload a file</span>
                        )}
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      {!imageLoading && (
                        <p className="pl-1">or drag and drop</p>
                      )}
                    </div>
                    {!imageLoading && (
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    )}

                    {!imageLoading && cover && (
                      <img src={cover} alt="cover thumbnail" />
                    )}
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
