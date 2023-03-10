<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>Vue Js BlockExplorer</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>
