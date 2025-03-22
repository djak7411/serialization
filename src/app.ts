export function serialize(arr: number[]) : string{
    return arr.join('\s');
}

export function deserialize(str: string) : number[] {
    return str.split('\s').map(el => parseInt(el));
}

export function createArray(len: number, max: number, min: number, step: number): number[] {
    if(min < 1){
        alert('min should be over than 0, min = 1');
        min = 1;
    }

    if(max > 1000){
        alert('max should be less than 1000, max = 1000');
    }
    
    if(max < min){
        alert('max is less than min, swapping max-min');
        min += max;
        max = min - max;
        min -= max;
    }

    const generatedNumbers : number[] = [];
    
    for(let i : number = 0; i < len; i += step){
        generatedNumbers.push(Math.floor(Math.random() * (max - min + 1) + min));
    }

    return generatedNumbers;
}
