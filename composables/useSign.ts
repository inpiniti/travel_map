const EMAIL_REDIRECT_TO = "http://localhost:3000/welcome";

export const useSign = () => {
  const { toast } = useToast();

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
    }
  };

  return {
    signUp,
    login,
    logout,
    loginForKakao,
    loginForGoogle,
  };
};
