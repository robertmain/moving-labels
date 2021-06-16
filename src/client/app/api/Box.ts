import { AxiosResponse } from 'axios';
import { Api } from './Api';
import { BoxResponse } from './dto/BoxResponse.dto';

/**
 * Get all Box data from the API
 */
export const getBoxes = async (): Promise<AxiosResponse<BoxResponse[]>> => Api.get('box');
