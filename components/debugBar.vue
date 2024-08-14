<script setup lang="ts">
const { schedulesSpots } = useSchedule();
const filter = useFilter();
</script>
<template>
  <div class="border-b w-full p-1">
    <div>해야 할일</div>
    <div>일정 추가 모바일일에서 너무 크게 나옴</div>
    <div class="flex gap-1">
      <Dialog>
        <DialogTrigger> <Button>schedules</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(schedulesSpots, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger> <Button>filter</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(filter, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
