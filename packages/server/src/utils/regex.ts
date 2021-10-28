// Minimum eight characters, at least one letter and one number
export const isValidPassword = (string: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(string);
};

// Korean letter, uppercase, lowercase, number
export const isValidUserName = (string: string) => {
  return /^[가-힣|a-z|A-Z|0-9|]+$/.test(string);
};
