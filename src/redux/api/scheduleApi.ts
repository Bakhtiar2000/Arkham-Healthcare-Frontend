import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { ISchedule } from "@/types/schedule";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a SChedule
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    // Get a Schedule
    getAllSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISchedule[], meta: IMeta) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),

    // Delete Schedule
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} = scheduleApi;
