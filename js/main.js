// rikiavimas
// localStorage

const h1DOM = document.querySelector('h1');
// const formDOM = document.querySelector('form');
//trumpinys
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input');
const submitButtonDOM = formDOM.querySelector('button');
const listDOM = document.querySelector('.list');

const toastDOM = document.querySelector('.toast');
const toastTitleDOM = toastDOM.querySelector('.title');
const toastMessageDOM = toastDOM.querySelector('.message');
const toastCloseDOM = toastDOM.querySelector('.close');

toastCloseDOM.addEventListener('click', () => {
    toastDOM.classList.remove('active');
});

// listDOM.textContent = 'eafsgt'

const todoData = [];

submitButtonDOM.addEventListener('click', event => {
    event.preventDefault();

    const validationMsg = isValidText(textInputDOM.value);
    if (validationMsg !== true) {
        toastDOM.classList.add('active');
        toastDOM.dataset.state = 'error';
        toastTitleDOM.textContent = 'Error';
        toastMessageDOM.textContent = validationMsg;

        return;
    }

    todoData.push({
        text: textInputDOM.value.trim(),
        createdAt: Date.now(),
    });
    renderList();

    toastDOM.classList.add('active');
    toastDOM.dataset.state = 'success';
    toastTitleDOM.textContent = 'Success';
    toastMessageDOM.textContent = 'Įrašas sėkmingai sukurtas.';
});

function renderList() {
    if (todoData.length === 0) {
        renderEmptyList();
    } else {
        renderTaskList();
    }
}

function renderEmptyList() {
    listDOM.classList.add('empty');
    listDOM.textContent = 'Empty';
}
function renderTaskList() {
    let HTML = '';

    for (const todo of todoData) {
        HTML += `
        <article class="item">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="text">${todo.text}</div>
                <form class="hidden">
                    <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button>Done</button>
                    <div class="divider"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>`;
    }

    listDOM.innerHTML = HTML;
    listDOM.classList.remove('empty');

    const articlesDOM = listDOM.querySelectorAll('article');

    for (let i = 0; i < articlesDOM.length; i++) {
        const articleDOM = articlesDOM[i];
        const articleEditFormDOM = articleDOM.querySelector('form');
        const updateInputDOM = articleEditFormDOM.querySelector('input');
        const buttonsDOM = articleDOM.querySelectorAll('button');

        const updateDOM = buttonsDOM[0];
        updateDOM.addEventListener('click', event => {
            event.preventDefault();

            const validationMsg = isValidText(updateInputDOM.value);
            if (validationMsg !== true) {
                toastDOM.classList.add('active');
                toastDOM.dataset.state = 'error';
                toastTitleDOM.textContent = 'Error';
                toastMessageDOM.textContent = validationMsg;

                return;
            }

            todoData[i].text = updateInputDOM.value.trim();
            renderTaskList();

            toastDOM.classList.add('active');
            toastDOM.dataset.state = 'success';
            toastTitleDOM.textContent = 'Success';
            toastMessageDOM.textContent = 'Įrašo informacija sėkmingai atnaujinta.';
        });

        const cancelDOM = buttonsDOM[1];
        cancelDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden');


            toastDOM.classList.add('active');
            toastDOM.dataset.state = 'info';
            toastTitleDOM.textContent = 'Info';
            toastMessageDOM.textContent = 'Įrašo informacijos redagavimas baigtas be pakeitimų.';
        });

        const editDOM = buttonsDOM[3];
        editDOM.addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden');
        });

        const deleteDOM = buttonsDOM[4];
        deleteDOM.addEventListener('click', () => {
            // articleDOM.remove();
            todoData.splice(i, 1);
            renderList();

            toastDOM.classList.add('active');
            toastDOM.dataset.state = 'success';
            toastTitleDOM.textContent = 'Success';
            toastMessageDOM.textContent = 'Įrašas sėkmingai ištrintas.';
        });
    }
}

// function formatTime(timeInMs) {

//     // const d = new Date('2000-01-01 1:2:3');    viskas prasideda nuo sios datos
//     const d = new Date();             // rodys si momenta
//     const months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Geguze', 'Birzelis', 'Liepa'];
//     const weekdays = ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis']

//     console.log(d.getFullYear());
//     console.log(d.getMonth(), months[d.getMonth()]);
//     console.log(d.getDay()), weekdays[d.getDay()];
//     console.log(d.getHours());
//     console.log(d.getMinutes());
//     console.log(d.getSeconds());
//     console.log(d.getMilliseconds());
//     console.log(d.getTimezoneOffset());
// }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

function formatTime(timeInMs) {
    const date = new Date(timeInMs);
    const y = date.getFullYear();
    const m = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const d = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const h = date.getHours();
    const mn = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const s = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    return `${y}-${m}-${d} ${h}:${mn}:${s}`;
}

function isValidText(text) {
    if (typeof text !== 'string') {
        return 'Informacija turi būti tekstinė';
    }
    if (text === '') {
        return 'Parašytas tekstas negali būti tuščias';
    }
    if (text.trim() === '') {
        return 'Parašytas tekstas negali būti tik iš tarpų';
    }
    if (text[0].toUpperCase() !== text[0]) {
        return 'Tekstas negali prasidėti mažaje raide';
    }
    return true;
}

// CRUD operations:
// -----------------------------------
// create  array.push({initial data})
// read    array.map()
// update  array[i] = {update data}
// delete  array.splice(i, 1)