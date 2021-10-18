export default class Modal {
  constructor(container) {
    this.container = container;
    this.popup = null;
  }

  static gameOver() {
    return `<div id="popup" class="popup">
              <div class="popup__body">
                <div class="popup__content">
                  <h2 class="popup__title">К сожалению, вы проиграли...</h2>
                  <div class="popup__button">
                    <div class="popup__button_content">Навая игра</div>
                  </div>
                </div>
              </div>
            </div>`;
  }

  insertToDOM(htmlString) {
    this.container.insertAdjacentHTML('afterend', htmlString);
    this.popup = document.getElementById('popup');
  }

  showGameOver() {
    this.popup.classList.add('open');
  }

  hideGameOver() {
    this.popup.classList.remove('open');
  }

  insertResultToModal() {
    const hits = document.querySelector('.control_wins span').textContent;
    const misses = document.querySelector('.control_miss span').textContent;
    const element = `<div class="control">
                       <div class="control_wins">Количество попаданий: <span>${hits}</span></div>
                       <div class="control_miss">Количество промахов: <span>${misses}</span></div>
                     </div>`;
    this.popup.querySelector('.popup__title').insertAdjacentHTML('afterend', element);
  }
}