<script setup lang="ts">
import { ref } from "vue";

const { login, loginForKakao, loginForGoogle } = useSign();

const email = ref("");
const password = ref("");
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Login </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          여기에서 프로필을 변경할 수 있습니다. 완료되면 저장을 클릭하세요.
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
        <div class="flex gap-2">
          <Button type="submit" @click="login({ email, password })">
            login
          </Button>

          <Button
            type="submit"
            class="text-black bg-yellow-300"
            @click="loginForKakao"
          >
            <font-awesome icon="comment" class="mr-2" />
            kakao
          </Button>

          <Button type="submit" class="text-black" @click="loginForGoogle">
            <font-awesome icon="google" class="mr-2" />
            google
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
