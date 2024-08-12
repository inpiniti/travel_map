<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["update:open"]);
</script>
<template>
  <Drawer :open="open" @update:open="emit('update:open', $event)">
    <DrawerContent>
      <div class="flex pb-4">
        <div class="px-4">
          <img class="rounded-full w-36" src="/city/가평.png" />
        </div>
        <div class="w-full">
          <DrawerHeader>
            <DrawerTitle>시사이드 모모치 해변공원</DrawerTitle>
            <DrawerDescription>
              모모치 해변은 후쿠오카 시내에서 가장 가까운 해변으로, 해변가에는
              레스토랑과 카페가 있어 휴식하기 좋다. 또한 해변가에는 모모치
              해변공원이 있어 산책하기 좋다.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>일정 추가</Button>
          </DrawerFooter>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
