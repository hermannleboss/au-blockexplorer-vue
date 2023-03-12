<script setup>

import {ref} from "vue";
import BlockComponent from "@/components/BlockComponent.vue";
import {alchemy} from "@/utils/alchemy";

const latestBlock = ref();
const latestBlocksTransaction = ref([]);

async function loadCurrentBlock() {
  latestBlock.value = await alchemy.core.getBlockNumber()
  for (let i = latestBlock.value - 5; i <= latestBlock.value; i++) {
    const transactions = await alchemy.core.getBlockWithTransactions(i)
    latestBlocksTransaction.value.push(transactions)
  }
}

loadCurrentBlock()
</script>

<template>
  <div class="flex gap-7 min-w-full">
    <div class="w-1/2 border rounded p-5  bg-white">
      <h2 class="text-xl font-bold mb-4">Latest Blocks</h2>
      <div class="mb-4" v-for="block in latestBlocksTransaction" :key="block.number">
        <block-component :block="block"/>
      </div>
    </div>
    <div class="w-1/2 border rounded p-5  bg-white">
      <h2 class="text-xl font-bold mb-4">Latest Transactions</h2>
    </div>
  </div>
</template>
