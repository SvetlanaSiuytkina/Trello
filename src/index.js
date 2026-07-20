import './style.css';

const columns = ['col-1', 'col-2', 'col-3'];
const columnsTitle = ['TODO', 'IN PROGRESS', 'DONE'];

const getState = () => {
  const saved = localStorage.getItem('trello-state');

  if (!saved) {
    columns.map((id, index) => ({
      id,
      title: columnsTitle[index],
      cards: [],
    }));

    return JSON.parse(saved);
  }

  const saveState = state => {
    localStorage.setItem('trello-state', JSON.stringify(state));
  }

  const boardEl = document.querySelector('.board');
  const cardCreate = (card, index) => {
    const element = document.querySelector('div');
    element.className = 'card';
    element.draggable = true;
    element.dataset.index = index;
    element.dataset.id = card.id;
    element.textContent = card.text;

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'x';

    deleteBtn.addEventListener('click', () => {
      deleteCard(card.id);
    });

    element.appendChild(deleteBtn);
    setupCardDnD(element);
    return element;
  }

  const createColumnForm = columnId => {
    const form = document.createElement('div');
    form.className = 'column-form hidden';
    form.dataset.id = columnId;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-input';
    
    const actions = document.createElement('div');
    actions.className = 'form-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.textContent = 'add';
    addBtn.type = 'button';
    addBtn.addEventListener('click', () => {
      submitCard(form, columnId);
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'x';
    cancelBtn.type = 'button';
    addBtn.addEventListener('click', () => {
      closeForm(form);
    });

    actions.appendChild(addBtn);
    actions.appendChild(cancelBtn);

    form.appendChild(input);
    form.appendChild(actions);
    return form;
  }
}