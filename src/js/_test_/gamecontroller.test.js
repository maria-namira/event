import GameController from '../GameController';
import GamePlay from '../GamePlay';

const testPlay = new GamePlay();
document.body.innerHTML = '<div id="game-container"></div>';
testPlay.bindToDOM(document.getElementById('game-container'));
testPlay.drawBoard();
testPlay.boardSize = 4;
const testCtrl = new GameController(testPlay);

test('При клике на container должен вызываться метод onCellClick', () => {
  testCtrl.onCellClick = jest.fn();
  testCtrl.addOnCellClickListner();
  testPlay.container.dispatchEvent(new Event('click'));
  expect(testCtrl.onCellClick).toHaveBeenCalled();
});

test('При клике на кнопку "new game" должен вызываться метод onNewGameClick', () => {
  testCtrl.onNewGameClick = jest.fn();
  testPlay.modal.showGameOver();
  testCtrl.addOnNewGameClickListner();
  testCtrl.newGame.dispatchEvent(new Event('click'));
  expect(testCtrl.onNewGameClick).toHaveBeenCalled();
});

test('Метод checkWin должен вызывать колбеки', () => {
  testPlay.modal.insertResultToModal = jest.fn();
  testPlay.modal.showGameOver = jest.fn();
  testCtrl.addOnNewGameClickListner = jest.fn();
  testPlay.container.removeEventListener = jest.fn();
  testPlay.countMiss.textContent = '5';
  testCtrl.checkWin();
  expect(testPlay.modal.insertResultToModal).toHaveBeenCalled();
  expect(testPlay.modal.showGameOver).toHaveBeenCalled();
  expect(testCtrl.addOnNewGameClickListner).toHaveBeenCalled();
  expect(testPlay.container.removeEventListener).toHaveBeenCalled();
  expect(clearInterval).toHaveBeenCalled();
});

jest.useFakeTimers();
test('Метод goblinInterval должен вызывать setInterval', () => {
  testCtrl.goblinInterval(1000);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('Метод init должен вызывать колбеки', () => {
  testPlay.drawBoard = jest.fn();
  testCtrl.addOnCellClickListner = jest.fn();
  testCtrl.goblinInterval = jest.fn();
  testCtrl.init();
  expect(testPlay.drawBoard).toHaveBeenCalled();
  expect(testCtrl.addOnCellClickListner).toHaveBeenCalled();
  expect(testCtrl.goblinInterval).toHaveBeenCalled();
});