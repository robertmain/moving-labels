import { AxiosResponse } from 'axios';
import { Api } from './Api';
import { BoxResponse } from './dto/BoxResponse.dto';
import { CreateBoxDto } from './dto/CreateBox.dto';

/**
 * Get all Box data from the API
 */
export const getBoxes = async (): Promise<AxiosResponse<BoxResponse[]>> => Api.get('box');

/**
 * Add a new box to the database
 */
export const addBox = async (data: CreateBoxDto): Promise<AxiosResponse<BoxResponse>> => Api.post('box', data);
