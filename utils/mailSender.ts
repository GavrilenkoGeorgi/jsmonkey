import axios from "axios";
import { ContactFormMessage } from "../types";

export const sendContactMsg = async (data: ContactFormMessage) => {
  const url = `${process.env.NEXT_PUBLIC_EMAIL_BACKEND}`;
  try {
    const mailerResponse = await axios.post(url, data);
    return mailerResponse;
  } catch (error: any) {
    return error;
  }
};
