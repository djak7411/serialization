interface IPreserialized extends Array<string[][]>{
    0: string[][],
    1: string[][],
    2: string[][]
}

const symMap : Record<string, number> = {
    '$': 0,
    '%': 10,
    '^': 20,
    '&': 30,
    '*': 40,
    '(': 50,
    ')': 60,
    '_': 70,
    '+': 80,
    '=': 90,
    '@': 100,
    '#': 200,
    'n': 300,
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

export function serialize(arr: number[]) : string {
    const preparedArr: IPreserialized = [
        [
            ['$'],
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
            ['@', '$'],
            //['$'],
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
            ['#', '$'],
            //['$'],
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

    preparedArr.forEach((hundreds, hInx) => {
        hundreds.forEach((tens, tInx) => {
            if(hInx > 0 && tInx === 0){
                return;
            }
            if((tens.length <= 1)){
                hundreds.splice(hundreds.indexOf(tens), 1, []);
            }
        })
        console.log(hundreds)
    })

    return (preparedArr[0].join(',') + preparedArr[1].join(',') + preparedArr[2].join(',')).replace(/\,/g, '');
}

export function deserialize(str: string) : number[] {
    const arr : number[] = []; 
    let currentHundreds : number = 0;
    let currentTens : number = 0;

    for(let i : number = 0; i < str.length; i++){
        
        if(['@', '#'].includes(str[i])){
            currentHundreds = symMap[str[i]];
            continue;
        }else if(Object.keys(symMap).includes(str[i])){
            currentTens = symMap[str[i]];
        }

        if(isNaN(parseInt(str[i]) + currentHundreds + currentTens)){
            continue;
        } 
        arr.push(parseInt(str[i]) + currentHundreds + currentTens);
    }
    
    return arr;
}
