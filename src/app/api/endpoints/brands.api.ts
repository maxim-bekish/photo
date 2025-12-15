import { api } from '../http/axiosInstance';

export const BrandsAPI = {
	getAll() {
		return api.get('/brands').then(res => res.data);
	},

	// create(payload) {
	// 	return api.post('/blogs', payload).then(res => res.data);
	// },

	// delete(id) {
	// 	return api.delete(`/blogs/${id}`).then(res => res.data);
	// },
};
