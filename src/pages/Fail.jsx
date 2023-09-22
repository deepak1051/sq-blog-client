import React from 'react';
import { Link } from 'react-router-dom';

const Fail = () => {
  return (
    <div>
      Oauth failed, Go to <Link to="/">Homepage</Link>
    </div>
  );
};

export default Fail;
