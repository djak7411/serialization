interface IPreserialized extends Array<string[][]>{
    0: string[][],
    1: string[][],
    2: string[][]
}

function pushByTens(val: number, arr: string[][]) : Function[]{
    return [
        () => arr[0].push(val.toString()),
        () => arr[1].push(val.toString()),
        () => arr[2].push(val.toString()),
        () => arr[3].push(val.toString()),
        () => arr[4].push(val.toString()),
        () => arr[5].push(val.toString()),
        () => arr[6].push(val.toString()),
        () => arr[7].push(val.toString()),
        () => arr[8].push(val.toString()),
        () => arr[9].push(val.toString()),
        () => arr[10].push(val.toString()),
    ]
}

export function serialize(arr: number[]) : string {
    const preparedArr: IPreserialized = [
        [
            ['!$'],
            ['%'],
            ['^'],
            ['&'],
            ['*'],
            ['('],
            [')'],
            ['_'],
            ['+'],
            ['=']
        ],
        [
            ['@$'],
            ['%'],
            ['^'],
            ['&'],
            ['*'],
            ['('],
            [')'],
            ['_'],
            ['+'],
            ['=']
        ],
        [
            ['#$'],
            ['%'],
            ['^'],
            ['&'],
            ['*'],
            ['('],
            [')'],
            ['_'],
            ['+'],
            ['='],
            ['n']
        ]
    ];

    arr.sort((a, b) => a - b);
    try{
        for(let i: number = 0; i < arr.length; i++){

            if(arr[i] > 0 && arr[i] < 100){
                pushByTens(arr[i] % 10, preparedArr[0])[Math.floor(arr[i] / 10)]();
            }
            if(arr[i] > 99 && arr[i] < 200){
                pushByTens(arr[i] % 100 % 10, preparedArr[1])[Math.floor((arr[i] - 100) / 10)]();
            }
            if(arr[i] > 199 && arr[i] <= 300){
                pushByTens(arr[i] % 200 % 10, preparedArr[2])[Math.floor((arr[i] - 200) / 10)]();
            }
        }
    }catch(e){
        console.log(e);
        debugger;
    }
    // Array(preparedArr[0]).forEach(el => {
    //     el[0].forEach(strings => {
    //         if(strings.length === 1){
    //             el[0].splice(Array.prototype.indexOf(strings), 1)
    //         }
    //     })
    // });
    // Array(preparedArr[1]).forEach(el => {
    //     el[0].forEach(strings => {
    //         if(strings.length === 1){
    //             el[0].splice(Array.prototype.indexOf(strings), 1);
    //         }
    //     })
    // });
    // Array(preparedArr[2]).forEach(el => {
    //     el[0].forEach(strings => {
    //         if(strings.length === 1){
    //             el[0].splice(Array.prototype.indexOf(strings), 1);
    //         }
    //     })
    // });
        

    return (preparedArr[0].join(',') + preparedArr[1].join(',') + preparedArr[2].join(',')).replace(/\,/g, '');
}

export function deserialize(str: string) : number[] {
    const arr : number[] = [];
    const splittedStr = str.split('\,');
    for(let i : number = 0; i < splittedStr.length; i++){
        // if(splittedStr[i] === ',')
        //     continue
        arr.push(splittedStr[i].charCodeAt(0));
    }
    return arr;
}

export function createArray(len: number, max: number, min: number, step: number = 1, needRandom: boolean = true): number[] {
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
    if(needRandom){
        for(let i : number = 0; i < len; i += step){
            generatedNumbers.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
    }else{
        for(let i : number = min; i <= max; i += 1){
            generatedNumbers.push(i);
            generatedNumbers.push(i);
            generatedNumbers.push(i);
        } 
    }

    return generatedNumbers;
}
