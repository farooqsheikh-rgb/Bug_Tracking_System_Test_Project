export class Validators {
  static isValidStr(str: string): boolean {
    if (!str) {
      return false;
    }

    return typeof str === "string" && str.trim() !== "";
  }

  static parseInteger(value: any, defaultValue: number) {
    try {
      value = parseInt(value, 10);

      return Number.isNaN(value) ? defaultValue : value;
    } catch (ex) {
      return defaultValue;
    }
  }
}
