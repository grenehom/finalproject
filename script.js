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

  // Optional: Start countdown or transition after delay
  setTimeout(() => {
    mirrorScene.classList.add("hidden");
    startCountdownScene(); // Existing function
  }, 4000); // Adjust duration as needed
});

// This function shows multiple lines of text one after another, like a story.
// Each line types out letter-by-letter (like a typewriter), then waits before the next one.
// - texts: an array of lines to show
// - targetId: the ID of the element where the text should go
// - delayBetween: how long to wait between lines (in milliseconds)
function typeTextSequence(texts, targetId, delayBetween = 1000) {
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
        setTimeout(typeChar, 100); // Controls typing speed
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
  const countdownScreen = document.getElementById("countdownScreen");
  const number = document.getElementById("countdownNumber");
  const message = document.getElementById("countdownMessage");

  countdownScreen.classList.remove("hidden");

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
    }
  }

  nextStep();
}

/*
//  Lightbox logic removed
// initially used Lightbox2 to expand an image when the mirror was clicked.
// However, it added a white background, frame, and styling that didn’t match our pixel aesthetic.
// Instead I use a full-screen custom div (#mirrorRevealScreen) to maintain stylistic control.
*/
