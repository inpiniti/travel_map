<script setup lang="ts">
const { selectedTravelPlan } = useTravelPlan();
const { schedules, schedulesSpots, dayNSchedule } = useSchedule();
const { spots } = useSpot();
const filter = useFilter();
</script>
<template>
  <div class="w-full p-1 border-b">
    <div>해야 할일</div>
    <div>
      일정 등록에서 검색시에 없는경우 구글에서 조회해와서 추가해서 보여주기
    </div>
    <div class="flex gap-1">
      <Dialog>
        <DialogTrigger> <Button>selectedTravelPlan</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(selectedTravelPlan, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger> <Button>spots</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(spots, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger> <Button>schedules</Button> </DialogTrigger>
        <DialogContent>
          <pre>{{ JSON.stringify(schedules, null, 2) }}</pre>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger> <Button>schedulesSpots</Button> </DialogTrigger>
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
