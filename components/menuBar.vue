<script setup lang="ts">
const filter = useFilter();

const click = (category: string) => {
  filter.value.category = category;
  filter.value.type = "장소";

  useSpot().getSpots();
};

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
    <div>
      <Button
        class="px-2 py-6"
        v-for="category in [
          '공항',
          '명소',
          '근교명소',
          '음식점',
          '카페',
          '호텔',
          '쇼핑',
          '선술집',
        ]"
        :variant="useFilter().value.category == category ? 'default' : 'ghost'"
        @click="click(category)"
      >
        <div class="flex flex-col">
          <font-awesome :icon="ICON[category]" />
          {{ category }}
        </div>
      </Button>
    </div>
  </div>
</template>
