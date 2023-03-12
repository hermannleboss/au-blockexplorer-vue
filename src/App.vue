<script setup>
import {RouterLink, RouterView} from 'vue-router'

</script>

<template>
  <div class="flex justify-center bg-gray-100 min-h-screen">
    <div class="max-w-7xl w-full px-5">
      <div class="flex justify-between">

        <h1 class="text-2xl font-bold my-4">Vue Js BlockExplorer</h1>
        <nav class="flex  items-center gap-5 ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <RouterView/>
    </div>
  </div>
</template>
