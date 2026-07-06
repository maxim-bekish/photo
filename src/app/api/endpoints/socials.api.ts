import { api } from '../http/axiosInstance';

export const SocialsAPI = {
	getAll() {
		return api.get('/socials').then((res) => res.data);
	},
};
