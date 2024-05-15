<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4" v-for="pkg in coinPackages" :key="pkg.id">
                <v-card class="mb-4">
                    <v-card-title>{{ pkg.coins }}코인</v-card-title>
                    <v-card-subtitle class="red--text">
                        + {{ pkg.bonus }}당근 + {{ pkg.extra }}코인
                        <span class="grey--text"> (유효기간 구매 후 15일)</span>
                    </v-card-subtitle>
                    <v-card-text>
                        <div class="text-h5">{{ pkg.price }}원</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="purchasePackage(pkg)">구매하기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const coinPackages = ref([
    { id: 1, coins: 39, bonus: 5, extra: 2, price: '9,900' },
    { id: 2, coins: 82, bonus: 13, extra: 5, price: '20,900' },
    { id: 3, coins: 195, bonus: 39, extra: 12, price: '49,900' },
    { id: 4, coins: 387, bonus: 90, extra: 24, price: '99,000' }
]);

function purchasePackage(selectedPackage) {
    console.log('Purchasing package:', selectedPackage);
    // API call to handle the purchase can be added here
}
</script>

<style scoped>
.text-h5 {
    font-size: 1.25rem;
    font-weight: 500;
}
</style>
