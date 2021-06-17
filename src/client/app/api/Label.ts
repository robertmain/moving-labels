import { AxiosResponse } from 'axios';
import { Api } from './Api';
import { BoxResponse } from './dto/BoxResponse.dto';

/**
 * Sends a label to the printer for printing
 */
export const printLabel = async (id: string): Promise<AxiosResponse<BoxResponse>> => Api.post('label', id);
