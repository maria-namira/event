import GameController from './GameController';
import GamePlay from './GamePlay';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.getElementById('game-container'));

const gameCtrl = new GameController(gamePlay);
gameCtrl.init();