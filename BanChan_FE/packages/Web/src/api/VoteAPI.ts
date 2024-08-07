import { VoteGetType, VoteCreateType} from "../Type";
import axios,{AxiosResponse } from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getVote = async (Token:string,API_REST:string):Promise<VoteGetType> => {
  try {
    const response: AxiosResponse<VoteGetType> = await axios.get(`${API_URL}/${API_REST}`, {
      headers: {
        Authorization: `Bearer ${Token}`, // Use response data here
      }
    });
    return response.data; // content 배열만 반환
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다!", error);
    return {data : []};
  }
};

export const CreateVote = async (Token:string,API_REST:string,data:VoteCreateType) => {
  try {
    const response: AxiosResponse<VoteGetType> = await axios.post(`${API_URL}/${API_REST}`,
      {
        data
      }, {
      headers: {
        Authorization: `Bearer ${Token}`, // Use response data here
      }
    });
    console.log(response);
    return response.data; // content 배열만 반환
  } catch (error) {
    console.error("생성 중 오류가 발생하였습니다", error);
  }
};