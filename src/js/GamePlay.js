import Modal from './Modal';

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.cells = [];
    this.goblinPosition = null;
    this.countWins = null;
    this.countMiss = null;
    this.modal = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
    this.modal = new Modal(container);
  }

  drawBoard() {
    this.checkBinding();
    this.modal.insertToDOM(Modal.gameOver());
    this.container.innerHTML = `<h1>Whack the goblin</h1>
                                <div class="control">
                                  <div class="control_wins">Количество попаданий: <span>0</span></div>
                                  <div class="control_miss">Количество промахов: <span>0</span></div>
                                </div>
                                `;
    this.countWins = this.container.querySelector('.control_wins span');
    this.countMiss = this.container.querySelector('.control_miss span');
    const board = document.createElement('div');
    board.className = 'board';
    const cellSize = `calc(80vh / ${this.boardSize})`;
    board.style.gridTemplateColumns = `repeat(${this.boardSize}, ${cellSize}`;
    board.style.gridTemplateRows = `repeat( ${this.boardSize}, ${cellSize}`;
    const cell = '<div class="cell"></div>';

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      board.innerHTML += cell;
    }

    this.cells = [...board.children];
    this.container.appendChild(board);
    this.listner = (event) => this.onCellClick(event);
  }

  getRandomIndex() {
    const index = Math.floor(Math.random() * this.boardSize ** 2);
    if (index === this.goblinPosition) {
      return this.getRandomIndex();
    }

    return index;
  }

  addGoblinPosition() {
    this.goblinPosition = this.getRandomIndex();
    this.cells[this.goblinPosition].classList.add('goblin');
  }

  deleteGoblinPosition() {
    this.cells[this.goblinPosition].classList.remove('goblin');
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}