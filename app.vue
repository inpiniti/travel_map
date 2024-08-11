<script setup lang="ts">
import { ref } from "vue";
import ColCover from "./components/colCover.vue";
import dayjs from "dayjs";
import { city } from "./data/city";
import { spots } from "./data/spots";

const { travelPlans, getTravelPlans } = useTravelPlan();

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
});

const open = ref(false);
</script>

<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="p-4 w-96">여기어때</Fix>
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
        <Fix class="w-96">
          <ColCover>
            <Fix class="p-2">
              <div class="relative items-center w-full flex gap-2">
                <Input id="search" type="text" placeholder="Search..." />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <template v-for="key in Object.keys(city)">
                        <SelectLabel>{{ key }}</SelectLabel>
                        <SelectItem
                          :value="city_name"
                          v-for="city_name in city[key]"
                        >
                          {{ city_name }}
                        </SelectItem>
                      </template>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </Fix>
            <Full>
              <ScrollArea class="h-full">
                <div class="flex flex-col gap-2 p-2">
                  <Dialog>
                    <DialogTrigger as-child>
                      <Card class="flex gap-2 p-4 text-xs">
                        + 여행 계획 작성하기
                      </Card>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>여행 계획 작성하기</DialogTitle>
                        <DialogDescription>
                          여기에서 여행 계획을 작성해보세요. 완료되면 저장을
                          클릭하세요.
                        </DialogDescription>
                      </DialogHeader>
                      <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="name" class="text-right">
                            여행계획명
                          </Label>
                          <Input
                            id="name"
                            class="col-span-3"
                            placeholder="서울 3박 4일 여행"
                          />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="username" class="text-right">
                            작성자
                          </Label>
                          <Input
                            id="username"
                            class="col-span-3"
                            placeholder="홍길동"
                          />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="username" class="text-right">
                            여행지역
                          </Label>
                          <Select>
                            <SelectTrigger class="col-span-3">
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <template v-for="key in Object.keys(city)">
                                  <SelectLabel>{{ key }}</SelectLabel>
                                  <SelectItem
                                    :value="city_name"
                                    v-for="city_name in city[key]"
                                  >
                                    {{ city_name }}
                                  </SelectItem>
                                </template>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="username" class="text-right">
                            여행기간
                          </Label>
                          <Input
                            id="username"
                            class="col-span-3"
                            placeholder="3박 4일"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit"> Save changes </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Card
                    v-for="travelPlan in travelPlans"
                    class="flex gap-2 p-4 text-xs"
                  >
                    <img
                      src="https://img.freepik.com/free-vector/peullaes-dijain-jaedan-ui-nal-ilbon_23-2148810360.jpg"
                      alt="Travel Image"
                      class="w-32 h-full object-cover rounded-lg"
                    />
                    <div class="p-2 flex flex-col">
                      <div class="font-bold text-lg mb-2">
                        {{ travelPlan.travel_region }}
                        {{ travelPlan.travel_period }} 여행
                      </div>
                      <div class="flex items-center mb-1">
                        <i class="fas fa-user"></i>{{ travelPlan.author }}
                      </div>
                      <div class="flex items-center mb-1">
                        <i class="fas fa-calendar-alt"></i
                        >{{
                          dayjs(travelPlan.date_created).format("YYYY-MM-DD")
                        }}
                      </div>
                      <div class="flex gap-2">
                        <div class="flex items-center mb-1">
                          <i class="fas fa-map-marker-alt"></i
                          >{{ travelPlan.travel_region }}
                        </div>
                        <div class="flex items-center mb-1">
                          <i class="fas fa-flag"></i
                          >{{ travelPlan.travel_purpose }}
                        </div>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-clock"></i
                        >{{ travelPlan.travel_period }}
                      </div>
                    </div>
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
