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

const transactions = ref([]);

const fetchTransactions = async () => {
    try {
        const response = await axios.get('/api/coin-transactions/user/1'); // Assume user ID is 1
        transactions.value = response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

onMounted(fetchTransactions);
</script>
