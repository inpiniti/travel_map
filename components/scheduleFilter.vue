<script setup lang="ts">
const { dayNSchedule } = useSchedule();
const filter = useFilter();

const changeCategory = () => {
  useSpot().getSpots();
};

// day 값을 감소시키는 함수입니다.
function decrementDay() {
  if (filter.value.day > 1) {
    // day 값이 1보다 클 때만 감소
    filter.value.day -= 1;
  }
}

// day 값을 증가시키는 함수입니다.
function incrementDay() {
  if (dayNSchedule.value?.travel_spot_ids?.length > 0) {
    // dayNSchedule가 정의되어 있고, travel_spot_ids 배열이 비어있지 않은 경우에만 증가
    filter.value.day += 1;
  }
}
</script>
<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-2">
      <template v-if="useFilter().value.type == '일정'">
        <Button variant="secondary" @click="decrementDay"> < </Button>
        <div class="whitespace-nowrap">{{ useFilter().value.day }}일차</div>
        <Button variant="secondary" @click="incrementDay"> > </Button>
      </template>
      <template v-else>
        <CategorySelect />
      </template>
    </div>
    <div class="flex gap-2">
      <Button
        v-if="useFilter().value.type == '일정'"
        class="px-2"
        :variant="filter.isDraggable ? 'default' : 'outline'"
        @click="filter.isDraggable = !filter.isDraggable"
      >
        순서 변경
      </Button>
      <Tabs v-else v-model="useFilter().value.type">
        <TabsList>
          <TabsTrigger value="일정"> 일정 </TabsTrigger>
          <TabsTrigger value="장소"> 장소 </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
</template>
