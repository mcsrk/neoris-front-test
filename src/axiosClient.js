import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // timeout: 2500,
});
export function getRequest(URL, payload) {
  return axiosClient.get(`/${URL}`, payload).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
