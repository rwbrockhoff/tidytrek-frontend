export const validEmail = (email: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validPassword = (password: string) => {
  if (password.length < 8) {
    return false;
  } else if (password.search(/[a-z]/) < 0) {
    return false;
  } else if (password.search(/[A-Z]/) < 0) {
    return false;
  } else if (password.search(/[0-9]/) < 0) {
    return false;
  } else {
    return true;
  }
};
