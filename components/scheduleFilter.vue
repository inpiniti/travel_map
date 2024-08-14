<script setup lang="ts">
const changeCategory = () => {
  useSpot().getSpots();
};
</script>
<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-2">
      <template v-if="useFilter().value.type == '일정'">
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day - 1"
        >
          <
        </Button>
        <div class="whitespace-nowrap">{{ useFilter().value.day }}일차</div>
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day + 1"
        >
          >
        </Button>
      </template>
      <template v-else>
        <Select
          v-model="useFilter().value.category"
          @update:model-value="changeCategory"
        >
          <SelectTrigger>
            <SelectValue placeholder="select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>카테고리</SelectLabel>
              <SelectItem
                :value="item"
                v-for="item in [
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
              >
                {{ item }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </template>
    </div>
    <Tabs v-model="useFilter().value.type">
      <TabsList>
        <TabsTrigger value="일정"> 일정 </TabsTrigger>
        <TabsTrigger value="장소"> 장소 </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
