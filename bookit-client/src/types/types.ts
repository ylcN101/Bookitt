export interface IEvent {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  serviceImage: string;
  duration: number;
  price: number;
  serviceName: string;
  userPhone: string;
  date: string;
  endDate: string;
  serviceId: {
    _id: string;
    name: string;
    price: number;
    duration: number;
  };
}

export interface IWorkingHours {
  uuid: string;
  date: Date;
  workingHours: { start: Date; end: Date }[];
}
