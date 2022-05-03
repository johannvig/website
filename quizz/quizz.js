var Question = function (questionObj) {
  this.value = {
    text: "Question",
    answers: []
  };

  this.selectedAnswer = null;
  this.html = null;
  this.questionText = null;
  this.questionAnswers = null;
  this.questionFeedback = null;

  this.value = Object.assign(this.value, questionObj);

  this.onQuestionAnswered = ({ detail }) => {
    this.selectedAnswer = {
      value: detail.answer,
      html: detail.answerHtml
    };
    this.update();

    document.dispatchEvent(
      new CustomEvent("question-answered", {
        detail: {
          question: this,
          answer: detail.answer
        }
      })
    );
  };

  this.create = function () {
    this.html = document.createElement("div");
    this.html.classList.add("question");

    this.questionText = document.createElement("h2");
    this.questionText.textContent = this.value.text;

    this.questionAnswers = document.createElement("div");
    this.questionAnswers.classList.add("answers");

    for (let i = 0; i < this.value.answers.length; i++) {
      const ansObj = this.value.answers[i];
      let answer = createAnswer(ansObj);

      answer.onclick = (ev) => {
        if (this.selectedAnswer !== null) {
          this.selectedAnswer.html.classList.remove("selected");
        }

        answer.classList.add("selected");

        this.html.dispatchEvent(
          new CustomEvent("question-answered", {
            detail: {
              answer: ansObj,
              answerHtml: answer
            }
          })
        );
      };

      this.questionAnswers.appendChild(answer);
    }

    this.questionFeedback = document.createElement("div");
    this.questionFeedback.classList.add("question-feedback");

    this.html.appendChild(this.questionText);
    this.html.appendChild(this.questionAnswers);
    this.html.appendChild(this.questionFeedback);

    this.html.addEventListener("question-answered", this.onQuestionAnswered);

    return this.html;
  };

  this.disable = function () {
    this.html.classList.add("disabled");
    this.html.onclick = (ev) => {
      ev.stopPropagation();
    };

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    let answers = this.html.querySelectorAll(".answer");
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      answer.onclick = null;
    }
  };

  this.remove = function () {
    let children = this.html.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      this.html.removeChild(child);
    }

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    this.html.parentNode.removeChild(this.html);
    this.html = null;
  };

  this.update = function () {
    let correctFeedback, incorrectFeedback;
    this.html = this.html || document.createElement("div");

    correctFeedback = "Nice! You got it right.";
    incorrectFeedback = "Oh! Not the correct answer.";

    if (this.selectedAnswer !== null) {
      if (this.selectedAnswer.value.isCorrect) {
        this.html.classList.add("correct");
        this.html.classList.remove("incorrect");
        this.questionFeedback.innerHTML = correctFeedback;
      } else {
        this.html.classList.add("incorrect");
        this.html.classList.remove("correct");
        this.questionFeedback.innerHTML = incorrectFeedback;
      }
    }
  };

  function createAnswer(obj) {
    this.value = {
      text: "Answer",
      isCorrect: false
    };

    this.value = Object.assign(this.value, obj);

    this.html = document.createElement("button");
    this.html.classList.add("answer");

    this.html.textContent = this.value.text;

    return this.html;
  }
};

//
// main.js
//

let questionsData = [
  {
    text: "Qui a écrit le 1ère algorithme de l'histoire?",
    answers: [
      {
        text: "Charles Babbage",
        isCorrect: false
      },
      {
        text: "Ada Lovelace",
        isCorrect: true
      },
      {
        text: "Alan Turing",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quel est le langage informatique qui se rapproche le plus de la machine?",
    answers: [
      {
        text: "l'assembleur",
        isCorrect: true
      },
      {
        text: "C",
        isCorrect: false
      },
      {
        text: "Java",
        isCorrect: false
      },
      {
        text: "Python",
        isCorrect: false
      }
    ]
  },
  {
    text: "Qui participé au codage des 1er logiciels qui serviront à la mission Appolo de la NASA?",
    answers: [
      {
        text: "Grace Hopper",
        isCorrect: false
      },
      {
        text: 'Karen Spärck Jones',
        isCorrect: false
      },
      {
        text: "Margaret Hamilton",
        isCorrect: true
      }
    ]
  },
  {
    text: "Quand est-ce que le langage python a été écrit?",
    answers: [
      {
        text: "1991",
        isCorrect: true
      },
      {
        text: "1995",
        isCorrect: false
      },
      {
        text: "1983",
        isCorrect: false
      },
      {
        text: "1985",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quand le terme de machine learning a été utilisé pour la 1ère fois?",
    answers: [
      {
        text: "1959",
        isCorrect: true
      },
      {
        text: "1974",
        isCorrect: false
      },
      {
        text: "1956",
        isCorrect: false
      },
      {
        text: "1954",
        isCorrect: false
      }
     
    ]
  },
  {
    text: "Qui a parlé pour la 1ère fois de la blockchain?",
    answers: [
      {
        text: "Nakamoto",
        isCorrect: false
      },
      {
        text: "David Chaum",
        isCorrect: true
      },
      {
        text: "Vitalik Buterin",
        isCorrect: false
      }
     
    ]
  },
  {
    text: "Qui a crée la machine enigma?",
    answers: [
      {
        text: "Marian Rejewski",
        isCorrect: false
      },
      {
        text: "Alan Turing",
        isCorrect: false
      },
      {
        text: "Arthur Scherbius",
        isCorrect: true
      }
     
    ]
  },
  {
    text: "Qui a crée google? (donner un des deux)",
    answers: [
      {
        text: "Larry Page",
        isCorrect: true
      },
      {
        text: "Steve Wozniak",
        isCorrect: false
      },
      {
        text: "Sergey Brin",
        isCorrect: true
      },
      {
        text: "Steve Jobs",
        isCorrect: false
      }
     
    ]
  },
  {
    text: "Qui a inventé le web?",
    answers: [
      {
        text: "Tim berners lee",
        isCorrect: true
      },
      {
        text: "Mike Sendall",
        isCorrect: false
      },
      {
        text: "Jackie Chan",
        isCorrect: false
      }
     
    ]
  },
  {
    text: "Quelles sont les 4 parties d'un ordinateur selon l'architecture de von Neumann?",
    answers: [
      {
        text: "mémoire, dispositifs d’entrée-sortie,unité de contrôle, unité arithmétique et logique",
        isCorrect: true
      },
      {
        text: "mémoire, dispositifs d’entrée-sortie,unité de contrôle, le bus d’adresse",
        isCorrect: false
      }
     
    ]
  }
];

// variables initialization
let questions = [];
let score = 0,
  answeredQuestions = 0;
let appContainer = document.getElementById("questions-container");
let scoreContainer = document.getElementById("score-container");
scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arr items An array containing the items.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(questionsData);

// creating questions
for (var i = 0; i < questionsData.length; i++) {
  let question = new Question({
    text: questionsData[i].text,
    answers: questionsData[i].answers
  });

  appContainer.appendChild(question.create());
  questions.push(question);
}

document.addEventListener("question-answered", ({ detail }) => {
  if (detail.answer.isCorrect) {
    score++;
  }

  answeredQuestions++;
  scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
  detail.question.disable();

  if (answeredQuestions == questions.length) {
    setTimeout(function () {
      alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
    }, 100);
  }
});

console.log(questions, questionsData);
