import axios, { type AxiosInstance, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { toast } from 'sonner';

import { env } from '@/env';

interface IHttpResult<T = unknown> {
  data?: T;
  error?: string;
}

interface IHttpResponse<T = unknown> {
  data?: T;
}

interface IListResponse<T = unknown> {
  data?: T;
  last?: number;
  next?: number;
  total: number;
}
type IListResult<T = unknown> = IListResponse<T> & { error?: string };

export class RestService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this._setupInterceptors();
  }

  get baseUrl() {
    return `${env.api.baseUrl}${env.api.baseApi}`;
  }

  list = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<IListResponse<T>> => {
    const { data, status } = await this.api.get<IListResult<T>>(url, config);
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 200) {
      throw new Error('Ocorreu um erro ao listar os registros');
    }

    return { ...data };
  };

  get = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    const { data, status } = await this.api.get<IHttpResult<T>>(url, config);
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 200) {
      throw new Error('Ocorreu um erro ao buscar o registro');
    }

    return { ...data };
  };

  post = async <D = unknown, T = unknown>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig<D>
  ): Promise<IHttpResponse<T>> => {
    const { data, status } = await this.api.post<IHttpResult<T>>(url, payload, config);
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 201) {
      throw new Error('Ocorreu um erro ao salvar o registro');
    }

    return { ...data };
  };

  put = async <T = unknown, D = unknown>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig<D>
  ): Promise<IHttpResponse<T>> => {
    const { data, status } = await this.api.put<IHttpResult<T>>(url, payload, config);
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 200) {
      throw new Error('Ocorreu um erro ao atualizar o registro');
    }

    return { ...data };
  };

  delete = async (url: string, config?: AxiosRequestConfig): Promise<void> => {
    const { data, status } = await this.api.delete<IHttpResult>(url, config);
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 201) {
      throw new Error('Ocorreu um erro ao deletar o registro');
    }
  };

  postFormData = async <D = unknown, T = unknown>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig<D>
  ): Promise<IHttpResponse<T>> => {
    const { data, status } = await this.api.post<IHttpResult<T>>(url, payload, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data.error) {
      throw new Error(data.error);
    }

    if (status != 201) {
      throw new Error('Ocorreu um erro ao salvar o registro');
    }

    return { ...data };
  };

  private _setupInterceptors(): void {
    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      error => {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
        if (error?.response?.data) {
          /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
          const message = String(error.response.data?.error ?? error.response.data);
          toast.error(message, { className: '!text-red-400 !bg-red-200' });
          /* eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors */
          return Promise.reject(message as unknown);
        }

        let message = 'Ocorreu um erro desconhecido';

        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
        switch (error?.message) {
          case 'Network Error':
            message = 'Erro de internet';
            break;
          default:
            message = 'Ocorreu um erro desconhecido';
            break;
        }

        toast.error(message, { className: '!text-red-400 !bg-red-200' });
        /* eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors */
        return Promise.reject(message as unknown);
      }
    );
  }
}
