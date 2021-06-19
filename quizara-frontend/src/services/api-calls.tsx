import axios from "axios";

type Response = {
  success: boolean;
  response?: any;
  error?: string;
};

const url = "https://quizara-backend.nadaafarook.repl.co";
type AxiosParam = {
  type: "get" | "post";
  data?: any;
  endpoint: string;
  token: string | null;
};

const AxiosCall = async ({ type, data, endpoint, token }: AxiosParam) => {
  switch (type) {
    case "get":
      try {
        const response = await axios.get(url + endpoint, {
          headers: { "auth-token": token },
        });

        if (response.data.success === true) {
          return response.data;
        } else {
          return { success: false, error: "Error in server." };
        }
      } catch (err) {
        return { success: false, error: err.response.data.message };
      }

    case "post":
      try {
        const response = await axios.post(url + endpoint, data, {
          headers: { "auth-token": token },
        });
        console.log(response);
        if (response.data.success === true) {
          return response.data;
        } else {
          return { success: false, error: response };
        }
      } catch (err) {
        return {
          success: false,
          error: err.response.data.message,
        } as Response;
      }
  }
};
export default AxiosCall;
