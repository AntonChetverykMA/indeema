//Task1

const restBtn = document.getElementById('rest-btn');
const sum = document.getElementById('sum');
const price = document.getElementById('price');
const restDisplay = document.getElementById('rest-display');
// const denominations = [1, 5, 10, 25, 50];

function convertToString(rest) {
  if (rest >= 0) {
    const dollars = Math.floor(rest);
    const cents = +rest.toFixed(2).split('.')[1];

    return `Your rest is ${dollars} dollars, ${cents} cents`;
  }

  return 'rest less then 0';
}

function calculateChange() {
  const sumValue = parseFloat(sum.value);
  const priceValue = parseFloat(price.value);
  let rest;

  if (!sumValue || isNaN(sumValue) || !priceValue || isNaN(priceValue)) {
    return;
  } else {
    rest = sumValue - priceValue;
  }

  sum.value = '';
  price.value = '';

  restDisplay.innerHTML = convertToString(rest);

  return convertToString(rest);
}

restBtn.addEventListener('click', calculateChange);

//Task2

const modalContainer = document.querySelector('.modal-container');
const modalBtn = document.getElementById('modal-btn');

modalBtn.onclick = function () {
  modalContainer.innerHTML = `
    <div class="modal">
        <div class="modal_content">
            <button type="button" id="close_modal_window">×</button>
            <p>Content</p>
        </div>
    </div>`;
  const span = document.getElementById('close_modal_window');
  span.addEventListener('click', () => (modalContainer.innerHTML = ''));
};

//Task3

const username = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const tbody = document.querySelector('tbody');
const addBtn = document.getElementById('add-btn');
const editForm = document.getElementById('edit-form');
let isShownEditForm = false;
let users = [
  {
    name: 'Anton',
    surname: 'Chetveryk',
    email: 'chetverykanton92@gmail.com',
    date:
      'Thu Dec 10 2020 12:39:33 GMT+0200 (Восточная Европа, стандартное время)',
  },
];

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function renderUsers() {
  tbody.innerHTML = users
    .map((user) => {
      return `
    <tr>
       <td>
        <span class='td-title'>${user.name}</span>
       </td>
       <td>
        <span class='td-title'>${user.surname}</span>
       </td>
       <td>
        <span class='td-title'>${user.email}</span>
       </td>
       <td>
        <span class='td-title'>${user.date}</span>
       </td>
       <td>
        <button class='delete-btn'>
          X
        </button>
       </td>
       <td>
        <button class='edit-btn'>
          Edit
        </button>
       </td>
   </tr>`;
    })
    .join('');

  const deleteBtns = document.querySelectorAll('.delete-btn');
  const editFormBtns = document.querySelectorAll('.edit-btn');

  users.forEach((user, i) => {
    deleteBtns[i].addEventListener('click', (e) => deleteUser(e, i));
    editFormBtns[i].addEventListener('click', (e) => editUser(e, i));
  });
}

renderUsers();

function addUser() {
  const isValidEmail = validateEmail(email.value);

  if (username.value && surname.value && isValidEmail) {
    const newUser = {
      name: username.value,
      surname: surname.value,
      email: email.value,
      date: new Date(),
    };
    users.push(newUser);
    renderUsers();
    username.value = '';
    surname.value = '';
    email.value = '';
  } else {
    alert('You have not filled in all the fields or your email is not valid');
  }
}

function deleteUser(e, i) {
  users = users.filter((user, index) => index !== i);
  renderUsers();
}

function editUser(e, i) {
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editSurname = document.getElementById('editSurname');
  const newObj = { ...users[i] };

  if (isShownEditForm) {
    editForm.classList.add('hidden');
    isShownEditForm = false;
    if (editName.value) {
      newObj.name = editName.value;
    }
    if (editSurname.value) {
      newObj.surname = editSurname.value;
    }
    if (editEmail.value) {
      newObj.email = editEmail.value;
    }
    users[i] = newObj;
    editName.value = '';
    editSurname.value = '';
    editEmail.value = '';
    renderUsers();
  } else {
    editForm.classList.remove('hidden');
    isShownEditForm = true;
  }
}

addBtn.addEventListener('click', addUser);
sum.addEventListener('click', () => (restDisplay.innerHTML = ''));
price.addEventListener('click', () => (restDisplay.innerHTML = ''));
