import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: '',
        isLoggedIn: false,
        tokenExpiration: 0,
        username: '', 
        userImage: "",
        role: '',
        email: '',
        gender: '',
        phoneNumber: '',
        userId: '',
        acc_status: '',
        created_at: '',
        updated_at: ''
    }),

    actions: {
        login(
                token: string,
                expiresIn: number, 
                name: string, 
                role: string, 
                email: string, 
                image: string,
                gender: string,
                userId: string,
                phoneNumber: string,
                acc_status: string,
                created_at: string,
                updated_at: string
            ){
            this.authToken = token;
            this.isLoggedIn = true;
            this.tokenExpiration = Date.now() + expiresIn * 1000; 
            this.username = name; 
            this.role = role;
            this.email = email;
            this.userImage = image;
            this.gender = gender;
            this.userId = userId;
            this.phoneNumber = phoneNumber;
            this.acc_status = acc_status;
            this.created_at = created_at;
            this.updated_at = updated_at;

            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', this.tokenExpiration.toString());
            localStorage.setItem('username', name);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
            localStorage.setItem('userImage', image);
            localStorage.setItem('gender', gender);
            localStorage.setItem('userId', userId);
            localStorage.setItem('phoneNumber', phoneNumber);
            localStorage.setItem('acc_status', acc_status);
            localStorage.setItem('created_at', created_at);
            localStorage.setItem('updated_at', updated_at);
        },

        setToken(token: string, expiresIn: number) {
            this.authToken = token;
            this.isLoggedIn = true;
            this.tokenExpiration = Date.now() + expiresIn * 1000; 
            this.username = ''; 
            this.role = '';
            this.email = '';
            this.userImage = ''; 
            this.gender = '';
            this.userId = '';
            this.phoneNumber = '';
            this.acc_status = '';
            this.created_at = '';
            this.updated_at = '';

            localStorage.setItem('authToken', token);
            localStorage.setItem('tokenExpiration', this.tokenExpiration.toString());
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('userImage');
            localStorage.removeItem('gender');
            localStorage.removeItem('userId');
            localStorage.removeItem('phoneNumber');
            localStorage.removeItem('acc_status');
            localStorage.removeItem('created_at');
            localStorage.removeItem('updated_at');
        },

        logoutAuth() {
            this.authToken = '';
            this.isLoggedIn = false;
            this.tokenExpiration = 0;
            this.username = '';
            this.role = '';
            this.email = '';
            this.userImage = '';
            this.gender = '';
            this.userId = '';
            this.phoneNumber = '';
            this.acc_status = '';
            this.created_at = '';
            this.updated_at = '';

            localStorage.removeItem('authToken');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('userImage');
            localStorage.removeItem('gender');
            localStorage.removeItem('userId');
            localStorage.removeItem('phoneNumber');
            localStorage.removeItem('acc_status');
            localStorage.removeItem('created_at');
            localStorage.removeItem('updated_at');
        },
    },
});
