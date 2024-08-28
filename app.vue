<script setup lang="ts">
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { travelPlans, getTravelPlans, selectedTravelPlan } = useTravelPlan();
const { getSchedule } = useSchedule();
const { isMobile } = useDevice();
const { user, logout } = useSign();

onMounted(async () => {
  await getTravelPlans();
  if (travelPlans.value && travelPlans.value?.length > 0) {
    getSchedule();
  }

  window.addEventListener("popstate", handlePopState);
});

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);
});

const handlePopState = (event: any) => useWindowHistory().pop(event);
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
          class="flex items-center justify-between w-full px-2 bg-yellow-400 md:h-14 md:w-56 h-14"
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
        <Fix class="flex items-center justify-between gap-2 p-2">
          <div v-if="user">
            <font-awesome icon="user" />
            <Avatar>
              <AvatarImage
                :src="user?.identities?.[0]?.identity_data?.avatar_url"
                :alt="user?.identities?.[0]?.identity_data?.email"
              />
              <AvatarFallback> <font-awesome icon="user" /> </AvatarFallback>
            </Avatar>
            <Button @click="logout">
              <font-awesome icon="right-from-bracket" />
              logout
            </Button>
          </div>
          <div class="flex gap-2" v-else><Signup /><Login /></div>
        </Fix>
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
          class="flex items-center justify-between w-full px-2 bg-yellow-400 md:hidden h-14"
        >
          <!-- 모바일 -->
          <Logo />
        </Fix>
        <!-- 데스크탑 -->
        <Fix
          class="items-center hidden w-full px-2 md:flex h-14"
          v-if="filter.type == '장소'"
        >
          <ScheduleStatusbar />
        </Fix>
        <Fix class="flex gap-2 p-2">
          <ScheduleFilter />
          <template v-if="filter.type == '장소'">
            <ScheduleSearch />
            <SpotWriting />
          </template>
        </Fix>
        <Fix class="flex p-2" v-if="filter.type != '장소'">
          <Button
            class="flex w-full gap-2"
            @click="
              useFilter().value.type =
                useFilter().value.type == '일정' ? '장소' : '일정'
            "
          >
            <font-awesome icon="plus" />
            일정 등록하기
          </Button>
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
          class="flex items-center justify-between w-full px-2 bg-yellow-400 md:hidden h-14"
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
