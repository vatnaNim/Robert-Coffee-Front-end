<template>
    <div>
        <div 
            class="flex items-center justify-between mb-4">
            <h1
                class="text-lg font-semibold text-orange-500 dark:text-orange-500 uppercase">
                All user account
            </h1>
            <UButton
                label="Create New account"
                size="sm"
                variant="soft"
                color="amber"
            />
        </div>
        <div 
            class="">
            <UTable
                :columns="columns"
                :rows="people"
                :ui="{ divide: 'divide-orange-400', th: { base: 'text-orange-400' } }">
                <template #action-data="{ row }">
                    <div
                        class="flex items-center gap-2">
                        <LazyUButton
                            type="button"
                            color="yellow"
                            variant="link"
                            size="sm"
                            icon="material-symbols:edit-square-outline"
                            :padded="false"
                            square
                        />
                        <LazyUButton
                            type="button"
                            color="red"
                            variant="link"
                            size="sm"
                            icon="material-symbols:delete-outline-rounded"
                            :padded="false"
                            square
                            
                        />
                    </div>
                </template>
            </UTable>

        </div>
    </div>
</template>

<script setup lang="ts">
import PrimaryBtn from '../ui/primary-btn.vue';

const columns = [
    {
        key: 'id',
        label: 'ID'
    }, 
    {
        key: 'userName',
        label: 'Username'
    }, 
    {
        key: 'role',
        label: 'role'
    }, 
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'createAt',
        label: 'Created_At'
    },
    {
        key: 'updateAt',
        label: 'Updated_At'
    },
    {
        key: 'action',
        label: 'Action'
    }
]

const people = [
    {
        id: 1,
        userName: 'vatna',
        role: 'admin',
        email: 'lindsay.walton@example.com',
        createAt:'08:50',
        updateAt:'08:50'
    }, 
    {
        id: 2,
        userName: 'holo',
        role: 'stuff',
        email: 'lindsay.walton@example.com',
        createAt:'08:50',
        updateAt:'08:50'
    },
]
</script>

<style scoped>

</style>