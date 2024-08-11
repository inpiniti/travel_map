<script setup lang="ts">
import { city } from "../data/city";
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="font-bold w-full"> + 여행 계획 작성하기 </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>여행 계획 작성하기</DialogTitle>
        <DialogDescription>
          여기에서 여행 계획을 작성해보세요. 완료되면 저장을 클릭하세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> 여행계획명 </Label>
          <Input id="name" class="col-span-3" placeholder="서울 3박 4일 여행" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> 작성자 </Label>
          <Input id="username" class="col-span-3" placeholder="홍길동" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> 여행지역 </Label>
          <Select>
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
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> 여행기간 </Label>
          <Input id="username" class="col-span-3" placeholder="3박 4일" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit"> Save changes </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
