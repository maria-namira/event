export default class GameController {
  constructor(gameplay) {
    this.gameplay = gameplay;
    this.timetId = null;
    this.newGame = null;
  }

  init() {
    this.gameplay.drawBoard();
    this.addOnCellClickListner();
    this.goblinInterval(1000);
  }

  goblinInterval(interval) {
    this.timetId = setInterval(() => {
      if (this.gameplay.goblinPosition !== null) {
        this.gameplay.deleteGoblinPosition();
      }
      this.gameplay.addGoblinPosition();
    }, interval);
  }

  addOnCellClickListner() {
    this.onCellListner = (event) => this.onCellClick(event);
    this.gameplay.container.addEventListener('click', this.onCellListner);
  }

  addOnNewGameClickListner() {
    this.newGame = document.querySelector('.popup__button_content');
    this.onNewGameListner = () => this.onNewGameClick();
    this.newGame.addEventListener('click', this.onNewGameListner);
  }

  onNewGameClick() {
    this.gameplay.modal.hideGameOver();
    this.newGame.removeEventListener('click', this.onNewGameListner);
    this.init();
  }

  onCellClick(event) {
    this.gameplay.cells.forEach((e) => {
      e.classList.remove('custom_goblin');
    });
    if (event.target.classList.contains('goblin')) {
      event.target.classList.add('custom_goblin');
      setTimeout(() => {
        event.target.classList.remove('custom_goblin');
      }, 300);
      this.gameplay.countWins.textContent = +this.gameplay.countWins.textContent + 1;
      event.target.classList.remove('goblin');
    } else {
      this.gameplay.countMiss.textContent = +this.gameplay.countMiss.textContent + 1;
      event.target.classList.add('custom');
      setTimeout(() => {
        event.target.classList.remove('custom');
      }, 300);
    }
    this.checkWin();
  }

  checkWin() {
    if (this.gameplay.countMiss.textContent === '5') {
      this.gameplay.modal.insertResultToModal();
      this.gameplay.modal.showGameOver();
      this.addOnNewGameClickListner();
      clearInterval(this.timetId);
      this.gameplay.container.removeEventListener('click', this.onCellListner);
    }
  }
}