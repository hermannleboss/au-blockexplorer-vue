<script setup>
import {useRoute} from "vue-router";
import {alchemy} from "@/utils/alchemy";
import {onMounted, ref} from "vue";
import {fromNow} from "@/utils/date";
import LoadingComponent from "@/components/LoadingComponent.vue";

const route = useRoute()
const block = ref();
const formattedTimeDiff = ref(0)
const loading = ref(false)

function loadDate() {
  formattedTimeDiff.value = fromNow(block.value.timestamp)
}

async function loadCurrentBlock() {
  loading.value = true
  block.value = await alchemy.core.getBlockWithTransactions(parseInt(route.params.id))
  if (block.value) {
    loadDate()
  }
  loading.value = false
}

onMounted(() => {

  setInterval(() => {
    if (block.value) {
      loadDate()
    }
  }, 30000)
})

const shortAddress = (address) => {
  return address.substring(0, 5) + '...' + address.substring(address.length - 5, address.length)
}

loadCurrentBlock()
</script>
<template>
  <div class="flex flex-col gap-7 min-w-full">
    <h1>Block # {{ route.params.id }}</h1>
    <div class="border rounded p-5 bg-white">
      <loading-component v-if="loading"/>
      <table v-if="block" class="table-auto border-spacing-2 ">
        <tbody>
        <tr>
          <td class="p-3">Block Heigth:</td>
          <td class="p-3">{{ block.number }}</td>
        </tr>
        <tr>
          <td class="p-3">Status:</td>
          <td class="p-3">{{ block.number }}</td>
        </tr>
        <tr>
          <td class="p-3"> Timestamp:</td>
          <td class="p-3">{{ formattedTimeDiff }} ago</td>
        </tr>
        <!--        <tr>-->
        <!--          <td class="p-3">Proposed On:</td>-->
        <!--          <td class="p-3">{{ block.number }}</td>-->
        <!--        </tr>-->
        <tr>
          <td class="p-3">Transactions:</td>
          <td class="p-3">{{ block.transactions.length }}</td>
        </tr>
        <tr>
          <td class="p-3">Fee Recipient:</td>
          <td class="p-3">{{ block.miner }}</td>
        </tr>
        </tbody>
      </table>
      <div v-if="!block && !loading" class="text-red-500">
        Unable to find the block #{{ route.params.id }}
      </div>
    </div>
    <div class="border rounded p-5 mb-5 bg-white" v-if="block && block.transactions && block.transactions.length>0">
      <h2 class="text-xl font-bold my-4">Transactions</h2>
      <table v-if="block" class="table-auto border-spacing-2 ">
        <thead>
        <tr>
          <td class="p-3">Txn Hash</td>
          <td class="p-3">Method</td>
          <td class="p-3">Block</td>
          <td class="p-3">Age</td>
          <td class="p-3">From</td>
          <td class="p-3">To</td>
          <td class="p-3">Value</td>
          <td class="p-3">Txn Fee</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in block.transactions" :key="transaction.hash">
          <td class="p-3">{{ shortAddress(transaction.hash) }}</td>
          <td class="p-3">Methode</td>
          <td class="p-3">{{ block.number }}</td>
          <td class="p-3">{{ formattedTimeDiff }}</td>
          <td class="p-3">{{ shortAddress(transaction.from) }}</td>
          <td class="p-3">{{ shortAddress(transaction.to) }}</td>
          <td class="p-3">{{ parseFloat(transaction.value._hex / 1000000000000) }}</td>
          <td class="p-3">{{ parseFloat(transaction.gasPrice._hex / 1000000000000) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>