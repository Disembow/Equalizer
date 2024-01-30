import createTag from './helpers/createTag';
import EqualizerController from './Equalizer.controller';

class EqualizerView {
  #controller = new EqualizerController();
  #root = document.querySelector('.app');

  #render() {}

  init() {
    this.#render();
  }
}

export default new EqualizerView();
