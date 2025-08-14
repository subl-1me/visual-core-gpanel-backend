import bcrypt from "bcrypt";

export const auth = async (user: any, stored: any) => {
  console.log(stored);
  console.log(user);
  const hash = stored.password;
  const match = await bcrypt.compare(user.password, hash);
  if (match) {
    const session = {
      username: stored.username,
      email: stored.email,
      name: stored.name,
      lastName: stored.lastName,
      id: stored.id,
      pos: stored.pos,
      tkn: null,
    };
    return { error: false, authenticated: true, session };
  }

  return {
    error: true,
    message: "Incorrect password.",
    authenticated: false,
  };
};
