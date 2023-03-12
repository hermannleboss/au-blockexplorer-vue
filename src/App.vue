<script setup>
import {RouterLink, RouterView} from 'vue-router'

</script>

<template>
  <div class="flex justify-center bg-gray-100 min-h-screen">
    <div class="max-w-7xl w-full px-5 min-h-full flex flex-col justify-between">
      <div>
        <div class="flex justify-between">
          <p class="text-2xl font-bold my-4">Vue Js BlockExplorer</p>
          <nav class="flex  items-center gap-5 ">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
        <RouterView/>
      </div>
      <div class="flex justify-between">
        <p class="text-2xl font-bold my-4">Vue Js BlockExplorer</p>
        <div class="flex  items-center gap-5 ">
          Author <RouterLink to="https://www.hermanneho.com/" class="text-blue-700 hover:text-blue-300">Hermann EHO</RouterLink>
        </div>
        <nav class="flex  items-center gap-5 ">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>
