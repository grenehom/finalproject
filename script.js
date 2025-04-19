window.addEventListener("load", () => {
  console.log("Page loaded");

  setTimeout(() => {
    const scene = document.querySelector(".scene");
    const podium = document.getElementById("podium");

    console.log("scene found?", scene !== null);
    console.log("podium found?", podium !== null);

    if (scene && podium) {
      scene.classList.add("zoomed");
      podium.classList.add("jiggle");
      console.log("Zoom and jiggle started");

      // Fallback to show modal after zoom duration
      setTimeout(() => {
        const modal = document.getElementById("introModal");
        console.log("modal found?", modal !== null);
        modal.classList.add("show");
        console.log("Modal should now be showing");
      }, 8500); // 8s zoom + 0.5s buffer
    }
  }, 2000);
});

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

document.getElementById("queenCard").addEventListener("click", () => {
  const queen = document.getElementById("queenCard");
  const blank = document.getElementById("blankPage");
  const cardScreen = document.getElementById("cardScreen");
  const redRoom = document.getElementById("redRoom");

  // Add flip class
  queen.classList.add("flip");

  // After flip, show blank screen
  setTimeout(() => {
    cardScreen.classList.add("hidden");
    blank.classList.remove("hidden");
    blank.classList.add("show");
  }, 600);

  // After blank screen, show red room
  setTimeout(() => {
    redRoom.classList.remove("hidden");
    redRoom.classList.add("show");
  }, 1600);

  setTimeout(() => {
    const redRoom = document.getElementById("redRoom");
    if (redRoom) {
      redRoom.classList.add("show");
    }
  }, 1600);
});
