function validatePassword(value: string) {
  const rules = [
    { regex: /[A-Z]/, error: "Must include at least one uppercase letter" },
    { regex: /[a-z]/, error: "Must include at least one lowercase letter" },
    { regex: /\d/, error: "Must include at least one digit" },
    {
      regex: /[@$!%*?&]/,
      error: "Must include at least one special character",
    },
  ];

  for (const rule of rules) {
    if (!rule.regex.test(value)) {
      return rule.error;
    }
  }

  return true;
}

export { validatePassword };
