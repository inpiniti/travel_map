<script setup lang="ts">
const { schedulesSpots, dayNSchedule } = useSchedule();
const filter = useFilter();
</script>
<template>
  <div class="w-full p-1 border-b">
    <div>해야 할일</div>
    <div>일정리스트에서도 추가 가능하도록 단 장소 탭에서만 가능하게</div>
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
      <Dialog>
        <DialogTrigger> <Button>dayNSchedule</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(dayNSchedule, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
