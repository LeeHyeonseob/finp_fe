<template>
    <v-container>
        <v-form @submit.prevent="chargeCoin">
            <v-radio-group v-model="selectedAmount" label="충전 금액" required>
                <v-radio label="1000원 - 1000코인" :value="1000"></v-radio>
                <v-radio label="5000원 - 5000코인" :value="5000"></v-radio>
                <v-radio label="10000원 - 10000코인" :value="10000"></v-radio>
                <v-radio label="20000원 - 20000코인" :value="20000"></v-radio>
                <v-radio label="50000원 - 50000코인" :value="50000"></v-radio>
            </v-radio-group>
            <v-btn type="submit" color="primary">충전하기</v-btn>
        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/axios'; // axios 인스턴스 임포트

// Iamport 스크립트 로드 함수
const loadIamport = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Iamport 스크립트 로드 실패'));
        document.head.appendChild(script);
    });
};

const selectedAmount = ref<number | null>(null);

const chargeCoin = async () => {
    try {
        if (selectedAmount.value === null) {
            alert('충전 금액을 선택해주세요.');
            return;
        }

        await loadIamport();

        const { IMP } = window as any;
        IMP.init('your_iamport_key'); // 본인의 Iamport 키로 변경

        const response: any = await new Promise((resolve, reject) => {
            IMP.request_pay(
                {
                    pg: 'html5_inicis',
                    pay_method: 'card',
                    merchant_uid: `merchant_${new Date().getTime()}`,
                    name: '코인 충전',
                    amount: selectedAmount.value,
                    buyer_email: 'buyer@example.com',
                    buyer_name: '구매자',
                    buyer_tel: '010-1234-5678',
                    buyer_addr: '서울특별시',
                    buyer_postcode: '123-456'
                },
                (rsp: any) => {
                    if (rsp.success) {
                        resolve(rsp);
                    } else {
                        reject(rsp.error_msg);
                    }
                }
            );
        });

        await axios.post('/api/coins/recharge', {
            userId: response.buyer_id,
            impUid: response.imp_uid,
            amount: selectedAmount.value
        });

        alert('코인 충전 성공');
    } catch (error) {
        alert(`코인 충전 실패: ${error}`);
        console.error(error);
    }
};
</script>






