<script setup lang="ts">
const { spots, getSpots } = useSpot();
const filter = useFilter();

const onEnter = async () => {
  await getSpots();

  const spotsFilter = spots.value.filter((spot) => {
    return spot.spot_name.includes(useFilter().value.scheduleSearch);
  });

  if (spotsFilter.length == 0) {
    filter.value.spotWritingOpen = true;
  }
};
</script>
<template>
  <Input
    type="text"
    placeholder="Search..."
    v-model="useFilter().value.scheduleSearch"
    @keyup.enter="onEnter"
  />
</template>
