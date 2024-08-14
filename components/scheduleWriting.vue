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
      <RowCover class="divide-x-0 pl-2">
        <Fix>
          <img
            class="object-cover rounded-full w-20 h-20 md:w-36 md:h-36"
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
            <Button @click="addSchedule">일정 추가</Button>
          </DrawerFooter>
        </Full>
      </RowCover>
    </DrawerContent>
  </Drawer>
</template>
