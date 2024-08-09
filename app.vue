<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="p-4 w-52">여기어때</Fix>
        <Full class="flex justify-between p-2">
          <div>
            <Button>음식점</Button>
            <Button variant="ghost">호텔</Button>
            <Button variant="ghost">즐길 거리</Button>
            <Button variant="ghost">박물관</Button>
            <Button variant="ghost">대중교통</Button>
            <Button variant="ghost">약국</Button>
            <Button variant="ghost">ATM</Button>
          </div>
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
        <Fix class="w-52">
          <ColCover>
            <Fix class="p-2">
              <div class="relative items-center w-full max-w-sm">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  class="pl-10"
                />
                <span
                  class="absolute inset-y-0 flex items-center justify-center px-2 start-0"
                >
                  <Search class="size-6 text-muted-foreground" />
                </span>
              </div>
            </Fix>
            <Full>
              <ScrollArea class="h-full">
                <div class="flex flex-col gap-2 p-2">
                  <Card
                    v-for="item in 125"
                    class="flex flex-col gap-2 p-4 text-xs"
                  >
                    후쿠오카 여행
                  </Card>
                </div>
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
        <Full>
          <LMap
            ref="map"
            :zoom="zoom"
            :center="[47.21322, -1.559482]"
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
                @click="alert('클릭되었습니다.')"
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
            </LFeatureGroup>
            <LPolyline
              dashArray="10, 10"
              :lat-lngs="[
                [47.334852, -1.509485],
                [47.342596, -1.328731],
                [47.241487, -1.190568],
                [47.234787, -1.358337],
              ]"
            />
          </LMap>
        </Full>
      </RowCover>
    </Full>
  </ColCover>
  <div style="height: 90vh; width: 90vw" class="hidden"></div>
</template>

<script setup>
import { ref } from "vue";
import ColCover from "./components/colCover.vue";
const zoom = ref(6);
const TILES = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  cartoDb: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
};
const selectedTile = ref("openStreetMap");
const selectedTileUrl = computed(() => TILES[selectedTile.value]);
</script>
<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
