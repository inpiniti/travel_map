<script setup lang="ts">
const title = ref("카테고리");
const CATEGORYS = [
  "공항",
  "명소",
  "관광",
  "근교명소",
  "음식점",
  "카페",
  "호텔",
  "쇼핑",
  "선술집",
];
const filter = useFilter();

const selectedValues = computed(() => new Set(filter.value.category));
const toggleCategory = (category: string) => {
  if (selectedValues.value.has(category)) {
    filter.value.category = filter.value.category.filter((v) => v !== category);
  } else {
    filter.value.category.push(category);
  }

  filter.value.type = "장소";
  useSpot().getSpots();
};
</script>
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="gap-2 border-dashed">
        <font-awesome icon="location-dot" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <div class="space-x-1">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="px-1 font-normal rounded-sm"
            >
              {{ selectedValues.size }} selected
            </Badge>
            <Badge
              v-else
              v-for="option in selectedValues"
              :key="option"
              variant="secondary"
              class="px-1 font-normal rounded-sm"
            >
              {{ option }}
            </Badge>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command>
        <CommandInput placeholder="카테고리..." />
        <CommandList class="max-h-none">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem
            :value="category"
            v-for="category in CATEGORYS"
            class="flex gap-1 m-1 cursor-pointer"
            :class="selectedValues.has(category) ? 'bg-sky-200' : ''"
            @click="toggleCategory(category)"
          >
            <div v-if="selectedValues.has(category)">
              <font-awesome icon="circle-check" />
            </div>
            <div v-else><font-awesome icon="circle" /></div>
            <font-awesome :icon="ICON[category]" />
            <span>{{ category }}</span>
          </CommandItem>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
