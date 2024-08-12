<template>
  <Fix class="p-2">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day - 1"
        >
          <
        </Button>
        <div class="whitespace-nowrap">{{ useFilter().value.day }}일차</div>
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day + 1"
        >
          >
        </Button>
      </div>
      <Tabs v-model="useFilter().value.type">
        <TabsList>
          <TabsTrigger value="일정"> 일정 </TabsTrigger>
          <TabsTrigger value="장소"> 장소 </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </Fix>
  <Full>
    <ScrollArea class="h-full">
      <div class="flex flex-col gap-2 p-2">
        <Card v-for="item in 125" class="flex flex-col gap-2 p-2 text-xs">
          <div class="flex w-full h-full gap-2 overflow-hidden">
            <Full>
              <div class="font-bold">토끼정</div>
              <div>일식 센텀4로 15 신세계센텀시티몰 4F</div>
              <div class="text-neutral-400 line-clamp-2">
                오후 10:00에 영업종료 매장 내 식사 배달이 안 됨
              </div>
              <div class="flex gap-2">
                <Button size="xs" variant="ghost">음식점</Button>
                <Button size="xs">영업중</Button>
                <Button size="xs" variant="secondary"> important </Button>
              </div>
            </Full>
            <Fix>
              <img
                class="w-20 h-20 overflow-hidden rounded"
                src="https://via.placeholder.com/150"
                alt="토끼정"
              />
            </Fix>
          </div>
        </Card>
      </div>
    </ScrollArea>
  </Full>
</template>
