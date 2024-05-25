import React, { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

const useProfile = () => {
  const { user } = useAuthContext(); 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${user._id}`);
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return { profile };
};

export default useProfile;

