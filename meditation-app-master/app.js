const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;
  for (var i = 0; i < timeSelect.length; i++) {
    timeSelect[i].addEventListener("click", function (eventObj) {
      fakeDuration = eventObj.target.getAttribute("data-time");
      timeDisplay.textContent =
        Math.floor(fakeDuration / 60) + ":" + (fakeDuration % 60);
    });
  }

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //play different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Duration changer

  //Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      play.src = "./svg/pause.svg";
      video.play();
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
  //We can animate the circle
  song.ontimeupdate = function () {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate the text
    timeDisplay.textContent = minutes + ":" + seconds;

    if (currentTime >= fakeDuration) {
      song.pause();
      video.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
    }
  };
};

app();
