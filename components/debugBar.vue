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
      일정 제거, 카테고리가 전체라고 되어 있을때는 모든 장소가 보이게,
      리스트에서 카테고리는 하나씩 선택할수 있게
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
