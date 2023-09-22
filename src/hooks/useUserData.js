import { useQuery } from '@tanstack/react-query';

import instance from '../utils/instance';

const useUserData = () => {
  return useQuery(
    ['users', 'status'],
    ({ signal }) =>
      instance
        .get('/api/current_user', {
          withCredentials: true,
          signal,
        })
        .then((res) => res.data),
    {}
  );
};

export default useUserData;
