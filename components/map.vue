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

const drawSpot = computed(() => {
  if (filter.value.type == "일정") {
    return schedulesSpots.value;
  } else {
    return spots.value;
  }
});

const lat_lngs: any = computed(() => {
  if (filter.value.type == "일정") {
    return (
      schedulesSpots.value?.map((spot) => [spot.latitude, spot.longitude]) || []
    );
  } else {
    return spots.value?.map((spot) => [spot.latitude, spot.longitude]) || [];
  }
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
  console.log("drawSpot", drawSpot);
  console.log("spot", spot);
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

    <LFeatureGroup>
      <!-- 마커 글씨 -->
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in drawSpot"
      >
        <LIcon :icon-size="[100, 100]" class-name="cursor-default-important">
          <div class="flex items-center justify-center w-full h-full pt-14">
            {{ spot.spot_name }}
          </div>
        </LIcon>
      </LMarker>

      <!-- 마커 및 툴팁 
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in spots"
        @click="scheduleWritingOpen(spot)"
      >
        <LTooltip> {{ spot.spot_name }} </LTooltip>
      </LMarker>
      -->

      <!-- icon 마커 -->
      <LMarker
        :lat-lng="[spot.latitude, spot.longitude]"
        v-for="spot in drawSpot"
        :key="spot.id"
        @click="scheduleWritingOpen(spot)"
      >
        <LIcon :icon-size="[29, 29]" class-name="cursor-default-important">
          <div
            class="flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full"
          >
            <font-awesome :icon="ICON[spot.type]" />
          </div>
        </LIcon>
      </LMarker>

      <!-- 경로 -->
      <LPolyline
        v-if="filter.type == '일정'"
        dashArray="10, 10"
        :lat-lngs="lat_lngs"
      />
    </LFeatureGroup>
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
