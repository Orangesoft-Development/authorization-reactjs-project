export const isEmail = email => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email.toLowerCase());
};

export const isPhoneNumber = name => {
  const reg = /^[0-9]*$/;
  return reg.test(name.toLowerCase());
};

export const isSymbolicName = name => {
  const reg = /^[a-zа-я ]*$/;
  return reg.test(name.toLowerCase());
};