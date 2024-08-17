<script setup lang="ts">
// event.node.res.setHeader("Content-Type", "text/html; charset=utf-8");
const { data: content } = await useFetch("/api/namuwiki");
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="bg-teal-600 hover:bg-teal-500">
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
        <div v-html="content" class="overflow-hidden"></div>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary"> Close </Button>
        </DialogClose>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
