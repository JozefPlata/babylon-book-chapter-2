<template>
  <div class="babylon-container">
    <canvas id="babylonApp" class="babylon-app"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "#imports";
import {App} from "~/babylon/App";

onMounted(() => {
  new App();
})
</script>

<style scoped>
.babylon-container {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: block;
}

.babylon-app {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: unset;
  border: none !important;
  outline: none !important;
  touch-action: none;
}
</style>
