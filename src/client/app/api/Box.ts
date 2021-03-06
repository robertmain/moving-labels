import {
  get,
  post,
  patch,
  ApiResponse,
} from './Api';
import { BoxResponse } from './dto/BoxResponse.dto';
import { CreateBoxDto } from './dto/CreateBox.dto';
import { UpdateBoxDto } from './dto/UpdateBox.dto';

/**
 * Get all Box data from the API
 */
export const getBoxes = async (): ApiResponse<BoxResponse[]> => get('box');

/**
 * Add a new box to the database
 */
export const addBox = async (data: CreateBoxDto): ApiResponse<BoxResponse> => post('box', data);

/**
 * Update an existing box
 *
 * Only fields specified in the form data will be updated. This is a `PATCH`
 * operation. Therefore, only the fields included in the form will be updated
 * any omitted fields will not be changed.
 */
export const updateBox = async (id: string, data: UpdateBoxDto): ApiResponse<BoxResponse> => patch(`box/${id}`, data);
