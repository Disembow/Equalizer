import createTag from './helpers/createTag';
import EqualizerController from './Equalizer.controller';

class EqualizerView {
  #controller = new EqualizerController();
  #root = document.getElementById('app');
  #cellsX = 6;
  #cellsY = 6;

  #renderGrid() {
    const wrapper = createTag('section', ['equilizer__wrapper'], this.#root);

    for (let i = 0; i < this.#cellsY; i += 1) {
      const row = createTag('div', ['row'], wrapper);

      for (let j = 0; j < this.#cellsX; j += 1) {
        createTag('div', ['cell'], row);
      }
    }
  }

  #render() {
    this.#renderGrid();

    createTag('audio', ['audio'], this.#root, {
      controls: true,
      onplay: () => this.#controller.handlePlay(),
      onpause: () => this.#controller.handlePause(),
    });
    createTag('input', ['input'], this.#root, {
      type: 'file',
      onchange: () => this.#controller.getAudioSource(),
    });
  }

  init() {
    this.#render();
  }
}

export default new EqualizerView();
