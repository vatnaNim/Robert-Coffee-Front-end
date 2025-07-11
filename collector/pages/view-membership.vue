<template>
    <div
        class="w-full border border-grey-300 dark:border-grey-600 bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8">
        <article 
            class="flex justify-between items-center">
            <div 
                class="flex gap-x-3 items-center">
                <BackBtn
                    name="Back"
                    btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                    icon-class="bg-white"
                    icon-container="bg-red-600"
                    @click="emits('toggle', false)"
                />
                <h1 
                    class="text-orange-500 text-lg px-4 font-semibold tracking-wide">
                    View Membership
                </h1>
            </div>
            <div 
                class="flex gap-x-1">
                <UTooltip text="Print">
                <lazy-u-button
                    size="md"
                    variant="soft"
                    color="primary"
                    icon="mdi-light:printer"
                    :ui="{
                    icon: {
                        base: 'text-orange-500 dark:text-orange-500'
                    }
                    }"
                    @click="print"
                />
                </UTooltip>
                <UTooltip text="Download as PDF">
                <lazy-u-button
                    size="md"
                    variant="soft"
                    color="red"
                    icon="mdi:file-pdf-outline"
                    :ui="{
                        icon: {
                            base: 'text-orange-500 dark:text-orange-500'
                        }
                    }"
                    @click="downloadPDF"
                    target="_blank"
                />
                </UTooltip>
            </div>
        </article>
        <article
            id="print-area"
            class="w-full px-8 py-8 mx-auto bg-white text-black rounded-lg shadow-lg p-8 space-y-6 border border-gray-200 print:border-none print:shadow-none print:p-0">
            <h2
                class="text-center uppercase underline underline-offset-2 font-semibold text-lg tracking-wide">
                Membership Information ID:
                <span class="font-bold text-orange-500">{{ membership?.customer_id }}</span>
            </h2>

            <div
                class="flex justify-between items-start gap-6 border-b border-orange-500 py-4 mb-4">
                <div class="space-y-2 text-sm">
                    <div>
                        <span class="text-orange-500 font-medium">First Name:</span>
                        <span class="ml-1 font-semibold capitalize">{{ membership?.frist_name }}</span>
                    </div>
                    <div>
                        <span class="text-orange-500 font-medium">Last Name:</span>
                        <span class="ml-1 font-semibold capitalize">{{ membership?.last_name }}</span>
                    </div>
                    <div>
                        <span class="text-orange-500 font-medium">Gender:</span>
                        <span class="ml-1 font-semibold capitalize">{{ membership?.gender }}</span>
                    </div>
                    <div>
                        <span class="text-orange-500 font-medium">Birthdate:</span>
                        <span class="ml-1 font-semibold capitalize">{{ membership?.birthdate }}</span>
                    </div>
                </div>

                <img
                    :src="String(membership?.image)"
                    alt="Profile"
                    class="w-32 h-32 object-cover rounded-lg border-2 border-orange-400 shadow"
                />
            </div>
            <div 
                class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="text-orange-500 font-medium">Email:</span>
                    <span class="ml-1 underline text-blue-500">{{ membership?.email }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Membership ID:</span>
                    <span class="ml-1 font-semibold">{{ membership?.customer_id }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">National ID:</span>
                    <span class="ml-1 font-semibold">{{ membership?.national_id }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Address:</span>
                    <span class="ml-1 font-semibold">{{ membership?.address }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Phone Number:</span>
                    <span class="ml-1 font-semibold">{{ membership?.phoneNumber }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Card Amount:</span>
                    <span class="ml-1 font-semibold">$ {{ membership?.membership_amount }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Points:</span>
                    <span class="ml-1 font-semibold">{{ membership?.points }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Status:</span>
                    <span 
                        class="ml-1 font-semibold uppercase"
                        :class="{
                            'text-green-600': membership?.status === 'active',
                            'text-yellow-500': membership?.status === 'pending',
                            'text-red-600': membership?.status === 'banned'
                        }">
                        {{ membership?.status }}
                        </span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Created At:</span>
                    <span class="ml-1 font-semibold">{{ membership?.created_at }}</span>
                    </div>
                    <div>
                    <span class="text-orange-500 font-medium">Updated At:</span>
                    <span class="ml-1 font-semibold">{{ membership?.updated_at }}</span>
                    </div>
                    <div class="col-span-2">
                    <span class="text-orange-500 font-medium">Remark:</span>
                    <span class="ml-1 font-semibold">{{ membership?.remark }}</span>
                </div>
            </div>
        </article>
  </div>
</template>

<script setup lang="ts">
import { 
    BackBtn 
} from '@/components/ui';
import { 
    usePrintAsPDF 
} from '@/composables/useDownLoadAsPDF';
import { 
    usePrinting 
} from '@/composables/usePrinting';
import type { Items, ResponseStatus } from '@/models/type';


const {
    fetchApi
}= useAPI();
const props = withDefaults(
    defineProps<{
        memberId: number | null;
    }>(),
    {
        memberId: null,
    }
);

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const membershipDb: Ref<Items[]> = ref<Items[]>([]);
const membership = computed(() => membershipDb.value[0] || null)

const fetchMembership = async (): Promise<void> => {
    if (!props.memberId) return;
    const result = await fetchApi('GET', `membership/${props.memberId}`) as ResponseStatus;
    if (!result.error && result.data) {
        membershipDb.value = [result.data as Items];
    } else {
        membershipDb.value = [];
    }
};


const downloadPDF = (): void => {
    usePrintAsPDF('print-area', `membership-info.pdf`)
}

const print = (): void => {
    usePrinting('print-area')
}

onMounted(async (): Promise<void> => {
    await fetchMembership();
})

</script>

<style scoped>
    @media print {
        .no-print {
            display: none !important;
        }
    }
</style>
