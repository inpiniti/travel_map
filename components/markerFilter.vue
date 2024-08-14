<script setup lang="ts">
const click = (category: string) => {
  useFilter().value.category = category;
  useSpot().getSpots();
};
</script>
<template>
  <div class="flex items-center gap-2">
    <div class="px-2 text-lg font-bold">{{ useFilter().value.city }}</div>
    <div>
      <Button
        v-for="category in [
          '공항',
          '명소',
          '근교명소',
          '음식점',
          '호텔',
          '즐길 거리',
          '박물관',
          '대중교통',
          '약국',
          'ATM',
        ]"
        :variant="useFilter().value.category == category ? 'default' : 'ghost'"
        @click="click(category)"
      >
        {{ category }}
      </Button>
    </div>
  </div>
</template>
