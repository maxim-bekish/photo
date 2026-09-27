import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/app/api/http/axiosInstance';
import { ContactRequest } from '@/src/shared/types';

export const useSendContactRequest = () => {
	return useMutation({
		mutationFn: (payload: ContactRequest) => api.post('/contact', payload),
	});
};
