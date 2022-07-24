class Controls {
  constructor(type) {
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;

    switch (type) {
      case "KEYS":
        this.#addKeyboardListeners();
        break;
      case "DUMMY":
        this.up = true;
        break;
    }
  }

  //# means it is a private method, only accessible here in this class.
  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.up = true;
          break;
        case "ArrowDown":
          this.down = true;
          break;
      }
      //console.table(this);

      document.onkeyup = (event) => {
        switch (event.key) {
          case "ArrowLeft":
            this.left = false;
            break;
          case "ArrowRight":
            this.right = false;
            break;
          case "ArrowUp":
            this.up = false;
            break;
          case "ArrowDown":
            this.down = false;
            break;
        }
        //console.table(this);
      };
    };
  }
}
