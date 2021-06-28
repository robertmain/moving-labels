import { post, ApiResponse } from './Api';
import { BoxResponse } from './dto/BoxResponse.dto';

/**
 * Sends a label to the printer for printing
 */
export const printLabel = async (id: string): ApiResponse<BoxResponse> => post('label', { id });
