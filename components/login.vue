<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref(null);

const signUp = async () => {
  const { error } = await useSupabase().auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error("Signup error:", error.message);
  } else {
    console.log("Signup success");
  }
};
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
          여기에서 프로필을 변경할 수 있습니다. 완료되면 저장을 클릭하세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label for="email" class="text-right"> Email </Label>
          <Input id="email" v-model="email" class="col-span-3" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label for="password" class="text-right"> Password </Label>
          <Input id="password" v-model="password" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="signUp"> signUp </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
