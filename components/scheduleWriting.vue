<script setup lang="ts">
const { selectedTravelPlan } = useTravelPlan();
const { selectedSpot } = useSpot();
const { schedules, dayNSchedule, setSchedule, putSchedule } = useSchedule();
const filter = useFilter();

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["update:open"]);

const addSchedule = () => {
  emit("update:open", false);

  if (dayNSchedule == undefined) {
    setSchedule({
      day: filter.value.day,
      travel_plan_id: selectedTravelPlan.value.id,
      travel_spot_ids: [selectedSpot.value.id ?? 0],
    });
  } else {
    putSchedule({
      id: dayNSchedule.value.id,
      day: filter.value.day,
      travel_plan_id: selectedTravelPlan.value.id,
      travel_spot_ids: [
        ...dayNSchedule.value?.travel_spot_ids,
        selectedSpot.value?.id ?? 0,
      ],
    });
  }
};
</script>
<template>
  <Drawer :open="open" @update:open="emit('update:open', $event)">
    <DrawerContent>
      <div class="flex pb-4">
        <div class="px-4">
          <img
            class="object-cover rounded-full w-36 h-36"
            :src="selectedSpot.image"
          />
        </div>
        <div class="w-full">
          <DrawerHeader>
            <DrawerTitle>{{ selectedSpot.spot_name }}</DrawerTitle>
            <DrawerDescription>
              <div class="flex flex-col gap-4">
                <div>
                  {{ selectedSpot.description }}
                </div>
                <div>
                  <Badge>{{ selectedSpot.city }}</Badge>
                  <Badge variant="outline">{{ selectedSpot.type }}</Badge>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button @click="addSchedule">일정 추가</Button>
          </DrawerFooter>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
