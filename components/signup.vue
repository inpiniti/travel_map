<script setup lang="ts">
import { ref } from "vue";

const { signUp } = useSign();

const email = ref("");
const password = ref("");
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Sign Up </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription>
          여기에서 회원가입을 할 수 있습니다. 이미 회원가입이 되신 분은 로그인을
          해주세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label for="email" class="text-right"> Email </Label>
          <Input
            id="email"
            v-model="email"
            class="col-span-3"
            autocomplete="off"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label for="password" class="text-right"> Password </Label>
          <Input
            type="password"
            id="password"
            v-model="password"
            class="col-span-3"
            autocomplete="off"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="signUp({ email, password })">
          이메일로 회원가입
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
