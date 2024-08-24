<script setup lang="ts"></script>
<template>
  <div
    class="cursor-pointer"
    @click="
      useFilter().value.type =
        useFilter().value.type == '일정' ? '장소' : '일정'
    "
  >
    <font-awesome class="px-2" icon="chevron-left" />
    일정 등록하기
  </div>
</template>
