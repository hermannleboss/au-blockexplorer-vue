<script setup>
import {useRoute} from "vue-router";
import {alchemy} from "@/utils/alchemy";
import {onMounted, ref} from "vue";
import {fromNow} from "@/utils/date";

const route = useRoute()
const block = ref();
const formattedTimeDiff = ref(0)

function loadDate() {
  formattedTimeDiff.value = fromNow(block.value.timestamp)
}

async function loadCurrentBlock() {
  console.log(route.params.id)
  block.value = await alchemy.core.getBlockWithTransactions(parseInt(route.params.id))
  if (block.value) {
    loadDate()
  }
}

onMounted(() => {

  setInterval(() => {
    if (block.value) {
      loadDate()
    }
  }, 30000)
})

loadCurrentBlock()
</script>
<template>
  <div class="flex flex-col gap-7 min-w-full">
    <h1>Block # {{ route.params.id }}</h1>
    <div>
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
    </div>
  </div>
</template>