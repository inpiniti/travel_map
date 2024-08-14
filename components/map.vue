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
            <font-awesome icon="landmark" />
          </div>
        </LIcon>
      </LMarker>
    </LFeatureGroup>
    <LPolyline dashArray="10, 10" :lat-lngs="lat_lngs" />
  </LMap>
</template>
<!-- 
landmark 랜드마크
bag-shopping 쇼핑
train 기차
train-subway 지하철
utensils
plane 비행기
hotel 호텔


trash 삭제
-->
