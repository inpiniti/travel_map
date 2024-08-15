<script setup lang="ts">
const { schedulesSpots, dayNSchedule } = useSchedule();
const filter = useFilter();
</script>
<template>
  <div class="w-full p-1 border-b">
    <div>해야 할일</div>
    <div>0일차로 안내려가고, 계획 비어 있는 경우 다음 일차로 안넘어가도록</div>
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
