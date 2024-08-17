<script setup lang="ts">
const filter = useFilter();
const toggleCategory = (category: string) => {
  if (filter.value.category.includes(category)) {
    filter.value.category = filter.value.category.filter((v) => v !== category);
  } else {
    filter.value.category.push(category);
  }

  useSpot().getSpots();
};
</script>
<template>
  <div class="flex flex-col gap-1 items-center justify-center">
    <Button
      class="h-11 w-12 text-xs"
      size="sm"
      :variant="filter.category.includes(category) ? 'default' : 'ghost'"
      v-for="category in CATEGORYS"
      @click="toggleCategory(category)"
    >
      <div class="flex flex-col gap-1 items-center">
        <font-awesome :icon="ICON[category]" />
        {{ category }}
      </div>
    </Button>
  </div>
</template>
