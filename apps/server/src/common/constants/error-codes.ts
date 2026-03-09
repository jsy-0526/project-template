export const ERROR_CODES = {
  AUTH: {
    INVALID_CREDENTIALS: { code: 1001, message: '邮箱或密码错误', en: 'Invalid email or password' },
    TOKEN_EXPIRED: { code: 1002, message: 'Token已过期', en: 'Token expired' },
    TOKEN_INVALID: { code: 1003, message: 'Token无效', en: 'Invalid token' },
    UNAUTHORIZED: { code: 1004, message: '未授权访问', en: 'Unauthorized' },
    EMAIL_EXISTS: { code: 1005, message: '邮箱已存在', en: 'Email already exists' },
  },
  USER: {
    NOT_FOUND: { code: 2001, message: '用户不存在', en: 'User not found' },
    ALREADY_EXISTS: { code: 2002, message: '用户已存在', en: 'User already exists' },
  },
  FIGMA: {
    INVALID_TOKEN: { code: 3001, message: 'Figma Token无效', en: 'Invalid Figma token' },
    API_ERROR: { code: 3002, message: 'Figma API错误', en: 'Figma API error' },
    FILE_NOT_FOUND: { code: 3003, message: 'Figma文件不存在', en: 'Figma file not found' },
  },
  PROJECT: {
    NOT_FOUND: { code: 4001, message: '项目不存在', en: 'Project not found' },
    ACCESS_DENIED: { code: 4002, message: '无权访问项目', en: 'Access denied' },
  },
  VALIDATION: {
    INVALID_INPUT: { code: 5001, message: '输入参数无效', en: 'Invalid input' },
  },
  SYSTEM: {
    INTERNAL_ERROR: { code: 9001, message: '系统内部错误', en: 'Internal server error' },
    SERVICE_UNAVAILABLE: { code: 9002, message: '服务不可用', en: 'Service unavailable' },
  },
} as const;
