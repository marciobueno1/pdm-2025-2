import axios from "axios";

const headerJson = {
  "Content-Type": "application/json",
};

const headerRevocableSession = {
  "X-Parse-Revocable-Session": "1",
};

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 1000,
  headers: {
    "X-Parse-Application-Id": "lzQ61WWmjSxYma4dOZSVhO5Ofo9HQ0WaXT1bTRyY",
    "X-Parse-JavaScript-Key": "VzOBLroXdlFsuyozWeDEVGHSB4PGNJkpTbXUeSWk",
  },
});

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
