import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: '',
        isLoggedIn: false,
        tokenExpiration: 0,
        username: '', 
        userImage: "",
        role: ''
    }),

    actions: {
        login(token: string, expiresIn: number, name: string, role: string, image: string) {
            this.authToken = token;
            this.isLoggedIn = true;
            this.tokenExpiration = Date.now() + expiresIn * 1000; 
            this.username = name; 
            this.role = role;
            this.userImage = image;

            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', this.tokenExpiration.toString());
            localStorage.setItem('username', name);
            localStorage.setItem('role', role);
            localStorage.setItem('userImage', image);
        },

        setToken(token: string, expiresIn: number) {
            this.authToken = token;
            this.isLoggedIn = true;
            this.tokenExpiration = Date.now() + expiresIn * 1000; 
            this.username = ''; 
            this.role = '';
            this.userImage = ''; 

            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', this.tokenExpiration.toString());
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('userImage');
        },

        logoutAuth() {
            this.authToken = '';
            this.isLoggedIn = false;
            this.tokenExpiration = 0;
            this.username = '';
            this.role = '';
            this.userImage = '';

            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('userImage');
        },
    },
});
