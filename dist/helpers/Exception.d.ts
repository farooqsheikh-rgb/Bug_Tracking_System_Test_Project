export default class Exception extends Error {
    code: number;
    reportError?: boolean;
    meta: Record<string, any>;
    constructor(message: string, code?: number, meta?: Record<string, any>);
    toJson(): Record<string, any>;
}
//# sourceMappingURL=Exception.d.ts.map