import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

// Customized axios interaction

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/josn";
axiosInstance.defaults.headers["Accept"] = "application/josn";
axiosInstance.defaults.timeout = 60000; // If the request is not responded within 60 seconds, then it will be canceled

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) config.headers.Authorization = accessToken;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // @ts-ignore  --> Ignoring typescript error for following line
  function (response) {
    const responseObject: ResponseSuccessType = {
      // Modified response, so that I don't need to write data?.data every time
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const responseObject: IGenericErrorResponse = {
      // Modified error
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  }
);

export { axiosInstance };
