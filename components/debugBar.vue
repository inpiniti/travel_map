<script setup lang="ts">
const { schedulesSpots } = useSchedule();
const filter = useFilter();
</script>
<template>
  <div class="border-b w-full p-1">
    <div>해야 할일</div>
    <div>데스크탑에서는 지도에 탭이 안보이고</div>
    <div>모바일에서는 보이되, 1일차 선택하는게 보이게</div>
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
