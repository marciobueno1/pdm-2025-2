import { headerJson, headerRevocableSession, instance } from "./config";

export async function signingUp({ password, username, email }) {
  const { data } = await instance.post(
    `/users`,
    { password, username, email },
    {
      headers: {
        ...headerJson,
        ...headerRevocableSession,
      },
    }
  );
  return data;
}

export async function loggingIn({ username, password }) {
  console.log("loggingIn", username, password);
  const { data } = await instance.post(
    `/login`,
    new URLSearchParams({
      username,
      password,
    }),
    {
      headers: headerRevocableSession,
    }
  );
  console.log("loggingIn", data);
  return data;
}

export async function loggingOut({ sessionToken }) {
  const { data } = await instance.post(`/logout`, "", {
    headers: {
      "X-Parse-Session-Token": sessionToken,
    },
  });
  return data;
}
