<script setup lang="ts">
const { selectedTravelPlan } = useTravelPlan();
const { selectedSpot } = useSpot();
const { dayNSchedule, setSchedule, putSchedule } = useSchedule();
const filter = useFilter();

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["update:open"]);

const addSchedule = () => {
  if (dayNSchedule.value == undefined) {
    setSchedule({
      day: filter.value.day,
      travel_plan_id: selectedTravelPlan.value.id,
      travel_spot_ids: [selectedSpot.value.id] as number[],
    });
  } else {
    putSchedule({
      id: dayNSchedule.value.id,
      day: filter.value.day,
      travel_plan_id: selectedTravelPlan.value.id,
      travel_spot_ids: [
        ...new Set([
          ...dayNSchedule.value?.travel_spot_ids,
          selectedSpot.value?.id ?? 0,
        ]),
      ],
    });
  }

  filter.value.type = "일정";

  emit("update:open", false);
};
</script>
<template>
  <Drawer :open="open" @update:open="emit('update:open', $event)">
    <DrawerContent>
      <RowCover class="pl-2 divide-x-0">
        <Fix>
          <img
            class="object-cover w-20 h-20 rounded-full md:w-36 md:h-36"
            :src="selectedSpot.image"
          />
        </Fix>
        <Full>
          <DrawerHeader>
            <DrawerTitle class="text-left">
              {{ selectedSpot.spot_name }}
            </DrawerTitle>
            <DrawerDescription>
              <div class="flex flex-col gap-4">
                <div class="flex text-left">
                  {{ selectedSpot.description }}
                </div>
                <div class="flex gap-1">
                  <Badge>{{ selectedSpot.city }}</Badge>
                  <Badge variant="outline">{{ selectedSpot.type }}</Badge>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button @click="addSchedule" :disabled="filter.type == '일정'">
              일정 추가
            </Button>
            <NamuwikiView />
          </DrawerFooter>
        </Full>
      </RowCover>
    </DrawerContent>
  </Drawer>
</template>
