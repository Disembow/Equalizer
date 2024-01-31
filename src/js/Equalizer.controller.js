class EqualizerController {
  #cellsX;
  #cellsY;
  #isPlay;
  #max;
  #timestamp;
  #avalaibleFileExt;
  #cellsElements;
  #analyzer;

  constructor(cellsX, cellsY) {
    this.#cellsX = cellsX;
    this.#cellsY = cellsY;
    this.#isPlay = false;
    this.#max = 255;
    this.#timestamp = 0;
    this.#avalaibleFileExt = ['audio/mpeg', 'audio/ogg', 'audio/mp4', 'audio/flac'];
    this.#cellsElements = null;
    this.#analyzer = null;
  }

  getAudioSource({ target: input }, audioPlayer) {
    const fileItem = input.files[0];

    const isValidAudioType = this.#checkFiletype(fileItem);

    if (isValidAudioType) {
      const audioFile = fileItem;
      audioPlayer.src = URL.createObjectURL(audioFile);
    } else {
      alert('Invalid type of file');
    }
  }

  handlePlay({ target }, cells) {
    this.#isPlay = true;
    this.#cellsElements = Array.from(cells);

    if (!this.#timestamp) {
      this.#createEqualizer(target);
    } else {
      this.#checkRate();
    }
  }

  handlePause({ timeStamp }) {
    if (!!timeStamp) this.#isPlay = false;

    this.#timestamp = timeStamp;
  }

  #checkFiletype(filesList) {
    return this.#avalaibleFileExt.includes(filesList.type);
  }

  #createEqualizer(audioPlayer) {
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);
    this.#analyzer = analyzer;

    if (this.#isPlay) this.#checkRate();
  }

  #checkRate() {
    const data = new Uint8Array(this.#analyzer.frequencyBinCount);
    this.#analyzer.getByteFrequencyData(data);
    this.#colorCell(data);

    if (this.#isPlay) {
      setTimeout(() => {
        this.#checkRate(this.#analyzer);
      }, 50);
    }
  }

  #colorCell(data) {
    const cellsNestedArr = this.#createNestedCellsGrid(this.#cellsElements);

    const frequencyData = data.slice(0, this.#cellsX);
    frequencyData.forEach((_, index) => {
      const cellsToColor = Math.floor((frequencyData[index] / this.#max) * this.#cellsY);

      for (let i = 0; i < cellsToColor; i += 1) {
        let cellIndex = this.#cellsY - 1 - i;

        const targetCell = cellsNestedArr[cellIndex][index];
        targetCell.classList.add('active');
      }
    });
  }

  #createNestedCellsGrid(cells) {
    const nestedCells = [];

    cells.forEach((cell, i) => {
      const nestedIndex = Math.floor(i / this.#cellsX);
      cell.classList.remove('active');

      if (i % this.#cellsX === 0) {
        nestedCells.push([cell]);
      } else {
        nestedCells[nestedIndex].push(cell);
      }
    });

    return nestedCells;
  }
}

export default EqualizerController;
