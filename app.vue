<script setup lang="ts">
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { travelPlans, getTravelPlans } = useTravelPlan();
const { getSchedule } = useSchedule();
const { isMobile } = useDevice();

onMounted(async () => {
  await getTravelPlans();
  if (travelPlans.value && travelPlans.value?.length > 0) {
    getSchedule();
  }
});
</script>

<template>
  <DevOnly>
    <DebugBar />
  </DevOnly>
  <RowCover class="absolute h-svh">
    <Fix
      class="w-full md:w-56 md:flex"
      v-if="!isMobile || filter.viewOnMobile == 'plan'"
    >
      <ColCover>
        <Fix
          class="flex items-center justify-between w-full text-white md:h-14 md:w-56 bg-sky-400 h-14 px-2"
        >
          <!-- 데스크탑 -->
          <Logo />
        </Fix>
        <Fix class="p-2">
          <PlanFilter />
        </Fix>
        <Fix class="p-2">
          <PlanWriting />
        </Fix>
        <Full>
          <ScrollArea class="h-full">
            <PlanList />
          </ScrollArea>
        </Full>
      </ColCover>
    </Fix>
    <Fix
      class="w-full md:w-96 md:flex"
      :class="filter.viewOnMobile == 'schedule' ? '' : 'hidden'"
      v-if="!isMobile || filter.viewOnMobile == 'schedule'"
    >
      <ColCover>
        <Fix
          v-if="isMobile"
          class="flex items-center justify-between w-full text-white md:hidden bg-sky-400 h-14 px-2"
        >
          <!-- 모바일 -->
          <Logo />
        </Fix>
        <Fix class="p-2">
          <ScheduleFilter />
        </Fix>
        <Fix class="p-2" v-if="filter.type == '장소'">
          <ScheduleSearch />
        </Fix>
        <Fix class="p-2" v-if="filter.type == '장소'">
          <SpotWriting />
        </Fix>
        <Full>
          <ScheduleList />
        </Full>
      </ColCover>
    </Fix>
    <Full
      class="z-0 w-full md:flex md:relative md:top-0"
      :class="filter.viewOnMobile == 'map' ? '' : 'absolute top-[99999px]'"
    >
      <ColCover>
        <Fix
          v-if="isMobile"
          class="flex items-center justify-between w-full text-white md:hidden bg-sky-400 h-14 px-2"
        >
          <!-- 모바일 -->
          <Logo />
        </Fix>
        <Fix v-if="isMobile" class="block p-2 md:hidden">
          <ScheduleFilter />
        </Fix>
        <Fix
          class="block p-2 md:hidden"
          v-if="isMobile || filter.type == '장소'"
        >
          <ScheduleSearch />
        </Fix>
        <Full>
          <Map />
        </Full>
      </ColCover>
    </Full>
  </RowCover>
  <ScheduleWriting
    :open="filter.scheduleWritingOpen"
    @update:open="filter.scheduleWritingOpen = $event"
  />
  <Toaster />
</template>

<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
