<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {Network, Alchemy} from 'alchemy-sdk';
import {ref} from "vue";
import BlockComponent from "@/components/BlockComponent.vue";

const latestBlock = ref();
const latestBlocksTransaction = ref([]);

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: import.meta.env.VITE_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

async function loadCurrentBlock() {
  latestBlock.value = await alchemy.core.getBlockNumber()
  for (let i = latestBlock.value - 5; i <= latestBlock.value; i++) {
    const transactions = await alchemy.core.getBlockWithTransactions(i)
    latestBlocksTransaction.value.push(transactions)
  }
  console.log(latestBlocksTransaction.value)
}

loadCurrentBlock()
</script>

<template>
  <div class="flex justify-center bg-gray-100 min-h-screen">
    <div class="max-w-5xl" style="min-width: 1400px">
      <h1 class="text-2xl font-bold my-4">Vue Js BlockExplorer</h1>
      <div class="flex gap-7 min-w-full">
        <div class="w-1/2 border rounded p-5  bg-white">
          <h2  class="text-xl font-bold mb-4">Latest Blocks</h2>
          <div class="mb-4" v-for="block in latestBlocksTransaction" :key="block.number">
            <block-component :block="block"/>
          </div>
        </div>
        <div class="w-1/2 border rounded p-5  bg-white">
          <h2  class="text-xl font-bold mb-4">Latest Transactions</h2>
        </div>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <RouterView/>
    </div>
  </div>
</template>
