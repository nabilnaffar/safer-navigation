export type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>;
};

// // TS 2.8
// export type DeepRequired<T> = {
//     [P in keyof T]-?: T[P] extends Array<infer U>?Array<DeepRequired<U>>: DeepRequired<T[P]>;
// };

export interface Dictionary {
    [key: string ]: any;
};

const isObject = (obj: any) => obj && typeof obj === 'object';
const hasKey = (obj: object, key: string) => key in obj;

const Undefined: object = new Proxy({}, {
    get: function (target, name) {
        return Undefined;
    }
});

export const either = (val: any, fallback: any) => (val === Undefined ? fallback : val);

export function safe<T extends Dictionary>(obj: T): DeepRequired<T> {
    return new Proxy(obj, {
        get: function (target, name: string) {
            return hasKey(target, name) ?
                (isObject(target[name]) ? safe(target[name]) : target[name]) : Undefined;
        }
    }) as DeepRequired<T>;
}
