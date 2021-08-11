import mock from "../utils/mock";

const userData = {
  id: "12345",
  email: "demo@bootlab.io",
  name: "Lucy Lavender",
};

mock.onPost("/api/auth/sign-in").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === "demo@bootlab.io" && password === "unsafepassword") {
    return [200, userData];
  }

  return [401, { message: "Please check your email and password" }];
});

mock.onPost("/api/auth/sign-up").reply(() => {
  return [200, userData];
});

mock.onPost("/api/auth/reset-password").reply(() => {
  return [200, userData];
});
