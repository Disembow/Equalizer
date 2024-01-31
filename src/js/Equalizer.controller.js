class EqualizerController {
  constructor(cellsX, cellsY) {
    this.cellsX = cellsX;
    this.cellsY = cellsY;
    this.isPlay = false;
    this.max = 255;
    this.timestamp = 0;
    this.avalaibleFileExt = ['audio/mpeg', 'audio/ogg', 'audio/mp4', 'audio/flac'];
  }

  getAudioSource() {
    const audioPlayer = document.querySelector('.audio');
    const input = document.querySelector('.input');
    const fileItem = input.files[0];

    const isValidAudioType = this.#checkFiletype(fileItem);

    if (isValidAudioType) {
      const audioFile = fileItem;
      audioPlayer.src = URL.createObjectURL(audioFile);
    } else {
      alert('Invalid type of file');
    }
  }

  handlePlay({ target }) {
    this.isPlay = true;
    if (!this.timestamp) this.#createEqualizer(target);
  }

  handlePause({ timeStamp }) {
    if (!timeStamp) this.isPlay = false;

    this.timestamp = timeStamp;
  }

  #checkFiletype(filesList) {
    return this.avalaibleFileExt.includes(filesList.type);
  }

  #createEqualizer(audioPlayer) {
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    if (this.isPlay) this.#checkRate(analyzer);
  }

  #checkRate(analyzer) {
    const data = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(data);
    this.#colorCell(data);

    setTimeout(() => {
      if (this.isPlay) this.#checkRate(analyzer);
    }, 100);
  }

  #colorCell(data) {
    const cellsElements = Array.from(document.querySelectorAll('.cell'));
    const cellsNestedArr = [];

    cellsElements.forEach((cell, i) => {
      const nestedIndex = Math.floor(i / this.cellsX);
      cell.classList.remove('active');

      if (i % this.cellsX === 0) {
        cellsNestedArr.push([cell]);
      } else {
        cellsNestedArr[nestedIndex].push(cell);
      }
    });

    const frequencyData = data.slice(0, this.cellsX);
    frequencyData.forEach((_, index) => {
      const cellsToColor = Math.floor((frequencyData[index] / this.max) * this.cellsY);

      for (let i = 0; i < cellsToColor; i += 1) {
        let cellIndex = this.cellsY - 1 - i;

        const targetCell = cellsNestedArr[cellIndex][index];
        targetCell.classList.add('active');
      }
    });
  }
}

export default EqualizerController;
