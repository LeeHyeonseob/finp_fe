<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트
import { loadIamport } from '@iamport/iamport-vue';

const amount = ref('');

const chargeCoin = async () => {
    try {
        const iamport = await loadIamport('your_iamport_key');
        const response = await iamport.request_pay({
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `merchant_${new Date().getTime()}`,
            name: 'Coin Charge',
            amount: amount.value,
            buyer_email: 'buyer@example.com',
            buyer_name: 'Buyer',
            buyer_tel: '010-1234-5678',
            buyer_addr: 'Seoul, Korea',
            buyer_postcode: '123-456'
        });

        if (response.success) {
            await axios.post('/coins/recharge', {
                userId: response.buyer_id,
                impUid: response.imp_uid
            });
            alert('Coin charge successful');
        } else {
            alert('Coin charge failed');
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <v-container>
        <v-form @submit.prevent="chargeCoin">
            <v-text-field v-model="amount" label="Charge Amount" type="number" required></v-text-field>
            <v-btn type="submit" color="primary">Charge</v-btn>
        </v-form>
    </v-container>
</template>
