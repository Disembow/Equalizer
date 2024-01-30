import EqualizerModel from './Equalizer.model';

class EqualizerController extends EqualizerModel {
  getAudioSource() {
    const audioPlayer = document.querySelector('.audio');
    const input = document.querySelector('.input');

    const audioFile = input.files[0];
    audioPlayer.src = URL.createObjectURL(audioFile);
  }
}

export default EqualizerController;
