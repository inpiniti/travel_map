<script setup lang="ts">
const { spots, selectedSpot } = useSpot();
const { schedulesSpots } = useSchedule();
const filter = useFilter();

const map: any = ref(null);
const zoom = ref(10);

const TILES: any = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoDb: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};
const selectedTileUrl = computed(() => TILES[filter.value.selectedTile]);

const schedulesSpotsLine: any = computed(() => {
  return (
    schedulesSpots.value?.map((spot) => [spot?.latitude, spot?.longitude]) || []
  );
});

const lat_lngs: any = computed(() => {
  const 일정 = schedulesSpots.value?.map((spot) => [
    spot.latitude,
    spot.longitude,
  ]);
  const 장소 = spots.value?.map((spot) => [spot.latitude, spot.longitude]);
  if (filter.value.type == "일정") {
    return 일정?.length == 0 ? 장소 : 일정;
  } else {
    return 장소?.length == 0 ? 일정 : 장소;
  }
});

const center: any = computed(() => {
  if (!lat_lngs.value?.length) return [0, 0];

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

const scheduleWritingOpen = (spot: Spot) => {
  selectedSpot.value = spot;
  filter.value.scheduleWritingOpen = true;
};
</script>
<template>
  <LMap
    ref="map"
    :bounds="lat_lngs"
    :zoom="zoom"
    :center="center"
    :use-global-leaflet="false"
    :zoomAnimation="false"
    :fadeAnimation="false"
    :markerZoomAnimation="false"
  >
    <LTileLayer :url="selectedTileUrl" layer-type="base" name="OpenStreetMap" />

    <LControl>
      <Button
        size="sm"
        @click="
          filter.selectedTile == 'openStreetMap'
            ? (filter.selectedTile = 'cartoDb')
            : (filter.selectedTile = 'openStreetMap')
        "
        >{{ filter.selectedTile }}
      </Button>
    </LControl>

    <LControl position="topleft">
      <MapToolbar />
    </LControl>

    <LLayerGroup v-if="spots">
      <!-- 마커 및 툴팁 
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in spots"
        @click="scheduleWritingOpen(spot)"
      >
        <LTooltip> {{ spot.spot_name }} </LTooltip>
      </LMarker>
      -->

      <!-- icon 마커 장소 -->
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in spots"
        :key="spot.id"
        @click="scheduleWritingOpen(spot)"
      >
        <LIcon
          :icon-size="[20, 20]"
          class-name="cursor-default-important z-0-important "
        >
          <div
            class="flex items-center justify-center w-5 h-5 text-white rounded-full cursor-pointer hover:bg-blue-400 bg-neutral-400"
          >
            <font-awesome size="xs" :icon="ICON[spot.type]" />
          </div>
        </LIcon>
        <LTooltip> {{ spot.spot_name }} </LTooltip>
      </LMarker>
    </LLayerGroup>

    <!-- 일정 -->
    <LLayerGroup v-if="schedulesSpots">
      <!-- icon 마커 -->
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in schedulesSpots"
        :key="spot.id"
        @click="scheduleWritingOpen(spot)"
      >
        <LIcon
          :icon-size="[32, 32]"
          class-name="cursor-default-important z-20-important"
        >
          <div
            class="flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full cursor-pointer"
          >
            <font-awesome size="lg" :icon="ICON[spot.type]" />
          </div>
        </LIcon>
        <LTooltip> {{ spot.spot_name }} </LTooltip>
      </LMarker>

      <!-- 마커 글씨 -->
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in schedulesSpots"
        :key="spot.id + '-label'"
      >
        <LIcon
          :icon-size="[0, 0]"
          class-name="cursor-default-important pointer-events-none"
        >
          <div
            class="flex items-center justify-center w-full h-full pt-7 whitespace-nowrap"
          >
            {{ spot.spot_name }}
          </div>
        </LIcon>
      </LMarker>

      <!-- 경로 -->
      <LPolyline
        v-if="schedulesSpotsLine"
        dashArray="10, 10"
        :lat-lngs="schedulesSpotsLine"
      />
    </LLayerGroup>
  </LMap>
</template>
