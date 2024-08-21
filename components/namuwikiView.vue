<script setup lang="ts">
const { selectedSpot, updateSpot } = useSpot();

const content = ref();

if (selectedSpot.value.namu === null) {
  const { data } = await useFetch(
    `/api/namuwiki/${selectedSpot.value.spot_name}`
  );
  content.value = data;
}

const updateNamuwiki = () => {
  console.log(content.value);
  if (content.value) {
    updateSpot({
      ...selectedSpot.value,
      namu: content.value,
    });
  }
};
</script>
<template>
  <DevOnly>
    <Button
      class="bg-teal-600 hover:bg-teal-500"
      @click="updateNamuwiki"
      v-if="!selectedSpot.namu && content"
    >
      나무위키 업데이트
    </Button>
  </DevOnly>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-teal-600 hover:bg-teal-500" v-if="selectedSpot.namu">
        <img src="/나무위키.png" class="h-7" />
      </Button>
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>Modal title</DialogTitle>
        <DialogDescription>
          Here is modal with overlay scroll
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div v-html="selectedSpot.namu" class="overflow-hidden"></div>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary"> Close </Button>
        </DialogClose>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
