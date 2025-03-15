// import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage";
import { decodedToken } from "@/utils/jwt";
import { authKey } from "@/constants/authKey";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  console.log(authKey, accessToken);
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

// export const getNewAccessToken = async () => {
//   return await axiosInstance({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   });
// };
