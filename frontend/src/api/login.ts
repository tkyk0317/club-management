import axios from "axios";

axios.defaults.headers.common["content-type"] = "application/json";

export const requestLogin = async (
    success: () => void
) => {
     try {
    const _res = await axios.post("http://localhost:8080/api/login", {});
    success();
  } catch (e) {
    console.log(e);
  }
}