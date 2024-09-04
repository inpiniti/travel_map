<script setup lang="ts">
import { city } from "../data/city";
import dayjs from "dayjs";

const { setTravelPlan, status } = useTravelPlan();
const { user } = useSign();
const { toast } = useToast();

const open = ref(false);

const form = ref({
  plan_name: "",
  author: "",
  travel_region: "",
  travel_period: "",
  date_created: dayjs().format("YYYY-MM-DD"),
});

const savePlan = () => {
  // 저장시 빈값이 있으면 alert
  const emptyFields = [];
  if (!form.value.plan_name) emptyFields.push("계획 이름");
  if (!form.value.author) emptyFields.push("작성자");
  if (!form.value.travel_region) emptyFields.push("여행 지역");
  if (!form.value.travel_period) emptyFields.push("여행 기간");

  if (emptyFields.length > 0) {
    toast({
      title: `${emptyFields.join(", ")} 필드를 채워주세요.`,
      variant: "destructive",
    });
    return;
  } else {
    open.value = false;
    setTravelPlan(form.value);
  }
};

watch(user, (newValue, oldValue) => {
  form.value = {
    plan_name: "",
    author: user.value?.identities?.[0]?.identity_data?.email,
    travel_region: "",
    travel_period: "",
    date_created: dayjs().format("YYYY-MM-DD"),
  };
});
</script>
<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <Button class="w-full font-bold"> + 여행 계획 작성하기 </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>여행 계획 작성하기</DialogTitle>
        <DialogDescription>
          여기에서 여행 계획을 작성해보세요. 완료되면 저장을 클릭하세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 여행계획명 </Label>
          <Input
            class="col-span-3"
            placeholder="서울 3박 4일 여행"
            v-model="form.plan_name"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 작성자 </Label>
          <Input
            class="col-span-3"
            placeholder="홍길동"
            v-model="form.author"
            disabled
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 여행지역 </Label>
          <Select v-model="form.travel_region">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <template v-for="key in Object.keys(city)">
                  <SelectLabel>{{ key }}</SelectLabel>
                  <SelectItem :value="city_name" v-for="city_name in city[key]">
                    {{ city_name }}
                  </SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 여행기간 </Label>
          <Input
            class="col-span-3"
            placeholder="3박 4일"
            v-model="form.travel_period"
          />
        </div>
      </div>
      <DialogFooter>
        <Button v-if="status"> loading... </Button>
        <Button v-else type="submit" @click="savePlan"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
