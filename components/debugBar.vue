<script setup lang="ts">
const { schedules, schedulesSpots, dayNSchedule } = useSchedule();
const filter = useFilter();
</script>
<template>
  <div class="border-b w-full p-1">
    <div>해야 할일</div>
    <div>일정 탭인 경우에는 장소등록하기가 안보이게</div>
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
