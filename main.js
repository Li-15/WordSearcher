const input = document.getElementById("input");

function main() {
  const resultField = document.getElementById("resultField");
  resultField.innerText = "";

  const inputTypes = input.value.toLowerCase().trim().split(" ");

  const results = search(inputTypes);

  if (results.length === 0) {
    resultField.innerText = "No words are found";
  } else {
    for (let word of results) {
      resultField.innerText += `${word.name}\n${word.def}\n${word.type}\n\n`;
    }
  }
}

// human-bad

function search(inputRaw) {
  const results = [];
  for (let input of inputRaw) {
    if (input.includes("-")) {
      const keyWords = input.split("-");

      for (let word of wordsArray) {
        let match = true;

        for (let keyWord of keyWords) {
          // check against word.type and all tags at once
          if (keyWord !== word.type && !word.tag.includes(keyWord)) {
            match = false;
            break; // stop checking this word
          }
        }

        if (!match) {
          continue; // go to the next word in the outer loop
        }

        pushWord(word, results);
      }
    } else {
      for (let word of wordsArray) {
        // each word of the database
        for (let tag of word.tag) {
          // the tags of each word
          if (input === tag || input === word.type) {
            pushWord(word, results);
            continue;
          }
        }
      }
    }
  }

  return results;
}

function pushWord(wordd, array) {
  if (!array.includes(wordd)) {
    array.push(wordd);
  }
}

document.getElementById("searchBtn").addEventListener("click", main);

document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    main(); // Run your function
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    event.preventDefault(); // Prevent typing the "/" into the input
    input.focus(); // Focus the input box
    input.value = ""; // Focus the input box
  }
});
