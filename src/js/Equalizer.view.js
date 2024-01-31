import createTag from './helpers/createTag';
import EqualizerController from './Equalizer.controller';

class EqualizerView {
  #root = document.getElementById('app');
  #cellsX;
  #cellsY;
  #controller;

  constructor(cellsX, cellsY) {
    this.#cellsX = cellsX;
    this.#cellsY = cellsY;
    this.#controller = new EqualizerController(this.#cellsX, this.#cellsY);
  }

  #renderGrid() {
    const wrapper = createTag('section', ['equilizer__wrapper'], this.#root);

    for (let i = 0; i < this.#cellsY; i += 1) {
      const row = createTag('div', ['row'], wrapper);

      for (let j = 0; j < this.#cellsX; j += 1) {
        createTag('div', ['cell'], row);
      }
    }
  }

  #renderControls() {
    const cells = document.querySelectorAll('.cell');
    const audio = createTag('audio', ['audio'], this.#root, {
      controls: true,
      onplay: (e) => this.#controller.handlePlay(e, cells),
      onpause: (e) => this.#controller.handlePause(e),
    });

    createTag('input', ['input'], this.#root, {
      type: 'file',
      onchange: (e) => this.#controller.getAudioSource(e, audio),
    });
  }

  #render() {
    this.#renderGrid();
    this.#renderControls();
  }

  init() {
    this.#render();
  }
}

export default EqualizerView;
