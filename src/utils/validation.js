export const validateEmail = email => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) {
    return 'Enter a valid email address';
  }
  return null;
};

export const validatePassword = password => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const validateName = name => {
  if (!name || !name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
};

export const validateAmount = amount => {
  if (!amount) {
    return 'Amount is required';
  }
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    return 'Enter a valid amount';
  }
  return null;
};
