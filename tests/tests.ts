// Примеры тестов: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, 
// граничные - все числа 1 знака, все числа из 2х знаков, все числа из 3х знаков, 
// каждого числа по 3 - всего чисел 900.;
import * as assert from 'assert';
import { serialize, deserialize, createArray, createArrayCertain } from "../src/app";

function isCompressionOverHalf(arr: number[]) : boolean {
    const serializedArr: string = serialize(arr);

    return (serializedArr.length / arr.length * 100) <= 50;
}

describe('base', () => {
    it('serialize-deserialize', () => {
        const arr: number[] = [1, 2, 3, 4];
        const serializedArr: string = serialize(arr);
        const deserializedArr: number[] = deserialize(serializedArr);

        assert.deepEqual(arr, deserializedArr);
    });

    it('source array', () => {
        const arr: number[] = createArray(1000, 300, 1);

        assert.equal(Array.isArray(arr), true);
    });

    it('serialized string', () => {
        const arr: number[] = createArray(1000, 300, 1);
        const serializedArr: string = serialize(arr);

        assert.equal(typeof serializedArr, 'string');
    });
});

describe('array', () => {
    it('is up to 1000', () => {
        const arr: number[] = createArray(1000, 300, 1);

        assert.equal(arr.length, 1000);
    });

    it('is 1 to 300', () => {
        const arr: number[] = createArray(1000, 300, 1);
        const isOverThanMin: boolean = Math.min(...arr) >= 1;
        const isLesserThanMax: boolean = Math.max(...arr) <= 300;

        assert.equal(isOverThanMin, true);
        assert.equal(isLesserThanMax, true);
    });
});

describe('functional', () => {
    it('50 numbers', () => {
        const arr: number[] = createArray(50, 300, 1);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('100 numbers', () => {
        const arr: number[] = createArray(100, 300, 1);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('500 numbers', () => {
        const arr: number[] = createArray(500, 300, 1);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('1000 numbers', () => {
        const arr: number[] = createArray(1000, 300, 1);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('numbers with one digit', () => {
        const arr: number[] = createArray(9, 9, 1, 1, false);

        assert.equal(isCompressionOverHalf(arr), true);
    });
    
    it('numbers with two digit', () => {
        const arr: number[] = createArray(99, 99, 10, 1, false);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('numbers with three digit', () => {
        const arr: number[] = createArray(999, 999, 100, 1, false);

        assert.equal(isCompressionOverHalf(arr), true);
    });

    it('numbers with step over 3', () => {
        const arr: number[] = createArray(900, 999, 1, 3, false);

        assert.equal(isCompressionOverHalf(arr), true);
    });
});