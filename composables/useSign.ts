const EMAIL_REDIRECT_TO = "https://potatomap.com";

export const useSign = () => {
  const { toast } = useToast();
  const user = useState("user");

  onMounted(async () => {
    user.value = (await useSupabase().auth.getUser()).data.user;
  });

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await useSupabase().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: EMAIL_REDIRECT_TO,
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

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await useSupabase().auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        title: "로그인에 실패하였습니다.",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } else {
      alert("로그인에 성공하였습니다.");
      user.value = (await useSupabase().auth.getUser()).data.user;
      alert(user.value);
    }
  };

  const logout = async () => {
    const { error } = await useSupabase().auth.signOut();
    if (error) {
      toast({
        title: "로그아웃에 실패하였습니다.",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } else {
      alert("로그아웃에 성공하였습니다.");
      user.value = (await useSupabase().auth.getUser()).data.user;
    }
  };

  const loginForKakao = async () => {
    const { data, error } = await useSupabase().auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) {
      toast({
        title: "카카오 로그인에 실패하였습니다.",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } else {
      user.value = (await useSupabase().auth.getUser()).data.user;
    }
  };

  const loginForGoogle = async () => {
    const { data, error } = await useSupabase().auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      toast({
        title: "구글 로그인에 실패하였습니다.",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    } else {
      user.value = (await useSupabase().auth.getUser()).data.user;
    }
  };

  return {
    user,
    signUp,
    login,
    logout,
    loginForKakao,
    loginForGoogle,
  };
};
