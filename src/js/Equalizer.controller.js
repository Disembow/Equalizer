import EqualizerModel from './Equalizer.model';

class EqualizerController extends EqualizerModel {
  constructor() {
    super();
    this.isPlay = false;
    this.max = [140, 140, 120, 90, 80, 60];
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
    this.colorCell(data);

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

  colorCell(data) {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const cellsArr = [];

    cells.forEach((e, i) => {
      const nestedIndex = Math.floor(i / 6);
      e.classList.remove('active');

      if (i % 6 === 0) {
        cellsArr.push([e]);
      } else {
        cellsArr[nestedIndex].push(e);
      }
    });

    const [first, second, third, fourth, fifth, sixth] = data;
    const arr = [first, second, third, fourth, fifth, sixth];

    arr.forEach((_, index) => {
      const max = this.max[index];
      const cellsToColor = Math.floor((data[index] / max) * 6);

      for (let i = 0; i < cellsToColor; i += 1) {
        let cellIndex = 6 - 1 - i;
        if (cellIndex < 0) cellIndex = 0;

        console.log(arr);
        const targetCell = cellsArr[cellIndex][index];

        targetCell.classList.add('active');
      }
    });
  }
}

export default EqualizerController;
