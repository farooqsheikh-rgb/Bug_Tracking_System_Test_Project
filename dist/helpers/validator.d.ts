declare class Validators {
    static isValidStr(str: string): boolean;
    static isValidDate(date: string | number | Date): boolean;
    static isValidSSN(ssn: string): boolean;
    static isValidFloat(number: string): boolean;
    static isValidateEmail(email: string): boolean;
    static isValidateUserType(userType: string): boolean;
    static isValidJSON(str: any): boolean;
    static isValidPassword(password: string): boolean;
    static getParsedJson(data: any): any | null;
    static propExists(key: string, obj: object): boolean;
    static isArray(variable: any): boolean;
    static parseInteger(value: any, defaultValue: number): any;
    static validateCode(code: number, defaultCode: number): number;
    static isPNG(fileName: string): boolean;
    static isObject(value: any): boolean;
    static isString(value: any): boolean;
    static isBoolean(value: string): boolean;
    static isValidDomain(email: string, domain: string): boolean;
    static isFunction(fn: any): boolean;
    static isUndefined(obj: any): boolean;
    static isNumber(value: any): boolean;
    static isNaN(value: any): boolean;
    static isValidNumber(value: any): boolean;
    static getParsedValue(value: string): string | number | boolean;
}
export default Validators;
//# sourceMappingURL=validator.d.ts.map