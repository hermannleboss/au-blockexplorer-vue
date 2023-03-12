<script setup>
import {onMounted, ref} from "vue";
import {fromNow} from "@/utils/date";

const props = defineProps(["block"])
const formattedTimeDiff = ref(0)

function loadDate() {
  formattedTimeDiff.value = fromNow(props.block.timestamp)
}

loadDate()
onMounted(() => {

  setInterval(() => {
    loadDate()
  }, 30000)
})

const shortAddress = (address) => {
  return address.substring(0, 5) + '...' + address.substring(address.length - 5, address.length)
}

</script>

<template>
  <div class="flex justify-between">
    <div class="flex gap-2">
      <div class="w-[50px]"><img src="https://placehold.co/400" alt="Place Holder" class="w-100"></div>
      <div>
        <RouterLink :to="'/blocks/'+ block.number" class="text-blue-700 hover:text-blue-300">{{ block.number }}
        </RouterLink>
        <br> {{ formattedTimeDiff }}
      </div>
    </div>
    <div>Fee Recipient {{ shortAddress(block.miner) }}</div>
    <div>Block Reward {{ parseFloat(block.gasUsed._hex / 1000000000) }} eth</div>
  </div>
</template>