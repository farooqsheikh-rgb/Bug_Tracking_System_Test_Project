class Validators {
  static isValidStr(str: string): boolean {
    if (!str) {
      return false;
    }

    return typeof str === "string" && str.trim() !== "";
  }

  static isValidDate(date: string | number | Date): boolean {
    return new Date(date).getTime() > 0;
  }

  static isValidSSN(ssn: string): boolean {
    const re = /^\d{3}-?\d{2}-?\d{4}$/;
    return re.test(ssn);
  }

  static isValidFloat(number: string): boolean {
    const valid = /^-?\d*(\.\d+)?$/;
    return valid.test(number);
  }

  static isValidateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im;
    return re.test(String(email).toLowerCase());
  }

  static isValidateUserType(userType: string): boolean {
    const re = /^(manager|QA|developer)$/;
    return re.test(userType);
  }

  static isValidJSON(str: any): boolean {
    if (!str) return false;
    if (typeof str === "string") {
      try {
        str = JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    return !!str && typeof str === "object" && Object.keys(str).length > 0;
  }

  static isValidPassword(password: string): boolean {
    return this.isValidStr(password) && password.length >= 8;
  }

  static getParsedJson(data: any): any | null {
    if (!data) return null;

    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (e: any) {
        console.log(e.message);
        return null;
      }
    } else if (typeof data === "object" && Object.keys(data).length) {
      return data;
    }

    return null;
  }

  static propExists(key: string, obj: object): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key) && key in obj;
  }

  static isArray(variable: any): boolean {
    return (
      variable &&
      Object.prototype.toString.call(variable) === "[object Array]" &&
      Array.isArray(variable)
    );
  }

  static parseInteger(value: any, defaultValue: number) {
    try {
      value = parseInt(value, 10);

      return Number.isNaN(value) ? defaultValue : value;
    } catch (ex) {
      return defaultValue;
    }
  }

  static validateCode(code: number, defaultCode: number): number {
    return code >= 400 && code < 500 ? code : defaultCode;
  }

  static isPNG(fileName: string): boolean {
    return (
      !!fileName &&
      fileName.lastIndexOf(".") !== -1 &&
      fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase() === "png"
    );
  }

  static isObject(value: any): boolean {
    return value && typeof value === "object" && value.constructor === Object;
  }

  static isString(value: any): boolean {
    return typeof value === "string" && value.trim() !== "";
  }

  static isBoolean(value: string): boolean {
    try {
      return typeof JSON.parse(value) === "boolean";
    } catch {
      return false;
    }
  }

  static isValidDomain(email: string, domain: string): boolean {
    if (this.isValidStr(email) && this.isValidStr(domain)) {
      const pattern = new RegExp(`@?(${domain})$`, "i");
      return pattern.test(email);
    }
    return false;
  }

  static isFunction(fn: any): boolean {
    return typeof fn === "function";
  }

  static isUndefined(obj: any): boolean {
    return typeof obj === "undefined";
  }

  static isNumber(value: any): boolean {
    return typeof value === "number";
  }

  static isNaN(value: any): boolean {
    return !/^\d+$/.test(value);
  }

  static isValidNumber(value: any): boolean {
    return this.isNumber(value) && !this.isNaN(value);
  }

  static getParsedValue(value: string): string | number | boolean {
    try {
      if (!value || value.trim() === "") return value;

      const boolValue = value.toLowerCase();

      if (boolValue === "true") return true;
      if (boolValue === "false") return false;

      const num = Number(value);
      if (!Number.isNaN(num)) {
        const numberRegEx = /^\d+(\.\d+)?$/;
        if (numberRegEx.test(value)) return num;
      }
    } catch (err) {
      console.log(
        `getParsedValue:: Error occurred while parsing value: ${value} error: `,
        err
      );
    }

    return value;
  }
}

export default Validators;
