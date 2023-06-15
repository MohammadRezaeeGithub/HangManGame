class Hangman {
  words = ["computer", "programming", "python", "java", "javascript"];
  word;
  founded = '';
  counter = 1;
  randNumber = Math.floor(Math.random() * this.words.length);

  initialGame() {
    this.word = this.words[this.randNumber];
    this.founded = '';
    this.counter = 1;
    document.querySelector(".img-container img").setAttribute("src", "img/face_1.png");
    document.querySelector(".guessed-word").innerHTML = "";
    for (let i = 0; i < this.word.length; i++) {
      document.querySelector(".guessed-word").innerHTML += `<span>-</span>`;
    }
  }

  getTheLetters(letter) {
    let indexs = [];
    let spans = document.querySelectorAll(".guessed-word span");
    if (this.word.includes(letter.toLowerCase())) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter.toLowerCase()) {
          indexs.push(i);
        }
      }
      for (let j = 0; j < indexs.length; j++) {
        spans[indexs[j]].innerHTML = letter.toUpperCase();
        this.founded += letter;
        console.log(this.founded);
        this.checkIfWin();
      }
      // index = this.word.indexOf(letter.toLowerCase());
      // document.querySelectorAll(".guessed-word span")[index].innerHTML = letter.toUpperCase();
    } else {
      this.counter++;
      this.changeThePhoto();
    }
  }

  changeThePhoto() {
    let src;
    switch (this.counter) {
      case 1:
        src = "img/face_" + 1 + ".png";
        break;
      case 2:
        src = "img/face_" + 2 + ".png";
        break;
      case 3:
        src = "img/face_" + 3 + ".png";
        break;
      case 4:
        src = "img/face_" + 4 + ".png";
        break;
      case 5:
        src = "img/face_" + 5 + ".png";
        break;
      case 6:
        src = "img/face_" + 6 + ".png";
        break;
      case 7:
        src = "img/face_" + 7 + ".png";
        break;
      case 8:
        src = "img/face_" + 8 + ".png";
        break;
    }
    document.querySelector(".img-container img").setAttribute("src", src);
  }

  checkIfWin(){
    if(this.founded.length === this.word.length){
      console.log("You won!")
      this.initialGame();
      return;
    }
  }
}

const handgman = new Hangman();
handgman.initialGame();

eventListeners();

function eventListeners() {
  document.querySelectorAll(".keyboard span").forEach((element) => {
    element.addEventListener("click", (e) => {
      handgman.getTheLetters(e.target.innerHTML);
      e.target.style.opacity = "0";
    });
  });
}
