export type ISchedule = {
  [x: string]: any;
  id: string;
  startDateTime: string;
  endDateTime: string;
};

export type IScheduleFrom = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
