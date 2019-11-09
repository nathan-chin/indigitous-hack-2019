let clickCount = 1;

document.querySelector('img').onclick = function() {
    alert('Yeet #' + count);
    clickCount++;
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('Please enter your name:');
    if (!myName || myName === null) {
        localStorage.removeItem('name');
        myHeading.textContent = 'Heading 1';
    } else {
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Heading 1 / ' + myName;
    }
}

myButton.onclick = function() {
    setUserName();
}

if (localStorage.getItem('name')) {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Heading 1 / ' + storedName;
}