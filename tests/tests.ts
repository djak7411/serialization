// Примеры тестов: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, 
// граничные - все числа 1 знака, все числа из 2х знаков, все числа из 3х знаков, 
// каждого числа по 3 - всего чисел 900.;
import * as assert from 'assert';
import { serialize, deserialize, createArray } from "../src/utils";

function isCompressionOverHalf(arr: number[]) : any {
    const serializedArr: string = serialize(arr);
    
    return { comp: 100 - (serializedArr.length / arr.toString().length) * 100 >= 50, message: `compression: ${100 - (serializedArr.length / arr.toString().length) * 100}` };
}

function checkSerDes(arr: number []){
        const serializedArr: string = serialize(arr);
        const deserializedArr: number[] = deserialize(serializedArr);

        assert.deepEqual(arr, deserializedArr);
}

describe('base', () => {
    it('serialize-deserialize', () => {
        checkSerDes([1, 2, 3, 4]);
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
        //const isHalfComp = isCompressionOverHalf(arr);
        //assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('100 numbers', () => {
        const arr: number[] = createArray(100, 300, 1);
        //const isHalfComp = isCompressionOverHalf(arr);
       //assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('500 numbers', () => {
        const arr: number[] = createArray(500, 300, 1);
        const isHalfComp = isCompressionOverHalf(arr);
        assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('1000 numbers', () => {
        const arr: number[] = createArray(1000, 300, 1);
        const isHalfComp = isCompressionOverHalf(arr);
        assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('numbers with one digit', () => {
        const arr: number[] = createArray(9, 9, 1, 1, false);
        //const isHalfComp = isCompressionOverHalf(arr);
        //assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });
    
    it('numbers with two digit', () => {
        const arr: number[] = createArray(99, 99, 10, 1, false);
        //const isHalfComp = isCompressionOverHalf(arr);
        //assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('numbers with three digit', () => {
        const arr: number[] = createArray(999, 300, 100, 1, false);
        //const isHalfComp = isCompressionOverHalf(arr);
        //assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });

    it('numbers with step over 3', () => {
        const arr: number[] = createArray(900, 300, 1, 3, false);
        const isHalfComp = isCompressionOverHalf(arr);
        assert.equal(isHalfComp.comp, true, isHalfComp.message);
        checkSerDes(arr);
    });
});