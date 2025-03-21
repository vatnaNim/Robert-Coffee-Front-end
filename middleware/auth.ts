import { 
  	useAuthStore 
} from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	const tokenExpiration = process.client ? localStorage.getItem('tokenExpiration') : null;
	const currentTime = new Date().getTime();

	if (!authStore.isLoggedIn && to.path !== '/login') {
		return navigateTo('/login');
	}

	if (tokenExpiration && currentTime > Number(tokenExpiration)) {
		try {
			const axios = useNuxtApp().$axios;
			const response = await (axios as any).post('/refresh-token');
			const newToken = response.data.token;
			const expiresIn = response.data.expires_in;

			authStore.setToken(newToken, expiresIn);
			(axios as any).defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

			localStorage.setItem('tokenExpiration', (currentTime + expiresIn * 1000).toString());

		} catch (error) {
			console.error('Token refresh failed:', error);
			authStore.logoutAuth(); 
			return navigateTo('/login');  
		}
	}
});
