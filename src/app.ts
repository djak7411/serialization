import { createArray, deserialize, serialize } from './utils';

const addCSS = (css: any) => document.head.appendChild(document.createElement("style")).innerHTML = css;

addCSS(`
        pre {
            margin: 16px;
            word-break: break-all;
            max-width: 100%;
            overflow: auto;
        }
        div {
            display: flex;
            padding: 8px;
            flex-direction: column;
        }
        button{
            height: 42px;
        }
    `);

const htmlTemplate = `
        <div class="inputs-container">
            <p>
                Need step over 3? 
                <input type="checkbox" id="step-three"/>
            </p>
            <p>
                Numbers count: 
                <input type="number" id="count" min="1" max="1000" />
            </p>
            <button id="serialize">Serialize!</button>
        </div>
        <hr/>
        Source: <pre class="source-row"></pre>
        Serialized: <pre class="serialized-row"></pre>
        Deserialized: <pre class="deserialized-row"></pre>
        <hr/>
    `;

document.addEventListener('DOMContentLoaded', () => {
    const arr: number[] = createArray(9, 9, 1, 1);

    document.body.innerHTML = htmlTemplate;

    document.querySelector('#serialize')?.addEventListener('click', () => {
        const pres: NodeListOf<HTMLPreElement> = document.querySelectorAll('pre');
        const source: HTMLElement = pres[0];
        const serialized: HTMLElement = pres[1];
        const deserialized: HTMLElement = pres[2];
        const numbersCountInput: HTMLInputElement = document.querySelector('#count') as HTMLInputElement;
        const isStepOverThree: boolean = (document.querySelector('#step-three') as HTMLInputElement).checked;

        let arr: number[] = [];
        if(!isStepOverThree){
            arr =  createArray(parseInt(numbersCountInput!.value), 300, 1);
        }else {
            arr = createArray(900, 300, 1, 3, false);
        }
        const serializedData = serialize(arr); 
    
        source.innerHTML = arr.toString();
        serialized.innerHTML = serializedData;
        deserialized.innerHTML = deserialize(serializedData).toString();
    });
});