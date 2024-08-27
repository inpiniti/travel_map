<script setup lang="ts">
import { ref } from "vue";

const { toast } = useToast();

const email = ref("");
const password = ref("");

const signUp = async () => {
  const { data, error } = await useSupabase().auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: "http://localhost:3000/welcome",
    },
  });
  if (error) {
    toast({
      title: "이메일 가입에 실패하였습니다.",
      description: `Error: ${error.message}`,
      variant: "destructive",
    });
  } else {
    toast({
      title: "이메일 가입에 성공하였습니다. 이메일에서 확인을 해주세요.",
    });
  }
};

const signUpkakao = async () => {
  const { data, error } = await useSupabase().auth.signInWithOAuth({
    provider: "kakao",
  });
  if (error) {
    toast({
      title: "카카오 가입에 실패하였습니다.",
      description: `Error: ${error.message}`,
      variant: "destructive",
    });
  } else {
    toast({
      title: "카카오로 가입에 성공하였습니다. 다시 로그인하여주세요.",
    });
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
        <div class="flex gap-2">
          <Button type="submit" @click="signUp"> 이메일로 회원가입 </Button>
          <Button
            type="submit"
            class="text-black bg-yellow-300"
            @click="signUpkakao"
          >
            <font-awesome icon="comment" class="mr-2" />
            kakao
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
