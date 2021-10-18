import Modal from '../Modal';

const modal = new Modal(document.body);
document.body.insertAdjacentHTML(
  'afterbegin', `<h1>Whack the goblin</h1>
                <div class="control">
                  <div class="control_wins">Количество попаданий: <span>0</span></div>
                  <div class="control_miss">Количество промахов: <span>0</span></div>
                </div>
                `,
);
const html = `<div id="popup" class="popup">
               <div class="popup__body">
                 <div class="popup__content">
                   <h2 class="popup__title">К сожалению, вы проиграли...</h2>
                   <div class="popup__button">
                     <div class="popup__button_content">Навая игра</div>
                   </div>
                 </div>
               </div>
              </div>`;

test('Метод insertToDOM должен вставить html-разметку в DOM', () => {
  modal.insertToDOM(html);
  expect(document.querySelector('.popup').className).toBe('popup');
});

test('Метод showGameOver должен добавить в popup класс open', () => {
  modal.showGameOver();
  expect(document.querySelector('.popup').className).toBe('popup open');
});

test('Метод hideGameOver должен удалить из popup класс open', () => {
  modal.hideGameOver();
  expect(document.querySelector('.popup').className).toBe('popup');
});

test('Метод insertResultToModal должен вставить в попап html-разметку', () => {
  modal.insertResultToModal();
  expect(document.querySelector('.popup__content').children[1].className).toBe('control');
});