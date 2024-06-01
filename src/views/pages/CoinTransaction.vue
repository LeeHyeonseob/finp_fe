<template>
    <v-container>
        <v-card>
            <v-card-title>Coin Transactions</v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="transaction in transactions" :key="transaction.id">
                        <v-list-item-content>
                            <v-list-item-title>{{ transaction.amount }} - {{ transaction.transactionType }}</v-list-item-title>
                            <v-list-item-subtitle>{{ transaction.createdAt }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useStore } from 'vuex';

const transactions = ref([]);
const store = useStore();

const fetchTransactions = async () => {
    try {
        const username = localStorage.getItem('username') || '';
        const token = localStorage.getItem('token') || '';

        if (!username) {
            console.error('Username is not available');
            return;
        }

        // Fetch transactions using username
        const response = await axios.get(`/coin-transactions/username/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        transactions.value = response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

onMounted(fetchTransactions);
</script>
