/**
 * 格式化日期为ISO字符串
 * @param date 日期对象
 * @returns ISO格式字符串
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * 获取当前时间戳（秒）
 * @returns 时间戳
 */
export function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}
