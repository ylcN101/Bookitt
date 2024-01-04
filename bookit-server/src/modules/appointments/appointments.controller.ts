import * as appointmentBL from './bl/appointmentBL';
import createCombineDateUTC from '../../utils/createCombineDateUTC';

export const getAppointments = async (req: any, res: any) => {
  try {
    const appointments = await appointmentBL.getAppointments();
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const createAppointment = async (req: any, res: any) => {
  try {
    const { shopUuid, serviceUuid, userUuid, date } = req.body;
    const combinedDateUTC = createCombineDateUTC(date);
    const appointment = await appointmentBL.createAppointment({
      shopUuid,
      serviceUuid,
      date: combinedDateUTC,
      userUuid,
    });
    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getAvailableAppointments = async (req: any, res: any) => {
  try {
    const { shopUuid, serviceUuid, startDate, endDate } = req.body;

    const appointments = await appointmentBL.getAvailableAppointments(
      shopUuid,
      serviceUuid,
      startDate,
      endDate
    );

    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getAppointmentsByUserId = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const appointments = await appointmentBL.getAppointmentsByUserId(id);
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const deleteAppointment = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentBL.deleteAppointment(id);
    res.status(200).json(appointment);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getClosestAppointment = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const appointment = await appointmentBL.getClosestAppointment(userId);
    res.status(200).json(appointment);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getUserHistoryAppointments = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const appointments = await appointmentBL.getUserHistoryAppointments(userId);
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getUserSoonAppointments = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const appointments = await appointmentBL.getUserSoonAppointments(userId);
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const adminCreateAppointment = async (req: any, res: any) => {
  try {
    const { phone, shopUuid, serviceUuid, date, checked, numberOfWeeks } =
      req.body;

    const combinedDateUTC = createCombineDateUTC(date);
    const user = await appointmentBL.getUserByPhone(phone);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (checked) {
      const appointment = await appointmentBL.createCircularAppointments({
        shopUuid,
        serviceUuid,
        date: combinedDateUTC,
        userUuid: user.uid,
        numberOfWeeks,
      });

      res.status(201).json(appointment);
      return;
    } else {
      const appointment = await appointmentBL.createAppointmentByAdmin({
        shopUuid,
        serviceUuid,
        date: combinedDateUTC,
        userUuid: user.uid,
      });

      res.status(201).json(appointment);
      return;
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getAdminAppointments = async (req: any, res: any) => {
  const { shopUuid } = req.params;
  try {
    const appointments = await appointmentBL.getAdminAppointments(shopUuid);
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
};
