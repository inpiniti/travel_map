<script setup lang="ts">
import { ref } from "vue";
const { spots } = useSpot();
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { getTravelPlans } = useTravelPlan();

const zoom = ref(10);
const TILES: any = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoDb: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};
const selectedTile = ref("cartoDb");
const selectedTileUrl = computed(() => TILES[selectedTile.value]);

// 일정
const itinerary = ref<any>([]);

onMounted(() => {
  getTravelPlans();

  // const map = mapRef.value.mapObject;
  // const bounds = spots.value.후쿠오카.map((spot) => [spot.latitude, spot.longitude]);
  // map.fitBounds(bounds);
});

const open = ref(false);
const map = ref(null);

const lat_lngs: any = computed(() => {
  return spots.value?.map((spot) => [spot.latitude, spot.longitude]) || [];
});
const center = computed(() => {
  if (!lat_lngs.value.length) return [0, 0];

  let minLat = Infinity,
    maxLat = -Infinity;
  let minLng = Infinity,
    maxLng = -Infinity;

  lat_lngs.value.forEach(([lat, lng]: [lat: number, lng: number]) => {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;

  return [midLat, midLng];
});
</script>

<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="p-4 w-56">여기어때</Fix>
        <Full class="flex justify-between p-2">
          <MarkerFilter />
          <div class="flex gap-2">
            <SpotWriting />
            <Button
              variant="secondary"
              @click="
                selectedTile == 'openStreetMap'
                  ? (selectedTile = 'cartoDb')
                  : (selectedTile = 'openStreetMap')
              "
              >{{ selectedTile }}
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
          <LMap
            ref="map"
            :bounds="lat_lngs"
            :zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
          >
            <LTileLayer
              :url="selectedTileUrl"
              layer-type="base"
              name="OpenStreetMap"
            />
            <LCircle
              :lat-lng="[47.21322, -1.559482]"
              :radius="4500"
              :color="'red'"
            />
            <LFeatureGroup>
              <LMarker
                :lat-lng="[50, 50]"
                draggable
                @click="console.log('marker clicked')"
              />

              <LMarker :lat-lng="[47.41322, -1.219482]" />

              <LMarker :lat-lng="[47.61322, -0.519482]">
                <LIcon :icon-size="[21, 21]">★</LIcon>
              </LMarker>
              <LMarker :lat-lng="[47.61322, -0.519482]" />

              <LMarker :lat-lng="[47, -1]">
                <LIcon :icon-size="[21, 21]"> Hello, Map! </LIcon>
              </LMarker>

              <LMarker :lat-lng="[47, -1]">
                <LIcon :icon-size="[210, 210]"> Hello, Map! </LIcon>
              </LMarker>
              <LMarker :lat-lng="[47, -1]" />

              <LMarker
                :lat-lng="[spot.latitude, spot.longitude]"
                v-for="spot in spots"
                @click="open = true"
              />

              <LMarker
                :lat-lng="[spot.latitude, spot.longitude]"
                v-for="spot in spots"
              >
                <LIcon :icon-size="[100, 50]">
                  <div
                    class="flex items-center justify-center w-full h-full pt-6"
                  >
                    {{ spot.spot_name }}
                  </div>
                </LIcon>
              </LMarker>
            </LFeatureGroup>
            <LPolyline dashArray="10, 10" :lat-lngs="lat_lngs" />
          </LMap>
        </Full>
      </RowCover>
    </Full>
  </ColCover>
  <ItineraryWriting :open="open" @update:open="open = $event" />
</template>

<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
