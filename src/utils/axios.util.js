import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_API_URL;

axiosClient.defaults.headers = { 'Content-Type': 'application/json' };

// All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

const getRequest = (URL) =>
	axiosClient
		.get(`${URL}`)
		.then((response) => response)
		.catch((error) => error);

const postRequest = (URL, payload) =>
	axiosClient
		.post(`${URL}`, payload)
		.then((response) => response)
		.catch((error) => error);

const patchRequest = (URL, payload) =>
	axiosClient
		.patch(`${URL}`, payload)
		.then((response) => response)
		.catch((error) => error);

const deleteRequest = (URL) =>
	axiosClient
		.delete(`${URL}`)
		.then((response) => response)
		.catch((error) => error);

export { getRequest, postRequest, patchRequest, deleteRequest };
