import { renderBoard } from './js/trello.js';
import './css/style.css';

const boardEl = document.querySelector('.board');

if (boardEl) {
  renderBoard(boardEl);
}