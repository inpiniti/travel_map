<script setup lang="ts">
const { setSpot, status, getSpotOfGoogle } = useSpot();
const form = ref({
  spot_name: "",
  description: "",
  image: "",
  latitude: 0,
  longitude: 0,
  type: "",
  city: "",
});

const saveSpot = async () => {
  const res = await setSpot(form.value);
  if (res) {
    form.value = {
      ...form.value,
      spot_name: "",
      description: "",
      image: "",
      latitude: 0,
      longitude: 0,
    };
    open.value = false;
  }
};
const open = ref(false);

watchEffect(() => {
  form.value.type = useFilter().value.category[0];
  form.value.city = useFilter().value.city;
});

const getSpot = async () => {
  const res: any = await getSpotOfGoogle(form.value.spot_name);
  if (res) {
    form.value = {
      ...form.value,
      description: res.description,
      image: res.image,
      latitude: res.latitude,
      longitude: res.longitude,
    };
  }
};
</script>
<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <Button class="w-full"> + 장소 등록하기 </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>장소 등록하기</DialogTitle>
        <DialogDescription>
          등록된 장소가 없는 경우 여기에서 장소를 등록해보세요. 완료되면 저장을
          클릭하세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 유형 </Label>
          <Input type="text" class="col-span-3" v-model="form.type" readonly />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 도시 </Label>
          <Input type="text" class="col-span-3" v-model="form.city" readonly />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소명 </Label>
          <Input
            class="col-span-2"
            placeholder="이치란 본점"
            v-model="form.spot_name"
          />
          <Button class="col-span-1" @click="getSpot">가져오기</Button>
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 설명 </Label>
          <Input
            class="col-span-3"
            placeholder="후쿠오카를 대표하는 라멘 전문점
칼칼하게 먹고 싶다면 비밀소스 3단계 이상 추천
텐진 등 다른 곳에도 여러 매장이 있음"
            v-model="form.description"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 이미지 ULR </Label>
          <Input
            class="col-span-3"
            placeholder="https://www.google.com"
            v-model="form.image"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 위도 </Label>
          <Input
            class="col-span-3"
            placeholder="33.590355"
            v-model="form.latitude"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 경도 </Label>
          <Input
            class="col-span-3"
            placeholder="130.401716"
            v-model="form.longitude"
          />
        </div>
      </div>
      <DialogFooter>
        <Button v-if="status"> loading... </Button>
        <Button v-else type="submit" @click="saveSpot"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
