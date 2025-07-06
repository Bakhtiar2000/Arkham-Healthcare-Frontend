import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // Get Single User
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    // Update My profile
    updateMyProfile: build.mutation({
      query: (data) => {
        return {
          url: '/user/update-my-profile',
          method: 'PATCH',
          data,
          contentType: 'multipart/form-data',
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateMyProfileMutation } = userApi;
