import { safe, either } from './safe';
describe('safe navigation tests', () => {
    interface A {
        a?: {
            b?: {
                c?: {
                    d?: string
                }
            }
        },
        b: boolean,
        c?: {
            d: {
                e: number
            }
        },
        d?: Array<{ e: boolean }>
    }
    const obj: A = { b: false };
    const saferObj = safe(obj);

    it('should work for nested optional objects', () => {
        expect(either(saferObj.a.b.c.d, null)).toEqual(null);
        expect(either(saferObj.a.b.c.d, undefined)).toEqual(undefined);
        expect(either(saferObj.a.b.c.d, 322)).toEqual(322);
    });

    it('should work for required members', () => {
        expect(either(saferObj.b, null)).toEqual(false);
    });

    it('should work for mixed optional/required tree', () => {
        expect(either(saferObj.c.d.e, null)).toEqual(null);
    });

    it('should work for arrays', () => {
        expect(either(saferObj.d[70].e, null)).toEqual(null);

        const b: Array<{ c: number }> = [];
        const saferB = safe(b);
        expect(either(saferB[70].c, null)).toEqual(null);
    });
});