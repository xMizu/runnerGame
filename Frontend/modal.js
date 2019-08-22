// Get the modal
const modal = document.getElementById("myModal");
const scoreHolder = document.getElementById("score-holder");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
function highScoreReached() {
  const saveUserForm = document.getElementById("save-user-form");
  const newGameButton = document.getElementById("new-game-button");
  document.getElementById("save-user-score").style.display = "block";
  saveUserForm.addEventListener("submit", e => e.preventDefault());
  newGameButton.addEventListener("click", event => {
    if (saveUserForm.firstname.value) {
      addNewUserToScore(saveUserForm.firstname.value);
    } else {
      alert("Please enter a name");
    }
  });
}

function addNewUserToScore(name) {
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({ name: name, score: i })
  });
}
