import React, { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      console.log(res.data); // Use the response data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
