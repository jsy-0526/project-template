import { RESPONSE_CODES } from '../constants';

/**
 * 构建成功响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应对象
 */
export function buildSuccessResponse<T>(data: T, message?: string) {
  return {
    code: RESPONSE_CODES.SUCCESS.code,
    message: message || RESPONSE_CODES.SUCCESS.message,
    data,
    timestamp: Date.now(),
  };
}

/**
 * 构建错误响应
 * @param code 错误码
 * @param message 错误消息
 * @returns 响应对象
 */
export function buildErrorResponse(code: number, message: string) {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
  };
}
