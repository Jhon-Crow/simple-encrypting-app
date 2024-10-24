let textTextarea = document.getElementById('input-text');
let keyTextarea = document.getElementById('key');
const outputTextarea = document.getElementById('output');
const keygenButton = document.getElementById('keygen');
const encryptButton = document.getElementById('encrypt');
const decipherButton = document.getElementById('decipher');
const baseString = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}:<>?,./;[]|~123456789';

function numToLetter(randomNum) {
    return baseString[randomNum % baseString.length];
}

function getRandomNum() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
}

function getRandomLetter(){
    return numToLetter(getRandomNum());
}

function getKey(length){
    let outputStr = '';
    for (let i = 0; i < length; i++){
        outputStr+=getRandomLetter();
    }
    return outputStr;
}

const putTo = (elem) => (toPutItem) => elem.value = toPutItem;
const putToKeyArea = putTo(keyTextarea);
const putToOutArea = putTo(outputTextarea);
const putKeyToKeyArea = () => putToKeyArea(getKey(textTextarea.value.length));
const putEncryptedToOutArea = () => putToOutArea(strFullEncryption());
const putDeciphetionToOutArea = () => putToOutArea(strFullDeciphetion());

keygenButton.addEventListener('click', putKeyToKeyArea);

const encrypt = (str) => (key) => {
    let outStr = '';
    for (let i = 0; i < str.length; i++) {
        let strIndex = baseString.indexOf(str[i]);
        let keyIndex = baseString.indexOf(key[i % key.length]);
        let outIndex = (strIndex + keyIndex) % baseString.length;
        outStr += baseString[outIndex];
    }
    return outStr;
};

const decipher = (outStr) => (key) => {
    let originalStr = '';
    for (let i = 0; i < outStr.length; i++) {
        let outIndex = baseString.indexOf(outStr[i]);
        let keyIndex = baseString.indexOf(key[i % key.length]);
        let originalIndex = (outIndex - keyIndex + baseString.length) % baseString.length;
        originalStr += baseString[originalIndex];
    }
    return originalStr;
};

const strFullEncryption = () => encrypt(textTextarea.value)(keyTextarea.value);
const strFullDeciphetion = () => decipher(textTextarea.value)(keyTextarea.value)

encryptButton.addEventListener('click', putEncryptedToOutArea);
decipherButton.addEventListener('click', putDeciphetionToOutArea);