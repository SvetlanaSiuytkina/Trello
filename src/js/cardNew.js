import { getState, saveState, renderBoard } from './trello.js';

export const setupCardDnD = (cardElement) => {
  let dragStartIndex = null;
  let draggedCard = null;

  cardElement.addEventListener('dragstart', (e) => {
    draggedCard = cardElement;
    cardElement.classList.add('dragging');

    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.dataTransfer.setDragImage(cardElement, x, y); //крточка под курсором
  });
  
  cardElement.addEventListener('dragend', () => {
    cardElement.classList.remove('dragging');
    draggedCard = null;
  });

  const allCards = document.querySelectorAll('.card');
  allCards.forEach((c) => {
    c.addEventListener('dragover', (e) => {
      e.preventDefault();
      const current = c;
      const dragged = draggedCard;

      if (current !== dragged) {
        current.parentNode.insertBefore(dragged, current);
      }
    });
  });
  
  const columns = document.querySelectorAll('.column');
  columns.forEach((col) => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    col.addEventListener('drop', (e) => {
      const colId = col.dataset.id;
      const state = getState();
      const column = state.find((c) => c.id === colId);
      if (!column || !draggedCardEl) return;

      const cardId = draggedCardEl.dataset.id;
      // удаля из старой колонки
      state.forEach((c) => {
        c.cards = c.cards.filter((card) => card.id !== cardId);
      });
      
      column.cards.push({ id: cardId, text: draggedCardEl.textContent.trim() });
      saveState(state);

      const boardEl = document.querySelector('.board');
      renderBoard(boardEl);
    });
  });
}