<script setup lang="ts">
const props = defineProps<{
  spot: Spot;
}>();
const emit = defineEmits(["scheduleWritingOpen"]);
</script>
<template>
  <Card
    class="flex flex-col gap-2 p-2 text-xs cursor-pointer"
    @click="emit('scheduleWritingOpen')"
  >
    <div class="flex w-full h-full gap-2 overflow-hidden">
      <Full>
        <div class="flex flex-col gap-1">
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <Badge variant="outline">{{ spot.city }}</Badge>
                <Badge variant="secondary">{{ spot.type }}</Badge>
              </div>
              <div>
                <div class="text-sm font-bold">{{ spot.spot_name }}</div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" @click.stop="() => {}">
                  <font-awesome icon="ellipsis" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>일정 수정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="trash-can" />
                  <span>일정에서 삭제</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="plus" />
                  <span>2일차에 등록</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="plus" />
                  <span>3일차에 등록</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="plus" />
                  <span>4일차에 등록</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="plus" />
                  <span>5일차에 등록</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="gap-2">
                  <font-awesome icon="plus" />
                  <span>6일차에 등록</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          class="object-cover w-28 rounded-lg h-28"
          :src="spot.image"
          :alt="spot.spot_name"
        />
      </Fix>
    </div>
  </Card>
</template>
