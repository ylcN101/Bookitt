import express from 'express';
import {
  getAvailableAppointments,
  getAppointments,
  createAppointment,
  getAppointmentsByUserId,
  deleteAppointment,
  getClosestAppointment,
  getUserHistoryAppointments,
  getUserSoonAppointments,
  adminCreateAppointment,
  getAdminAppointments,
} from './appointments.controller';

const router = express.Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentsByUserId);
router.get('/admin/:shopUuid', getAdminAppointments);
router.get('/available', getAvailableAppointments);
router.get('/next/:userId', getClosestAppointment);
router.get('/history/:userId', getUserHistoryAppointments);
router.get('/soon/:userId', getUserSoonAppointments);
// router.get('/admin-meetings', getAdminAppointments);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);

export default router;
