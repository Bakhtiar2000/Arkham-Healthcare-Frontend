import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";

export const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a Doctor Schedule
    createDoctorSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),

    // Get all Doctor Schedules
    getAllDoctorSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          doctorSchedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),

    // Get a Doctor Schedule
    getDoctorSchedule: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/schedule/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    // Get my doctor schedule
    getMySchedule: build.query({
      query: () => ({
        url: "/schedule/my-schedules",
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    // Delete Doctor Schedule
    deleteDoctorSchedule: build.mutation({
      query: (id: string) => ({
        url: `/doctor-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
});

export const {
  useCreateDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
  useGetDoctorScheduleQuery,
  useGetMyScheduleQuery,
  useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
