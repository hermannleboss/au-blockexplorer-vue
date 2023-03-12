<script setup>
import {onMounted, ref} from "vue";
import {fromNow} from "@/utils/date";

const props = defineProps(["transaction", "timestamp"])
const formattedTimeDiff = ref(0)

function loadDate() {
  formattedTimeDiff.value = fromNow(props.timestamp)
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
    <div class="w-1/3 flex gap-2">
      <div class="w-[50px]"><img src="https://placehold.co/400" alt="Place Holder" class="w-100"></div>
      <div>
        {{ shortAddress(transaction.hash) }}
        <br> {{ formattedTimeDiff }}
      </div>
    </div>
    <div class="w-1/3">From {{ shortAddress(transaction.from) }}
      <br> To {{ shortAddress(transaction.to) }}
    </div>
    <div class="w-1/3">Amount {{ parseFloat(transaction.value._hex / 1000000000) }} eth</div>
  </div>
</template>