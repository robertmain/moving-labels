import { Api, ApiResponse } from './Api';
import { ConfigurationDto } from './dto/Configuration.dto';

/**
 * Get all Box data from the API
 */
export const getConfig = async (item?: string): ApiResponse<ConfigurationDto> => Api.get(`config/${item || ''}`);
