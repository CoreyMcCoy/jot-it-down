const addItems = document.querySelector('.add-items');
const inputItems = document.querySelector('.item-input');
const itemList = document.querySelector('.notebook');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    if (inputItems.value === '') return;
    const text = this.querySelector('input[name=item]').value;
    const item = {
        text,
        done: false,
        remove: false,
    };
    items.push(item);
    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(ideas = [], ideasList) {
    ideasList.innerHTML = ideas
        .map((idea, i) => {
            return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${idea.done ? 'checked' : ''}>
        <label for="item${i}">${idea.text}</label>
        <button data-index=${i} class="remove-button${i}" id="btn" name="remove" ${idea.remove ? 'true' : ''} >
        <i class="fas fa-times"></i>
        </button>
        </li>
        `;
        })
        .join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemList);
}

function removeItem(e) {
    if (!e.target.matches('button')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].remove = !items[index].remove;
    removeFromLocalStorage(items[index]);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemList);
}

// This function is called inside removeItem(e). It removes an item from local storage
function removeFromLocalStorage(item) {
    items.splice(items.indexOf(item), 1);
    localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone);
itemList.addEventListener('click', removeItem);
populateList(items, itemList);
