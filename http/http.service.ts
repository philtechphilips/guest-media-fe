/* eslint-disable @typescript-eslint/no-explicit-any */
// import Environment from "@/utils/config/environment.config";
import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";

type HttpServiceConstructorParams = CreateAxiosDefaults<any>;

type HttpServiceParams<DTO, DQO> = {
  path: string;
  method: "post" | "get" | "delete" | "put" | "patch";
  body?: DTO;
  query?: DQO;
  options?: {
    handleError?: boolean;
    throwError?: boolean;
  };
};
export type HttpServiceResolverError = {
  message: string;
  statusCode: number;
};

export type HttpServiceResolverData<T = null> = {
  data: T;
  message: string;
};

export type HttpServiceResolverDTO<T> = Promise<{
  data: HttpServiceResolverData<T> | null;
  error: HttpServiceResolverError | null;
}>;

export default class HttpService {
   axiosInstance: AxiosInstance;
  constructor(private params: HttpServiceConstructorParams) {
    this.axiosInstance = axios.create(this.params);
  }

   async resolver<T>(
    fn: Promise<AxiosResponse>
    // @ts-ignore
  ): HttpServiceResolverDTO<T> {
    let data: HttpServiceResolverData<T> | null = null;
    let error: null | HttpServiceResolverError = null;
    try {
      const { data: apiResponse } = await fn;
      data = apiResponse;
    } catch (_error: any) {
      error = _error.response?.data || {
        message: _error.message,
        statusCode: 400,
      };
    }
    return { data, error };
  }

   async SendRequest<
    DAO,
    DTO = Record<any, any>,
    DQO = Record<any, any>
  >(params: HttpServiceParams<DTO, DQO>) {
    const response = await this.resolver<DAO>(
      this.axiosInstance[params.method](
        params.path,
        params.body ? params.body : ({ params: params.query || {} } as any),
        params.body && params.query ? { params: params.query } : {}
      )
    );
    if (response.error && params.options?.throwError) {
      throw response.error;
    }
    return response;
  }
}
