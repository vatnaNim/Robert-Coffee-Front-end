import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    axios.defaults.baseURL = config.public.apiUrl as string;
    const token = process.client ? localStorage.getItem('authToken') : null;

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    axios.interceptors.response.use(
        response => response, 
        async (error) => {
            if (error.response?.status === 401) {  
                try {
                    const refreshResponse = await axios.post('/refresh-token');
                    const newToken = refreshResponse.data.token;
                    const expiresIn = refreshResponse.data.expires_in;

                    authStore.setToken(newToken, expiresIn);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    error.config.headers['Authorization'] = `Bearer ${newToken}`;

                    return axios(error.config);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    authStore.logoutAuth(); 
                    const router = useRouter();
                    return router.push('/login');  
                }
            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axios);
});
