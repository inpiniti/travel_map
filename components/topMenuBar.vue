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
    v-if="isMobile && filter.viewOnMobile != 'plan'"
    @click="goBack"
    class="font-bold"
  >
    <font-awesome class="px-2" icon="chevron-left" />
    {{ selectedTravelPlan?.plan_name }}
  </div>
  <div class="flex items-center gap-1 text-xl font-bold" v-else>
    <font-awesome icon="map" bounce />
    <h1>여행지도</h1>
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
