<script setup lang="ts">
import { ref } from "vue";
import ColCover from "./components/colCover.vue";
import { spots } from "./data/spots";

const { getTravelPlans } = useTravelPlan();

const zoom = ref(10);
const TILES: any = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoDb: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};
const selectedTile = ref("openStreetMap");
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
</script>

<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="p-4 w-96">여기어때</Fix>
        <Full class="flex justify-between p-2">
          <MarkerFilter />
          <Button
            variant="secondary"
            @click="
              selectedTile == 'openStreetMap'
                ? (selectedTile = 'cartoDb')
                : (selectedTile = 'openStreetMap')
            "
            >{{ selectedTile }}</Button
          >
        </Full>
      </RowCover>
    </Fix>
    <Full>
      <RowCover>
        <Fix class="w-96">
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
            <Fix class="p-2">
              <div class="flex items-center gap-2">
                <Button variant="secondary"><</Button>
                <div>1일차</div>
                <Button variant="secondary">></Button>
              </div>
            </Fix>
            <Full>
              <ScrollArea class="h-full">
                <div class="flex flex-col gap-2 p-4">
                  <Card
                    v-for="item in 125"
                    class="flex flex-col gap-2 p-4 text-xs"
                  >
                    <div class="flex w-full h-full gap-2 overflow-hidden">
                      <Full>
                        <div class="font-bold">토끼정</div>
                        <div>일식 센텀4로 15 신세계센텀시티몰 4F</div>
                        <div class="text-neutral-400 line-clamp-2">
                          오후 10:00에 영업종료 매장 내 식사 배달이 안 됨
                        </div>
                        <div class="flex gap-2">
                          <Button size="xs" variant="ghost">음식점</Button>
                          <Button size="xs">영업중</Button>
                          <Button size="xs" variant="secondary">
                            important
                          </Button>
                        </div>
                      </Full>
                      <Fix>
                        <img
                          class="w-20 h-20 overflow-hidden rounded"
                          src="https://via.placeholder.com/150"
                          alt="토끼정"
                        />
                      </Fix>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </Full>
          </ColCover>
        </Fix>
        <Full class="z-0">
          <LMap
            ref="map"
            :zoom="zoom"
            :center="[33.5813, 130.2394]"
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
                v-for="spot in spots.후쿠오카"
                @click="open = true"
              />
            </LFeatureGroup>
            <LPolyline
              dashArray="10, 10"
              :lat-lngs="
                spots.후쿠오카.map((spot) => [spot.latitude, spot.longitude])
              "
            />
          </LMap>
        </Full>
      </RowCover>
    </Full>
  </ColCover>
  <Drawer :open="open" @update:open="open = $event">
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline"> Cancel </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
