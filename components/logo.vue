<script setup lang="ts">
const filter = useFilter();
const { isMobile } = useDevice();
const { selectedTravelPlan } = useTravelPlan();

const goBack = () => {
  filter.value.viewOnMobile = "plan";
};
</script>
<template>
  <div
    v-if="isMobile && filter.viewOnMobile != 'plan' && filter.type == '일정'"
    @click="goBack"
    class="flex items-center gap-1 font-bold"
  >
    <font-awesome class="px-2" icon="chevron-left" />
    {{ selectedTravelPlan?.plan_name }}
  </div>
  <div
    v-else-if="
      isMobile && filter.viewOnMobile != 'plan' && filter.type == '장소'
    "
    @click="filter.type = '일정'"
    class="flex items-center gap-1 font-bold"
  >
    <font-awesome class="px-2" icon="chevron-left" />
    일정 등록하기
  </div>
  <div
    class="flex items-center gap-1 font-bold"
    @click="filter.viewOnMobile = 'plan'"
    v-else
  >
    <font-awesome class="px-2" icon="map" bounce />
    여행지도
  </div>
  <Tabs
    v-if="filter.viewOnMobile != 'plan'"
    class="md:hidden"
    v-model="filter.viewOnMobile"
  >
    <TabsList>
      <TabsTrigger value="schedule">
        <font-awesome icon="calendar" />
      </TabsTrigger>
      <TabsTrigger value="map">
        <font-awesome icon="map" />
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
