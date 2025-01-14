import { SessionUser } from "../interface";

const DEFAULT = "http://dev.smandes.gov.ar/api/auth";

const API_DEFINED =
  process.env.REACT_APP_API_COMMONS &&
  process.env.REACT_APP_API_COMMONS + "/auth";

const API_URL = API_DEFINED || DEFAULT;

const ApiCommons = {
  LOGIN: API_URL + "/login",
  VERIFY: API_URL + "/verify",
};

const login = async (user: SessionUser): Promise<string> => {
  try {
    return await fetch(ApiCommons.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => data.token);
  } catch (error) {
    throw new Error("Servicio no disponible!.");
  }
};

const checkAuth = async (
  token: string
): Promise<{ renewToken: string; user: SessionUser }> => {
  try {
    const resp = await fetch(ApiCommons.VERIFY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    if (resp.status !== 200) {
      throw new Error("Token invalido o expiro la sesión.");
    }

    const data = await resp.json();

    return {
      renewToken: data.token,
      user: data.payload,
    };
  } catch (error) {
    throw new Error(error + "");
  }
};

export default {
  login,
  checkAuth,
};
