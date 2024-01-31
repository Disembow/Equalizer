import createTag from './helpers/createTag';
import EqualizerController from './Equalizer.controller';

class EqualizerView {
  constructor(cellsX, cellsY) {
    this.cellsX = cellsX;
    this.cellsY = cellsY;
    this.controller = new EqualizerController(this.cellsX, this.cellsY);
  }

  #root = document.getElementById('app');

  #renderGrid() {
    const wrapper = createTag('section', ['equilizer__wrapper'], this.#root);

    for (let i = 0; i < this.cellsY; i += 1) {
      const row = createTag('div', ['row'], wrapper);

      for (let j = 0; j < this.cellsX; j += 1) {
        createTag('div', ['cell'], row);
      }
    }
  }

  #render() {
    this.#renderGrid();

    createTag('audio', ['audio'], this.#root, {
      controls: true,
      onplay: (e) => this.controller.handlePlay(e),
      onpause: (e) => this.controller.handlePause(e),
    });

    createTag('input', ['input'], this.#root, {
      type: 'file',
      onchange: () => this.controller.getAudioSource(),
    });
  }

  init() {
    this.#render();
  }
}

export default EqualizerView;
