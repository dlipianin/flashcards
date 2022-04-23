// create local storage items or empty array
var contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// when clicking on save button adds a new flashcard
document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

// when clicking on delete button deletes all flashcards
document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear(); // clears the local storage
  flashcards.innerHTML = ""; // clears the flashcard div
  contentArray = []; // clears the content array
});

// when clicking on add card button displays create flashcard
document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

// when clicking on close button deletes create flashcard
document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

// creates flashcards container
flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement("h2");
  const answer = document.createElement("h2");
  const del = document.createElement("i");

  flashcard.className = "flashcard";

  question.setAttribute(
    "style",
    "border-top:1px solid grey; padding: 15px; margin-top:30px"
  );
  question.textContent = text.my_question; // adds text to the question section from dictionary

  answer.setAttribute("style", "text-align:center; display:none; color:grey");
  answer.textContent = text.my_answer; // adds text to the answer section from dictionary

  // deletes the selected flashcard
  del.className = "fa-solid fa-xmark";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });

  // adds created elements to the div
  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if (answer.style.display == "none") answer.style.display = "block";
    else answer.style.display = "none";
  });

  // adds the div to the id
  document.querySelector("#flashcards").appendChild(flashcard);
};

// displays all the flashcards stored in local storage
contentArray.forEach(flashcardMaker);

// adds new flashcard
addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  // creats dictionary
  let flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };

  // adds element into the array
  contentArray.push(flashcard_info);
  // update local storage
  localStorage.setItem("items", JSON.stringify(contentArray));
  // creates flashcard div
  flashcardMaker(
    contentArray[contentArray.length - 1],
    contentArray.length - 1
  );
  // clears values
  question.value = "";
  answer.value = "";
};
