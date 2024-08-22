<script setup lang="ts">
const props = defineProps<{
  spot: Spot;
}>();
</script>
<template>
  <Card class="flex flex-col gap-2 p-2 text-xs cursor-pointer">
    <div class="flex w-full h-full gap-2 overflow-hidden">
      <Full>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <Badge variant="outline">{{ spot.city }}</Badge>
            <Badge variant="secondary">{{ spot.type }}</Badge>
          </div>
          <div>
            <div class="text-sm font-bold">{{ spot.spot_name }}</div>
          </div>
          <div class="text-zinc-400 line-clamp-3">
            {{ spot.description }}
          </div>
          <div class="text-zinc-600 line-clamp-3">
            {{ spot.opening }}
          </div>
          <div class="flex items-center gap-2 pt-2">
            <Badge v-if="spot.detailType">{{ spot.detailType }}</Badge>
            <Badge v-if="spot.rating" variant="outline">{{
              spot.rating
            }}</Badge>
            <Badge v-if="spot.reviews" variant="secondary">{{
              spot.reviews
            }}</Badge>
          </div>
        </div>
      </Full>
      <Fix>
        <img
          class="object-cover w-20 rounded-lg h-28"
          :src="spot.image"
          :alt="spot.spot_name"
        />
      </Fix>
    </div>
  </Card>
</template>
