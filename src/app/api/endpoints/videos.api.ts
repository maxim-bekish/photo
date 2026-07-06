import { api } from '../http/axiosInstance';

export const VideosAPI = {
	getAll() {
		return api.get('/videos').then((res) => res.data);
	},
};
