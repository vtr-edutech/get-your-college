import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData } from "@/store/userInfoSlice";

const useUserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfo._id) {
        try {
          const response = await axios.get("/api/user-info");
          dispatch(setUserData(response.data.user));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user info:", error);
          toast.error("There was an error trying to fetch user information!");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserInfo();

    // Clean up function
    return () => {
      // Any cleanup code if needed
    };
  }, [dispatch, userInfo]);

  return { userInfo, loading };
};

export { useUserInfo };
