// When the page fully loads, begin the intro zoom sequence
window.addEventListener("load", () => {
  console.log("Page loaded");

  // Delay the zoom slightly to create anticipation
  setTimeout(() => {
    const scene = document.querySelector(".scene");
    const podium = document.getElementById("podium");

    // Confirm both required DOM elements exist before proceeding
    console.log("scene found?", scene !== null);
    console.log("podium found?", podium !== null);

    if (scene && podium) {
      // Trigger zoom animation on the scene and jiggle on the podium
      scene.classList.add("zoomed");
      podium.classList.add("jiggle");
      console.log("Zoom and jiggle started");

      // After the zoom finishes (~8 seconds), display the modal prompt
      setTimeout(() => {
        const modal = document.getElementById("introModal");
        console.log("modal found?", modal !== null);
        modal.classList.add("show");
        console.log("Modal should now be showing");
      }, 8500); // accounts for zoom duration + small buffer
    }
  }, 2000); // slight initial delay before beginning animation
});

// Called when the user clicks "Begin" on the intro modal
// Hides the modal and reveals the card selection screen
function startGame() {
  const modal = document.getElementById("introModal");
  const cardScreen = document.getElementById("cardScreen");
  const bgMusic = document.getElementById("backgroundMusic");

  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
    console.log("Game started: modal closed");
  }

  if (cardScreen) {
    cardScreen.classList.remove("hidden");
    cardScreen.classList.add("show");
    console.log("Card screen shown");
  }

  if (bgMusic) {
    bgMusic.volume = 0.4; // optional: lower the volume
    bgMusic.play().catch((e) => {
      console.log("Autoplay blocked, waiting for user interaction:", e);
    });
  }
}

// Main logic for when the Queen card is selected
// Triggers card flip, then a blank screen, then the red room reveal
document.getElementById("queenCard").addEventListener("click", () => {
  const queen = document.getElementById("queenCard");
  const blank = document.getElementById("blankPage");
  const cardScreen = document.getElementById("cardScreen");
  const redRoom = document.getElementById("redRoom");

  // Trigger flip animation on the queen card
  queen.classList.add("flip");

  // After flip animation, show blank transition screen
  setTimeout(() => {
    cardScreen.classList.add("hidden");
    blank.classList.remove("hidden");
    blank.classList.add("show");
  }, 600);

  // After a short delay, show the red room and begin caption sequence
  setTimeout(() => {
    redRoom.classList.remove("hidden");
    redRoom.classList.add("show");

    // Start the multi-line caption sequence in the red room
    typeTextSequence(
      ["YOU ARE NOT ALONE", "ONLY ONE LEAVES...", "DECIDE WHO DESERVES IT"],
      "typewriter-text",
      2000 // wait 2s between lines
    );
  }, 1600);
});

// Replacing Lightbox interaction with custom mirror reveal screen
// When mirror is clicked, hide red room and show final glowing mirror image
document.getElementById("mirrorLink").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Mirror clicked");

  // Hide red room
  const redRoom = document.getElementById("redRoom");
  redRoom.classList.add("hidden");

  // Show custom mirror scene
  const mirrorScene = document.getElementById("mirrorRevealScreen");
  mirrorScene.classList.remove("hidden");

  setTimeout(() => {
    mirrorScene.classList.add("hidden");
    startCountdownScene();
  }, 1000); //
});

