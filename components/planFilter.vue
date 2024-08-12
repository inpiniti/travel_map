<script setup lang="ts">
import { city } from "../data/city";
</script>
<template>
  <div class="relative items-center w-full flex gap-2">
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      v-model="useFilter().value.search"
    />
    <Select v-model="useFilter().value.city">
      <SelectTrigger>
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <template v-for="key in Object.keys(city)">
            <SelectLabel>{{ key }}</SelectLabel>
            <SelectItem :value="city_name" v-for="city_name in city[key]">
              {{ city_name }}
            </SelectItem>
          </template>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
