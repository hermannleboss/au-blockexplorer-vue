<script setup>
import {onMounted, ref} from "vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime); // Load the relativeTime plugin
dayjs.extend(duration)
console.log(props.block)
const props = defineProps(["block"])
const formattedTimeDiff = ref(0)

function loadDate() {

  const date1 = new Date(props.block.timestamp * 1000); // Create a Date object from the timestamp
  const date2 = new Date(Date.now()); // Get the current date

  const diff = dayjs(date2).diff(date1, 'second');  // Get the difference in days
// Convert the difference to a human-readable string
  formattedTimeDiff.value = dayjs.duration(diff, 'second').humanize()
}

loadDate()
onMounted(() => {

  setInterval(() => {
    loadDate()
  }, 30000)
})

const shortAddress = (address) => {
  return address.substring(0,5) +'...' +address.substring(address.length-5,address.length)
}

</script>

<template>
  <div class="flex justify-between">
    <div class="flex gap-2">
      <div class="block--header--img"><img src="https://placehold.co/400" alt="Place Holder" class="w-100"></div>
      <div>{{ block.number }} <br> {{ formattedTimeDiff }}</div>
    </div>
    <div>Fee Recipient {{ shortAddress(block.miner) }}</div>
    <div>Block Reward {{parseFloat(block.gasUsed._hex/1000000000)}} eth</div>
  </div>
</template>

<style scoped lang="scss">
.block {
  display: flex;
  justify-content: space-between;

  &--header {
    display: flex;

    &--img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>