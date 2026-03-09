export class ResponseDto<T> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
  path: string;

  constructor(code: number, message: string, data: T, path: string) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
    this.path = path;
  }
}
