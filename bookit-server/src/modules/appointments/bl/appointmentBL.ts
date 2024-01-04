import { AppointmentModel, ScheduleModel } from '../../../models';
import * as ScheduleBL from '../../schedules/bl/scheduleBL';
import * as ServiceBL from '../../services/bl/serviceBL';
import * as ShopBL from '../../shops/bl/shopBL';
import * as UserBL from '../../users/bl/userBL';

export const getAppointments = async () =>
  AppointmentModel.find().populate('userId serviceId scheduleId');

export const checkAvailability = async (
  scheduleUuid: string,
  date: Date,
  duration: number
): Promise<boolean> => {
  const schedule = await ScheduleBL.getScheduleByUuid(scheduleUuid);
  return true;
};

const getAppointmentsByScheduleId = (scheduleId: string) => {
  const tenMinutesAgo = new Date();
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

  return AppointmentModel.find({
    scheduleId,
    $or: [
      { savedTemporaryDate: { $gte: tenMinutesAgo } },
      { savedTemporaryDate: { $exists: false } },
    ],
  }).lean();
};

export const getAvailableAppointments = async (
  shopUuid: string,
  serviceUuid: string,
  startDate: Date,
  endDate: Date
): Promise<Array<Date>> => {
  let currentDay = new Date(startDate);
  let allAppointments: any = {};

  while (currentDay <= endDate) {
    const appointmentsForDay = await getAvailableAppointmentsByDate(
      shopUuid,
      serviceUuid,
      currentDay
    );
    allAppointments = { ...allAppointments, currentDay: appointmentsForDay };

    currentDay.setDate(currentDay.getDate() + 1);
  }

  return allAppointments;
};

export const getAvailableAppointmentsByDate = async (
  shopUuid: string,
  serviceUuid: string,
  date: Date
): Promise<Array<Date>> => {
  const SLOT = 10;

  const shop = await ShopBL.getShopByUuid(shopUuid);
  if (!shop) {
    throw new Error('Shop not found');
  }
  const schedulePerDate = await ScheduleBL.getScheduleByShopId(shop._id, date);
  if (!schedulePerDate) {
    throw new Error('Working hours not defined');
  }

  const service = await ServiceBL.getServiceByUuid(serviceUuid);
  if (!service) {
    throw new Error('Service not found');
  }

  // working hours
  const availableAppointments: Date[] = schedulePerDate.workingHours.reduce(
    (current: any, workingHours: any) => {
      const start = workingHours.start;
      const end = workingHours.end;
      const appointments = [];

      for (let i = start; i < end; i.setMinutes(i.getMinutes() + SLOT)) {
        appointments.push(new Date(i));
      }

      return [...current, ...appointments];
    },
    []
  );

  const bookedAppointments = await getAppointmentsByScheduleId(
    schedulePerDate._id
  );

  let filteredAvailableAppointments = availableAppointments;

  for (let i = 0; i < bookedAppointments.length; i++) {
    const { date: startTime, serviceId } = bookedAppointments[i];

    const service = await ServiceBL.getServiceById(serviceId as any);
    if (!service) {
      throw new Error('Service not found');
    }

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + service.duration);
    startTime.setMilliseconds(0);
    startTime.setSeconds(0);
    endTime.setMilliseconds(0);
    endTime.setSeconds(0);

    filteredAvailableAppointments = filteredAvailableAppointments.filter(
      appointment => !(appointment >= startTime && appointment < endTime)
    );
  }

  const duration = service.duration;
  const availableSlotsNeeded = duration / SLOT - 1;

  const filteredAvailableAppointmentsWithDuration =
    filteredAvailableAppointments.filter((appointment, index) => {
      for (let i = 1; i <= availableSlotsNeeded; i++) {
        const nextAppointment = filteredAvailableAppointments?.[index + i];
        const differenceInMinutes =
          (nextAppointment?.getTime() - appointment.getTime()) / 1000 / 60 / i;

        if (nextAppointment && differenceInMinutes !== SLOT) {
          return false;
        }
      }
      return true;
    });

  return filteredAvailableAppointmentsWithDuration;
};

