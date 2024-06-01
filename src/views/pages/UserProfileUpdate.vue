<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Update Profile</h1>
                <v-form @submit.prevent="updateProfile">
                    <v-text-field
                        v-model="profile.username"
                        label="Username"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="profile.email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="profile.password"
                        label="Password"
                        type="password"
                    ></v-text-field>
                    <v-btn type="submit" color="primary">Update</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface UserProfile {
    username: string;
    email: string;
    password?: string;
}

const profile = ref<UserProfile>({
    username: '',
    email: '',
    password: ''
});

const store = useStore();
const router = useRouter();

const fetchUserProfile = async () => {
    try {
        const token = store.state.token;
        const response = await axios.get('/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        profile.value = response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

const updateProfile = async () => {
    try {
        const token = store.state.token;
        await axios.put(`/users/${store.state.userId}`, profile.value, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert('Profile updated successfully');
        router.push({ name: 'UserProfile' });
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
    }
};

onMounted(fetchUserProfile);
</script>

<style scoped>
.v-container {
    max-width: 600px;
    margin: 0 auto;
}
.v-form {
    margin-top: 20px;
}
.v-btn {
    margin-top: 20px;
}
</style>
