import { getState, saveState, renderBoard } from './trello.js';
import { setupCardDnD } from './cardNew.js' 

export const createCardElement = (cardData, columnId) => {
  const element = document.createElement('div');
  element.className = 'card';
  element.draggable = true;
  element.dataset.id = cardData.id;
  element.dataset.column = columnId;
  element.textContent = cardData.text;
  element.style.cursor = 'grab';

  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'x';
  deleteBtn.style.marginLeft = '8px';
  deleteBtn.style.cursor = 'pointer';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteCard(cardData.id, columnId);
  });

  element.appendChild(deleteBtn);
  setupCardDnD(element);

  return element;
};

export const deleteCard = (cardId, columnId) => {
  let state = getState();
  const column = state.find(col => col.id === columnId);

  if (column) {
    column.cards = column.cards.filter(card => card.id !== cardId);
    saveState(state);

    const boardEl = document.querySelector('.board');
    renderBoard(boardEl);
  }
};
