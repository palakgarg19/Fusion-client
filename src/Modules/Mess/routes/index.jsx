import { host } from "../../../routes/globalRoutes";

const messRoute = "/mess/api";

export const updateBalanceRequestRoute = `${host}${messRoute}/updatePaymentRequestApi/`;
export const updateSemDatesRoute = `${host}${messRoute}/messRegApi/`;
export const viewRegistrationDataRoute = `${host}${messRoute}/get_mess_students/`;
export const viewMenuRoute = `${host}${messRoute}/menuApi/`;
export const viewUpdatePaymentRequestsRoute = `${host}${messRoute}/updatePaymentRequestApi/`;
export const viewRegistrationRequestsRoute = `${host}${messRoute}/registrationRequestApi/`;
export const specialFoodRequestRoute = `${host}${messRoute}/specialRequestApi/`;
export const feedbackRoute = `${host}${messRoute}/feedbackApi/`;
export const deregistrationRequestRoute = `${host}${messRoute}/deRegistrationRequestApi/`;
export const viewBillsRoute = `${host}${messRoute}/get_student_bill/`;
export const rebateRoute = `${host}${messRoute}/rebateApi/`;
export const registrationRequestRoute = `${host}${messRoute}/registrationRequestApi/`;
export const checkRegistrationStatusRoute = `${host}${messRoute}/checkRegistrationStatusApi/`;
export const paymentRoute = `${host}${messRoute}/paymentsApi/`;
export const deregistrationRoute = `${host}${messRoute}/deRegistrationApi/`;
export const getMessStatusRoute = `${host}${messRoute}/get_mess_balance_statusApi/`;
