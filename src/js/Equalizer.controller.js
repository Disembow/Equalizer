import EqualizerModel from './Equalizer.model';

class EqualizerController extends EqualizerModel {
  constructor() {
    super();
    this.isPlay = false;
  }

  getAudioSource() {
    const audioPlayer = document.querySelector('.audio');
    const input = document.querySelector('.input');

    const audioFile = input.files[0];
    audioPlayer.src = URL.createObjectURL(audioFile);
  }

  createEqualizer() {
    const audioPlayer = document.querySelector('.audio');

    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    if (this.isPlay) this.checkRate(analyzer);
  }

  checkRate(analyzer) {
    const data = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(data);
    console.log(data[75]);

    setTimeout(() => {
      if (this.isPlay) this.checkRate(analyzer);
    }, 100);
  }

  handlePlay() {
    this.isPlay = true;
    this.createEqualizer();
  }

  handlePause() {
    this.isPlay = false;
  }
}

export default EqualizerController;
