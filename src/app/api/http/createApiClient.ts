// src/app/api/http/createApiClient.ts
import { api } from './axiosInstance';

export function createApiClient<T>(resource: string) {
	return {
		getAll(): Promise<T[]> {
			return api.get(`/${resource}`).then((res) => res.data);
		},
		getById(id: string): Promise<T> {
			return api.get(`/${resource}/${id}`).then((res) => res.data);
		},
		create(payload: Partial<T>): Promise<T> {
			return api.post(`/${resource}`, payload).then((res) => res.data);
		},
		update(id: string, payload: Partial<T>): Promise<T> {
			return api.put(`/${resource}/${id}`, payload).then((res) => res.data);
		},
		delete(id: string): Promise<void> {
			return api.delete(`/${resource}/${id}`).then(() => undefined);
		},
	};
}
