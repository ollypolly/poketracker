import axios from 'axios';

const API_URL = 'https://api.pokemontcg.io';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const request = {
  getData<T = any>(uri: string, params: any): Promise<T> {
    return api.get<T>(uri, {
      params,
    }).then(response => {
      return response.data;
    });
  },

  postData<T = any>(uri: string, body: FormData): Promise<T> {
    return api.post<T>(uri, body).then(response => {
      return response.data;
    });
  },
}
