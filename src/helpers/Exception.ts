export default class Exception extends Error {
  code: number;
  reportError?: boolean;
  meta: Record<string, any>;

  constructor(message: string, code: number = 500, meta: Record<string, any> = {}) {
    super(message);
    this.name = "Exception";
    this.code = code;
    this.meta = meta;

    Object.setPrototypeOf(this, Exception.prototype);
  }

  toJson(): Record<string, any> {
    const json = JSON.parse(JSON.stringify(this.meta || {}));

    json.code = this.code;
    json.message = this.message;

    return json;
  }
}
