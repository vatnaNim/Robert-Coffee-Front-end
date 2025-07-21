<template>
    <div 
        class="w-full h-[100vh] flex justify-center items-center relative bg-white dark:bg-gray-900">
        <article
            class="max-w-full w-[900px] flex gap-x-2 rounded-xl shadow-md border border-orange-400 dark:border-orange-500 overflow-hidden">
            <div class="w-[50%]">
                <img 
                    :src="LoginCover" 
                    alt="cover"
                    class="w-full h-full object-fill"    
                />
            </div>
            <form
                name="signin"
                method="post"
                enctype="multipart/form-data"
                @submit.prevent="async ():Promise<void>=> {
                    await loginAcc();
                }"
                class="w-[50%] flex flex-col justify-center items-center">
                <div 
                    class="flex flex-col gap-y-2 justify-center items-center">
                    <img 
                        :src="MainLogo" 
                        alt="logo"
                        class="w-20 h-20 object-fill rounded-full"
                    />
                    <h1
                        class="text-xl font-semibold uppercase dark:text-gray-300 text-gray-600">
                        sign In
                    </h1>
                    <div 
                        class="space-y-2">
                        <LazyUFormGroup
                            name=""
                            label="Username or Email"
                            :ui="{
                                label: {
                                    base: 'text-orange-500 dark:text-orange-500'
                                }
                            }"
                            class="w-[350px]"
                            required>
                            <LazyUInput
                                name=""
                                type="text"
                                size="sm"
                                color="amber"
                                v-model="login"
                                placeholder="Enter Username or Email"
                                required
                            />
                        </LazyUFormGroup>
                        <LazyUFormGroup
                            name=""
                            label="Password"
                            :ui="{
                                label: {
                                    base: 'text-orange-500 dark:text-orange-500'
                                }
                            }"
                            class="w-[350px]"
                            required>
                            <LazyUInput
                                :type="showPassword ? 'text' : 'password'"
                                name="password"
                                size="sm"
                                v-model="password"
                                placeholder="Please Enter Password"
                                :maxLength="10"
                                padded>
                                <template #trailing>
                                    <div 
                                        class="flex items-center gap-x-2">
                                        <span class="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                            {{ password.toString().length }}/{{ 6 }}
                                        </span>
                                        <LazyUButton
                                            variant="link"
                                            color="gray"
                                            @click="togglePassword"
                                            class="p-0 hover:text-orange-500 z-10 relative">
                                            <UIcon
                                                :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                                class="w-5 h-5 pointer-events-auto"
                                            />
                                        </LazyUButton>
                                    </div>
                                </template>
                            </LazyUInput>
                        </LazyUFormGroup>
                    </div>
                    <div 
                        class="w-full pt-2">
                        <LazyUButton
                            type="submit"
                            size="md"  
                            :label="isLoading ? 'Logging in...' : 'Log In'"
                            :loading="isLoading"
                            :disabled="isLoading"
                            variant="solid"
                            color="amber"
                            block
                            :ui="{
                                icon: {
                                    loading: 'line-md:loading-loop'
                                }
                            }"
                        />
                    </div>
                </div>
            </form>
        </article>
        <div 
            class="absolute top-2 right-2">
            <UTooltip 
                :text="darkColor? 'Darkmode' : 'Lightmode'" 
                :popper="{ arrow: true }">
                <LazyUButton
                    variant="link"
                    size="md"
                    color="amber"
                    @click="toggleDarkMode">
                    <LazyUIcon
                        :name="darkColor
                            ? 'material-symbols:light-mode-outline'
                            : 'material-symbols:dark-mode-outline'"
                        class="w-6 h-6"
                    />
                </LazyUButton>
            </UTooltip>
            <UTooltip 
                :text="isFullscreen ? 'ExitScreen' : 'FullScreen'" 
                :popper="{ arrow: true }">
                <LazyUButton
                    variant="link"
                    size="md"
                    color="amber"
                    @click="toggleFullscreen">
                    <LazyUIcon
                        :name="isFullscreen ? 'ant-design:fullscreen-exit-outlined' : 'gridicons:fullscreen'"
                        class="w-6 h-6"
                    />
                </LazyUButton>
            </UTooltip>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { 
    LoginCover,
    MainLogo
} from '@/assets/images';
import { 
    useAuthStore 
} from '@/stores/auth';
import { 
    Alert 
} from '@/utils/dialog';
import type { 
    Router 
} from 'vue-router';
import { 
    useDarkMode 
} from '@/composables/useDarkMode';
import { 
    useFullscreen 
} from '@/composables/useFullScreen';

definePageMeta({
	colorMode: 'light',
	layout: 'login',
});
  
useSeoMeta({
	title: 'Login'
});

const authStore = useAuthStore();
const { isFullscreen, toggleFullscreen } = useFullscreen();
const { darkColor, toggle: toggleDarkMode } = useDarkMode();

const login: Ref<string> = ref<string>('');
const password: Ref<string> = ref<string>('');
const router: Router = useRouter();
const showPassword: Ref<boolean> = ref<boolean>(false);
const showNotification: Ref<boolean> = ref<boolean>(false); 
const isLoading: Ref<boolean> = ref<boolean>(false);


const togglePassword = () => {
    showPassword.value = !showPassword.value
};

const loginAcc = async (): Promise<void> => {
    isLoading.value = true;
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
        Alert((error as Error).message || 'Login failed', () => {}, 'error');
        setTimeout(() => {
        showNotification.value = false;
        }, 3000);
    } finally {
        isLoading.value = false;
    }
};

</script>
