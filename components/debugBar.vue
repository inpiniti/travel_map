<script setup lang="ts">
const { selectedTravelPlan } = useTravelPlan();
const { schedules, schedulesSpots, dayNSchedule } = useSchedule();
const { spots } = useSpot();
const {
  data: { user },
} = await useSupabase().auth.getUser();
const filter = useFilter();
</script>
<template>
  <div class="w-full p-1 border-b">
    <div>해야 할일</div>
    <div>일정 제거</div>
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
      <Dialog>
        <DialogTrigger> <Button>user</Button> </DialogTrigger>
        <DialogContent
          class="rounded-lg sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
        >
          <DialogHeader class="p-6 pb-0">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 px-6 py-4 overflow-y-auto">
            <pre>{{ JSON.stringify(user, null, 2) }}</pre>
          </div>
          <DialogFooter class="p-6 pt-0">
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
