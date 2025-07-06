<template>
    <div 
        class="w-full h-[100vh] flex justify-center items-center relative">
        <form   
            @submit.prevent="loginAcc"
            class="flex flex-col gap-2.5 bg-white p-10 rounded-2xl transition-all duration-400 ease-in-out shadow-md hover:-translate-x-2 hover:-translate-y-2 hover:border hover:border-gray-900 hover:shadow-[10px_10px_0px_#666666]">
            <p 
                class="text-black pb-8 text-center font-bold">
                Login 
            </p>
            <input
                class="rounded-md border border-gray-200 bg-gray-200 outline-none p-2 transition-all duration-400 ease-in-out hover:shadow-[6px_6px_0px_#969696,-3px_-3px_10px_#ffffff] focus:bg-white focus:shadow-inner focus:shadow-gray-500 text-black"
                placeholder="Username"
                type="text"
                v-model="login" 
            />
            <div class="relative">
                <input
                    class="w-full rounded-md border border-gray-200 bg-gray-200 outline-none p-2 pr-10 transition-all duration-400 ease-in-out hover:shadow-[6px_6px_0px_#969696,-3px_-3px_10px_#ffffff] focus:bg-white focus:shadow-inner focus:shadow-gray-500 text-black"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    v-model="password"
                />
                <button 
                    type="button"
                    class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    @click="showPassword = !showPassword">
                    <UIcon
                        name="clarity:eye-show-line"
                        class="w-5 h-5"
                        v-if="showPassword"
                    />
                    <UIcon
                        name="fluent:eye-hide-20-regular"
                        class="w-5 h-5"
                        v-else
                    />
                </button>
            </div>
            <button
                type="submit"
                class="mt-8 self-center px-4 py-3 rounded-lg border-none text-black transition-all duration-400 ease-in-out shadow-md hover:shadow-[6px_6px_0px_#969696,-3px_-3px_10px_#ffffff] hover:-translate-x-2 hover:-translate-y-2 active:transition-all active:duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none">
                Submit
            </button>
        </form>
        <div 
            v-if="showNotification" 
            class="absolute top-5 right-5 w-64 bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-200">
            <div 
                class="flex justify-between items-center">
            <p 
                class="text-sm text-gray-600 font-semibold">{{ errorMessage }}</p>
                <UButton
                    icon="carbon:close"
                    color="red"
                    variant="link"
                    @click="closeNotification"
                    class="font-bold"
                />
            </div>
        </div>
    </div>  
</template>

<script lang="ts" setup>
import { 
    useAuthStore 
} from '@/stores/auth';
import { 
    Alert 
} from '@/utils/dialog';

definePageMeta({
	colorMode: 'light',
	layout: 'login',
});
  
useSeoMeta({
	title: 'Login'
});

const authStore = useAuthStore();
const login: Ref<string> = ref<string>('');
const password: Ref<string> = ref<string>('');
const errorMessage: Ref<string> = ref<string>('');
const router = useRouter();
const showPassword: Ref<boolean> = ref<boolean>(false);
const showNotification: Ref<boolean> = ref<boolean>(false); 

const closeNotification = (): void => {
  showNotification.value = false;
};


const loginAcc = async (): Promise<void> => {
  try {
    const response = await fetch(`${useRuntimeConfig().public.NUXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    Alert(data.message || "Login successful!!!", () => {
        authStore.login(
            data.token, 
            data.expiresIn, 
            login.value, 
            data.user.role, 
            data.user.email,
            data.user.image, 
            data.user.gender,
            data.user.userId,
            data.user.phoneNumber,
            data.user.acc_status,
            data.user.user_status,
            data.user.created_at,
        );
        router.push('/');
    });

    } catch (error) {
        errorMessage.value = (error as Error).message || 'Login failed';
        showNotification.value = true; 
        setTimeout(() => {
        showNotification.value = false;
        }, 5000);
    }
};

</script>
