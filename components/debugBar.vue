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
      일정 검색하기, 카테고리 두개이상 선택가능하도록, 지도에서 등록된건 파란색,
      안등록된건 회색으로 표시하기, 일정은 무조건 표시하기
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
