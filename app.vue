<script setup lang="ts">
import { ref } from "vue";
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { getTravelPlans } = useTravelPlan();

// 일정
const itinerary = ref<any>([]);

onMounted(() => {
  getTravelPlans();

  // const map = mapRef.value.mapObject;
  // const bounds = spots.value.후쿠오카.map((spot) => [spot.latitude, spot.longitude]);
  // map.fitBounds(bounds);
});
</script>

<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="w-56 p-4">여기어때</Fix>
        <Full class="flex justify-between p-2">
          <MarkerFilter />
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
        </Full>
      </RowCover>
    </Fix>
    <Full>
      <RowCover>
        <Fix class="w-56">
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
        <Fix class="w-96">
          <ColCover>
            <ItineraryList />
          </ColCover>
        </Fix>
        <Full class="z-0">
          <Map />
        </Full>
      </RowCover>
    </Full>
  </ColCover>
  <ItineraryWriting
    :open="filter.itineraryWritingOpen"
    @update:open="filter.itineraryWritingOpen = $event"
  />
</template>

<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
