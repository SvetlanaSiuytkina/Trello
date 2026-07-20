import { createCardElement } from './card.js';
import { createColumnForm } from './column.js';


const columns = ['col-1', 'col-2', 'col-3'];
const columnsTitle = ['TODO', 'IN PROGRESS', 'DONE'];

export const getState = () => {
  const saved = localStorage.getItem('trello-state');
  
  if (saved) return JSON.parse(saved);

  const initialState = columnsTitle.map((id, index) => ({
    id,
    title: columnsTitle[index],
    cards: []
  }));
  
  saveState(initialState);
  return initialState;
};

export const saveState = (state) => {
  localStorage.setItem('trello-state', JSON.stringify(state));
};

export const renderBoard = (boardEl) => {
  boardEl.innerHTML = '';
  const state = getState();
  
  state.forEach(column => {
    const colContainer = document.createElement('div');
    colContainer.className = 'column';
    colContainer.dataset.id = column.id;

    const colTitle = document.createElement('div');
    colTitle.className = 'column-title';
    colTitle.textContent = column.title;
    colContainer.appendChild(colTitle);

    column.cards.forEach(card => {
      colContainer.appendChild(createCardElement(card, column.id));
    });
    
    colContainer.appendChild(createColumnForm(column.id));
    boardEl.appendChild(colContainer);
  });
};