export const createAppointment = async ({
  shopUuid,
  serviceUuid,
  userUuid,
  date,
}: {
  shopUuid: string;
  serviceUuid: string;
  userUuid: string;
  date: Date;
}) => {
  const service = await ServiceBL.getServiceByUuid(serviceUuid);
  const shop = await ShopBL.getShopByUuid(shopUuid);
  if (!shop || !service) {
    throw new Error('Something went wrong');
  }

  const user = await UserBL.getUserByUuid(userUuid);
  if (!user) {
    throw new Error('Something went wrong');
  }

  const endDate = new Date(date);
  endDate.setMinutes(endDate.getMinutes() + service.duration);

  const appointment = await AppointmentModel.create({
    date,
    endDate,
    userId: user._id,
    serviceId: service._id,
    shopUuid: shop._id,
  });
  return appointment;
};

export const getAppointmentsByUserId = async (id: string) =>
  AppointmentModel.find({ userId: id })
    .populate('userId serviceId scheduleId')
    .sort({ date: 1 })
    .exec();

export const deleteAppointment = async (id: string) =>
  AppointmentModel.findByIdAndDelete(id).exec();

export const getUserHistoryAppointments = async (userId: string) => {
  const appointments = await AppointmentModel.find({ userId })
    .sort({ date: 1 })
    .populate('userId serviceId scheduleId')
    .exec();
  const now = new Date();
  const pastAppointments = appointments.filter(
    appointment => appointment.date < now
  );
  return pastAppointments;
};

export const getUserSoonAppointments = async (userId: string) => {
  const appointments = await AppointmentModel.find({ userId })
    .sort({ date: 1 })
    .populate('userId serviceId scheduleId')
    .exec();
  const now = new Date();
  const futureAppointments = appointments.filter(
    appointment => appointment.date > now
  );
  return futureAppointments;
};

export const getClosestAppointment = async (userId: string) => {
  const appointments = await AppointmentModel.find({ userId })
    .sort({ date: 1 })
    .populate('userId serviceId scheduleId')
    .exec();
  const now = new Date();
  const futureAppointments = appointments.filter(
    appointment => appointment.date > now
  );
  return futureAppointments[0];
};

export const getUserByPhone = async (phone: string) => {
  const user = await UserBL.getUserByPhone(phone);

  return user;
};

export const createAppointmentByAdmin = async ({
  userUuid,
  shopUuid,
  serviceUuid,
  date,
}: {
  userUuid: string;
  shopUuid: string;
  serviceUuid: string;
  date: Date;
}) => {
  const user = await UserBL.getUserByUuid(userUuid);

  const shop = await ShopBL.getShopByUuid(shopUuid);
  const service = await ServiceBL.getServiceByUuid(serviceUuid);
  if (!user || !shop || !service) {
    throw new Error('Something went wrong');
  }

  const appointment = await AppointmentModel.create({
    date,
    userId: user._id,
    serviceId: service._id,
  });

  return appointment;
};

export const createCircularAppointments = async ({
  shopUuid,
  serviceUuid,
  date,
  userUuid,
  numberOfWeeks,
}: {
  shopUuid: string;
  serviceUuid: string;
  date: Date;
  userUuid: string;
  numberOfWeeks: number;
}) => {
  const service = await ServiceBL.getServiceByUuid(serviceUuid);
  const shop = await ShopBL.getShopByUuid(shopUuid);
  if (!shop || !service) {
    throw new Error('Something went wrong');
  }

  const user = await UserBL.getUserByUuid(userUuid);
  if (!user) {
    throw new Error('Something went wrong');
  }

  const circularAppointments = [];
  for (let i = 0; i < numberOfWeeks; i++) {
    const appointmentDate = new Date(
      date.getTime() + i * 7 * 24 * 60 * 60 * 1000
    );
    const appointment = await AppointmentModel.create({
      date: appointmentDate,
      userId: user._id,
      serviceId: service._id,
    });

    circularAppointments.push(appointment);
  }

  return circularAppointments;
};

export const getAdminAppointments = async (shopUuid: string) => {
  const shop = await ShopBL.getShopByUuid(shopUuid);
  if (!shop) {
    throw new Error('Shop not found');
  }
  const appointments = await AppointmentModel.find({ shopUuid: shop._id })
    .populate('userId serviceId scheduleId')
    .exec();
  return appointments;
};
