<template>
  <div class="flex gap-2 items-center">
    <div class="px-2 font-bold text-lg">{{ useFilter().value.city }}</div>
    <div>
      <Button
        v-for="category in [
          '명소',
          '음식점',
          '호텔',
          '즐길 거리',
          '박물관',
          '대중교통',
          '약국',
          'ATM',
        ]"
        :variant="useFilter().value.category == category ? 'default' : 'ghost'"
        @click="useFilter().value.category = category"
      >
        {{ category }}
      </Button>
    </div>
  </div>
</template>
