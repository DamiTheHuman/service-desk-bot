import axios, {AxiosResponse} from 'axios';
import {Logger} from './logger';

/**
 *
 * @param path
 * @returns
 */
export const get = async (path: string): Promise<AxiosResponse> | never => {
  try {
    const response = await axios.get(path);

    return response;
  } catch (error: Error | unknown) {
    error instanceof Error
      ? new Logger().error(error.message)
      : new Logger().error(JSON.stringify(error));

    throw error;
  }
};
