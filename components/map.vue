<script setup lang="ts">
const { spots, selectedSpot, getSpots } = useSpot();
const filter = useFilter();

const map: any = ref(null);
const zoom = ref(10);

const TILES: any = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoDb: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};
const selectedTileUrl = computed(() => TILES[filter.value.selectedTile]);

const lat_lngs: any = computed(() => {
  return spots.value?.map((spot) => [spot.latitude, spot.longitude]) || [];
});

const center: any = computed(() => {
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
  >
    <LTileLayer :url="selectedTileUrl" layer-type="base" name="OpenStreetMap" />
    <LCircle :lat-lng="[47.21322, -1.559482]" :radius="4500" :color="'red'" />
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

      <LMarker :lat-lng="[spot.latitude, spot.longitude]" v-for="spot in spots">
        <LIcon :icon-size="[100, 100]" class-name="cursor-default-important">
          <div class="flex items-center justify-center w-full h-full pt-14">
            {{ spot.spot_name }}
          </div>
        </LIcon>
      </LMarker>

      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in spots"
        @click="scheduleWritingOpen(spot)"
      >
        <LTooltip> {{ spot.spot_name }} </LTooltip>
      </LMarker>

      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in spots"
        @click="scheduleWritingOpen(spot)"
      >
        <LIcon :icon-size="[29, 29]" class-name="cursor-default-important">
          <div
            class="flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8L32 192c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9l0-.9 4.4-1.6L240.1 4.2zM64 224l64 0 0 192 40 0 0-192 64 0 0 192 48 0 0-192 64 0 0 192 40 0 0-192 64 0 0 196.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512L32 512c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1L64 224z"
              />
            </svg>
          </div>
        </LIcon>
      </LMarker>
    </LFeatureGroup>
    <LPolyline dashArray="10, 10" :lat-lngs="lat_lngs" />
  </LMap>
</template>