// This function shows multiple lines of text one after another, like a story.
// Each line types out letter-by-letter (like a typewriter), then waits before the next one.
// - texts: an array of lines to show
// - targetId: the ID of the element where the text should go
// - delayBetween: how long to wait between lines (in milliseconds)
function typeTextSequence(texts, targetId, delayBetween = 0) {
  const target = document.getElementById(targetId);
  let textIndex = 0;

  // Helper function to type each individual line, character by character
  function typeLine(line, onComplete) {
    let charIndex = 0;
    target.textContent = ""; // Clear previous line

    function typeChar() {
      if (charIndex < line.length) {
        target.textContent += line.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 60); // Controls typing speed
      } else if (onComplete) {
        setTimeout(onComplete, delayBetween); // Wait before typing next line
      }
    }

    typeChar();
  }

  // Recursive function that moves to the next line in the array
  function startNextLine() {
    if (textIndex < texts.length) {
      typeLine(texts[textIndex], startNextLine);
      textIndex++;
    }
  }

  // Begin the sequence
  startNextLine();
}

// This function handles the countdown screen after the mirror interaction
// Displays 3 → 2 → 1 with changing messages over time

function startCountdownScene() {
  const countdownScreen = document.getElementById("mirrorRevealScreen");
  const number = document.createElement("div");
  const message = document.createElement("div");

  number.setAttribute("id", "countdownNumber");
  message.setAttribute("id", "countdownMessage");

  countdownScreen.appendChild(number);
  countdownScreen.appendChild(message);
  countdownScreen.classList.remove("hidden");

  // Style the countdown number + message to appear at the top & bottom
  number.style.position = "absolute";
  number.style.top = "20%";
  number.style.left = "50%";
  number.style.transform = "translateX(-50%)";
  number.style.color = "#FFE100";
  number.style.fontFamily = "Upheaval, sans-serif";
  number.style.fontSize = "6rem";
  number.style.textShadow = "4px 4px #000";

  message.style.position = "absolute";
  message.style.bottom = "20%";
  message.style.left = "50%";
  message.style.transform = "translateX(-50%)";
  message.style.color = "#FFE100";
  message.style.fontFamily = "Upheaval, sans-serif";
  message.style.fontSize = "2.5rem";
  message.style.textShadow = "2px 2px #000";

  const countdownSteps = [
    { value: "3", text: "YOU ARE NOT ALONE" },
    { value: "2", text: "DO YOU DESERVE TO LIVE?" },
    { value: "1", text: "ONLY ONE SURVIVES" },
  ];

  let i = 0;

  function nextStep() {
    if (i < countdownSteps.length) {
      number.textContent = countdownSteps[i].value;
      message.textContent = countdownSteps[i].text;
      i++;
      setTimeout(nextStep, 2000);
    } else {
      // After final step, fade to black and show glitch image
      countdownScreen.style.transition = "opacity 1.5s ease-in-out";
      countdownScreen.style.opacity = "0";

      setTimeout(() => {
        countdownScreen.classList.add("hidden");

        // Show glitch screen and buttons

        const glitch = document.getElementById("glitchScreen");
        glitch.classList.remove("hidden");
        glitch.classList.add("show");

        const glitchChoices = document.getElementById("glitchChoices");
        glitchChoices.classList.remove("hidden");
      }, 1600);
    }
  }

  nextStep();
}

const music = document.getElementById("backgroundMusic");
const playBtn = document.getElementById("playMusic");
const muteBtn = document.getElementById("muteMusic");
const volumeSlider = document.getElementById("musicVolume");
const volumeDisplay = document.getElementById("musicVolumeDisplay");

// Set default volume
music.volume = volumeSlider.value / 100;

// Play music
playBtn.addEventListener("click", () => {
  music.play().catch((e) => {
    console.log("Playback failed:", e);
  });
});

// Mute / Unmute
muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "Unmute" : "Mute";
});

// Volume slider
volumeSlider.addEventListener("input", () => {
  const vol = volumeSlider.value / 100;
  music.volume = vol;
  volumeDisplay.textContent = Math.round(vol * 100) + "%";
});
/*
//  Lightbox logic removed
// initially used Lightbox2 to expand an image when the mirror was clicked.
// However, it added a white background, frame, and styling that didn’t match our pixel aesthetic.
// Instead I use a full-screen custom div (#mirrorRevealScreen) to maintain stylistic control.
*/
