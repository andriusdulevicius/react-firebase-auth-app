import axios from 'axios';
import { apiKey } from '../config';
import { toast } from 'react-toastify';

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url + apiKey, data);
    console.log({ response });

    return response;
  } catch (error) {
    toast.error('Error: ' + error.response.data.error.message);
  }
};
