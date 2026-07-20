import { getState, saveState, renderBoard } from './trello.js';

export const createColumnForm = (colummId) => {
  const form = document.createElement('div');
  form.className = 'column-form';
  form.dataset.id = colummId; 

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'task-input';
  input.placeholder = 'Enter a title for this card...';

  const action = document.createElement('div');
  action.className = 'form-actions';

  const addBtn = document.createElement('button');
  addBtn.className = 'add-btn';
  addBtn.textContent = 'Add card';
  addBtn.type = 'button';
  addBtn.addEventListener('click', () => submitCard(form, colummId));

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancel-btn';
  cancelBtn.textContent = 'x';
  cancelBtn.type = 'button';
  cancelBtn.addEventListener('click', () => closeForm(form));

  action.appendChild(addBtn);
  action.appendChild(cancelBtn);

  form.appendChild(input);
  form.appendChild(action);
  
  return form;
}

const submitCard = (formEl, colummId) => {
  const input = formEl.querySelector('.task-input');
  const text = input.value.trim();

  if (!text) return;

  let state = getState();
  const column = state.find(col => col.id === colummId);

  if (column) {
    const newCard = { id: Date.now().toString, text };
    column.cards.push(newCard);
    saveState(state);
    input.value = '';

    const boardEl = document.querySelector('.board');
    renderBoard(boardEl);
  }
}

const closeForm = (formEl) => {
  formEl.classList.add('hidden');
}