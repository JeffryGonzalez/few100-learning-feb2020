
import './styles.css';
import { add } from './math';

const num1Element = document.getElementById('num1') as HTMLInputElement;
const num2Element = document.getElementById('num2') as HTMLInputElement;
const addButton = document.getElementById('add') as HTMLButtonElement;
const answerElements = document.getElementById('answer') as HTMLElement;

addButton.addEventListener('click', function () {
    const a = num1Element.valueAsNumber;
    const b = num2Element.valueAsNumber;

    const sum = add(a, b);

    answerElements.innerText = sum.toString();
});




