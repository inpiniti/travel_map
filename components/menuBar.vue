<script setup lang="ts">
const filter = useFilter();

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
          '카페',
          '호텔',
          '쇼핑',
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
  <div class="flex gap-2">
    <SpotWriting />
    <Button
      variant="secondary"
      @click="
        filter.selectedTile == 'openStreetMap'
          ? (filter.selectedTile = 'cartoDb')
          : (filter.selectedTile = 'openStreetMap')
      "
      >{{ filter.selectedTile }}
    </Button>
  </div>
</template>
