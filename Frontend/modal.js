// Get the modal
const modal = document.getElementById("myModal");
const scoreHolder = document.getElementById("score-holder");

function highScoreReached(i) {
  const saveUserForm = document.getElementById("save-user-form");
  const newGameHighScoreButton = document.getElementById("new-game-button");
  document.getElementById("save-user-score").style.display = "block";
  saveUserForm.addEventListener("submit", e => e.preventDefault());
  newGameHighScoreButton.addEventListener("click", event => {
    let result = /^[a-zA-Z ]+$/;
    if (result.test(saveUserForm.firstname.value)) {
      // if (saveUserForm.firstname.value) {
      addNewUserToScore(saveUserForm.firstname.value, i);
      window.location.reload(true);
      // }
    } else {
      alert("Please enter a name");
    }
  });
}

function addNewUserToScore(name, i) {
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({ name: name, score: i })
  });
}
