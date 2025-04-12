import { authKey } from "@/constants/authKey";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
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
  async function (error) {
    const config = error?.config;
    // The default config.sent is undefined (false)
    if (error?.response?.status === 500 && !config?.sent) {
      config.sent = true;
      /* 
        config.sent = true; blocks the same request from being sent again within a single retry cycle. This guard (config.sent = true) prevents an infinite loop in cases where a 500 error keeps recurring.
        A real-world example is refresh token expiry. When the access token expires, the function calls getNewAccessToken() (line 50). If the refresh token itself is expired, the call to the refresh endpoint will also return a 500.
        Without the config.sent = true guard, the function would treat this second 500 error as just another failed request — and try to refresh again... and again... causing an infinite retry loop.
        By setting config.sent = true, we ensure that the original failed request is retried only once. If the retry also fails (e.g., because the refresh token is invalid), we stop there and don’t retry again.
        However, if a different request fails later (e.g., after the new token also eventually expires), it will go through the same logic again — because that will be a new config object (with sent undefined initially).
        So yes, config.sent only prevents multiple retries of the same request, and does not block future retries for new requests.
      */
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers.Authorization = accessToken;
      setToLocalStorage(authKey, accessToken);
      return axiosInstance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        // Modified error
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!",
        errorMessages: error?.response?.data?.message,
      };
      return Promise.reject(responseObject);
    }
  }
);

export { axiosInstance };
