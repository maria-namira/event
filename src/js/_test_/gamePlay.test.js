import GamePlay from '../GamePlay';

const testGame = new GamePlay();
document.body.innerHTML = '<div id="game-container"></div>';
testGame.boardSize = 4;

test('Метод bindToDOM должен выбросить ошибку', () => {
  expect(() => testGame.bindToDOM(null)).toThrowError(new Error('container is not HTMLElement'));
});

test('Метод drawBoard создает html-разметку', () => {
  testGame.bindToDOM(document.getElementById('game-container'));
  testGame.drawBoard();
  expect(testGame.container.firstElementChild.tagName).toBe('H1');
  expect(testGame.container.firstElementChild.textContent).toBe('Whack the goblin');
  expect(testGame.container.children[1].className).toBe('control');
  expect(testGame.container.children[2].children.length).toBe(testGame.boardSize ** 2);
  expect(testGame.container.children[1].lastElementChild.tagName).toBe('DIV');
  expect(testGame.container.children[1].children[0].className).toBe('control_wins');
  expect(testGame.container.children[1].children[1].className).toBe('control_miss');
  expect(document.body.lastElementChild.className).toBe('popup');
});

test('Метод drawBoard должен выбросить ошибку', () => {
  testGame.container = null;
  expect(() => testGame.drawBoard()).toThrowError(new Error('GamePlay not bind to DOM'));
});

test('Метод addGoblinPosition должен добавить класс goblin элементу', () => {
  testGame.addGoblinPosition();
  expect(testGame.cells[testGame.goblinPosition].className).toBe('cell goblin');
});

test('Метод deleteGoblinPosition должен удалить класс goblin', () => {
  testGame.deleteGoblinPosition();
  expect(testGame.cells[testGame.goblinPosition].className).toBe('cell');
});

test('Метод checkBinding должен выбросить ошибку', () => {
  testGame.container = null;
  expect(() => testGame.checkBinding()).toThrowError(new Error('GamePlay not bind to DOM'));
});