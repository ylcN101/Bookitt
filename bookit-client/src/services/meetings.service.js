import { httpService } from '../utils/http.service';

export const meetingsService = {
  getMeetingsByUserId,
  removeMeeting,
  getShopById,
  getServicesByShopId,
  getNextMeeting,
  editUser,
  getHistoryMeetingsByUserId,
  getSoonMeetingsByUserId,
  editService,
  deleteService,
  addService,
  getUser,
  adminCreateMeeting,
  getAdminMeetings,
};

async function getMeetingsByUserId(userId) {
  return await httpService.get(`appointments/${userId}`);
}

async function removeMeeting(meetingId) {
  return await httpService.delete(`appointments/${meetingId}`);
}

async function getShopById(shopId) {
  return await httpService.get(`shops/${shopId}`);
}

async function getServicesByShopId(shopId) {
  return await httpService.get(`services/${shopId}`);
}

async function getNextMeeting(userId) {
  return await httpService.get(`appointments/next/${userId}`);
}

async function editUser(userId, user) {
  return await httpService.put(`users/${userId}`, user);
}

async function getHistoryMeetingsByUserId(userId) {
  return await httpService.get(`appointments/history/${userId}`);
}

async function getSoonMeetingsByUserId(userId) {
  return await httpService.get(`appointments/soon/${userId}`);
}

async function editService(service) {
  return await httpService.put(`services/${service._id}`, service);
}

async function deleteService(serviceId) {
  return await httpService.delete(`services/${serviceId}`);
}

async function addService(service) {
  return await httpService.post(`services`, service);
}

async function getUser(userId) {
  return await httpService.get(`users/${userId}`);
}

async function adminCreateMeeting(meeting) {
  return await httpService.post(`appointments/admin-book`, meeting);
}

async function getAdminMeetings(shopUuid) {
  return await httpService.get(`appointments/admin/${shopUuid}`);
}
