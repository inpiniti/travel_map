<script setup lang="ts">
const filter = useFilter();

const toggleCategory = (category: string) => {
  filter.value.category = [category];

  filter.value.type = "장소";
  useSpot().getSpots();
};
</script>
<template>
  <div class="flex">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>category</SelectLabel>
          <SelectItem :value="category" v-for="category in CATEGORYS">
            {{ category }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
