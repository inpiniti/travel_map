<script setup lang="ts">
const filter = useFilter();

const handleImageError = (event: any) => {
  event.target.src = `/여행.jpg`;
};
</script>
<template>
  <div class="flex items-center gap-2">
    <img
      :src="`/city/${filter.city}.png`"
      alt="Travel Image"
      class="object-cover h-full rounded-lg w-11 shrink-0"
      @error="handleImageError"
    />
  </div>
</template>
