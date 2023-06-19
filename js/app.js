class Hangman {
  words = ["computer", "programming", "python", "java", "javascript"];
  #word;
  #founded = "";
  #counter;
  #randNumber;

  //initialising the game and values
  initialGame() {
    this.randNumber = Math.floor(Math.random() * this.words.length);
    this.word = this.words[this.randNumber];
    this.founded = "";
    this.counter = 1;
    document
      .querySelector(".img-container img")
      .setAttribute("src", "img/face_1.png");
    document.querySelector(".guessed-word").innerHTML = "";
    for (let i = 0; i < this.word.length; i++) {
      document.querySelector(".guessed-word").innerHTML += `<span>-</span>`;
    }

    document.querySelectorAll(".alphabet").forEach((span) => {
      span.style.opacity = "1";
    });
  }

  //checking if the letter exists in the guessed word
  getTheLetters(letter) {
    console.log('counter is : '+this.counter)
    

    let indexs = [];
    let spans = document.querySelectorAll(".guessed-word span");
    if (this.word.includes(letter.toLowerCase())) {
      //checking how many times the letter has been repeated in the guessed word
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter.toLowerCase()) {
          indexs.push(i);
        }
      }
      //replacing the empty span with the letter which we recieved from user
      for (let j = 0; j < indexs.length; j++) {
        spans[indexs[j]].innerHTML = letter.toUpperCase();
        this.founded += letter;
      }
      console.log('founded is : ' + this.founded)
      //checking if the user has won the game
      this.checkIfWin();
    } else {
      //if the letter is not in the guessed word, we add the wrong guessed number and after call the function to check if the user has lost the game
      this.counter++;
      this.checkIfLose();
      this.changeThePhoto();
    }
  }

  //changing the smily according to the number of wrong guesses
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

  //checking if the user has won the game and call the modal
  checkIfWin() {
    if (this.founded.length === this.word.length) {
      this.showModal("img/win.gif");
      return;
    }
  }

  //checking if the user has lost the game and call the modal
  checkIfLose() {
    if (this.counter > 8) {
      this.showModal("img/lost.gif");
      return;
    }
  }

  // the mothod for showing the modal
  showModal(src) {
    let modal = document.querySelector(".modal");
    document.querySelector(".modal-body img").setAttribute("src", src);
    modal.classList.add("show");
    modal.setAttribute("style", "display:block !important");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");
    document.body.classList.add("modal-open");
    document.body.setAttribute("style", "overflow:hidden;padding-right:15px;");
    const div = `
    <div class="modal-backdrop fade show"></div>
    `;
    document.body.innerHTML += div;
  }

  // the mothod for closing the modal
  closeModal() {
    let modal = document.querySelector(".modal");
    modal.classList.remove("show");
    modal.removeAttribute("style");
    modal.removeAttribute("aria-modal");
    modal.removeAttribute("role");
    document.body.classList.remove("modal-open");
    document.body.removeAttribute("style");
    document.querySelector(".modal-backdrop").remove();
  }
}

// making the new instance of the hangman class
const handgman = new Hangman();
handgman.initialGame();

eventListeners();

//closing the modal and call the preloader and initial game and set the event listeners again
function closeModalMain() {
  handgman.closeModal();
  showThePreloader();
  handgman.initialGame();
  eventListeners();
}

//showing the preloader for 3 seconds and removing it
function showThePreloader() {
  let preloader = document.querySelector(".preloader-container");
  preloader.classList.remove("hidden-preloader");

  setInterval(() => {
    preloader.classList.add("hidden-preloader");
  }, 3000);
}

//adding event listeners to all the spans for getting the letters and send it for processing
function eventListeners() {
  // Listen for keyboard input
  // document.addEventListener("keyup", function (event) {
  //   if (event.keyCode >= 65 && event.keyCode <= 90) {
  //     let letter = event.key.toLowerCase();
  //     handgman.getTheLetters(letter);
  //   }
  // });

  document.querySelectorAll(".keyboard span").forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.style.opacity == "0") {
        return;
      }
      //set the opacity of the span to 0
      e.target.style.opacity = "0";
      //sending the letters for processing if there is on our chosen word
      handgman.getTheLetters(e.target.innerHTML);
    });
  });
}
