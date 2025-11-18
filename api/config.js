import axios from "axios";

export const headerJson = {
  "Content-Type": "application/json",
};

export const headerRevocableSession = {
  "X-Parse-Revocable-Session": "1",
};

export const xParseSessionTokenKey = "X-Parse-Session-Token";

export const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 1000,
  headers: {
    "X-Parse-Application-Id": "lzQ61WWmjSxYma4dOZSVhO5Ofo9HQ0WaXT1bTRyY",
    "X-Parse-JavaScript-Key": "VzOBLroXdlFsuyozWeDEVGHSB4PGNJkpTbXUeSWk",
  },
});
