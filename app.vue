<script setup lang="ts">
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { travelPlans, getTravelPlans } = useTravelPlan();
const { getSchedule } = useSchedule();

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
  <ColCover class="absolute h-svh">
    <Fix>
      <RowCover>
        <Fix
          class="flex items-center justify-between w-full md:p-4 md:w-56"
          :class="filter.viewOnMobile == 'plan' ? 'p-4' : 'p-2'"
        >
          <Logo />
        </Fix>
        <Full class="justify-between hidden p-2 md:flex">
          <MenuBar />
        </Full>
      </RowCover>
    </Fix>
    <Full>
      <RowCover>
        <Fix
          class="w-full md:w-56 md:flex"
          :class="filter.viewOnMobile == 'plan' ? '' : 'hidden '"
        >
          <ColCover>
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
        >
          <ColCover>
            <Fix class="p-2">
              <ScheduleFilter />
            </Fix>
            <Fix class="p-2">
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
            <Fix class="p-2 md:hidden block">
              <ScheduleFilter />
            </Fix>
            <Full>
              <Map />
            </Full>
          </ColCover>
        </Full>
      </RowCover>
    </Full>
  </ColCover>
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
