import { useEffect } from "react";
import { useState } from "react";

const apiUrl = "http://localhost:5000/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  const [position, setPosition] = useState(0);
  const [sccore, setSccore] = useState(0);
  const [answer, changeAnswer] = useState(null);
  // const [selected, changeSelected] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (questions.length === 0) {
    return <h1>Nemam podatke...</h1>;
  }
  // const options = questions[0].options;

  function increasePosition() {
    if (answer === null) {
     return;
    }
    setPosition(position + 1);
    changeAnswer(null);
  }

  const checkCorrectAnswer = (key) => {
    // changeAnswer(key);
    if (key === questions[position].correctOption) {
      // sccore = sccore+questions[position].points;
      setSccore(sccore + questions[position].points);
      changeAnswer(key);
      // increasePosition();
    } else {
      // increasePosition();
      changeAnswer(key);
    }
  };

  function resetQuiz() {
    return setPosition(0), setSccore(0), changeAnswer(null);;
  }

  return (
    <div className="quiz-container">
      <h3>Sccore : {sccore}</h3>
      <h1>React Quiz</h1>
      <p>Pitanje {position+1} od {questions.length}</p>
      <div className="question-container">
        <p>{questions[position].question}</p>
        <div className="options-container">
          {questions[position].options.map((opt, key) => {
            return (
              <button
                className={answer === key ? "selected" : ""}
                key={key}
                onClick={
                  position === questions.length - 1
                    ? null
                    : () => checkCorrectAnswer(key, answer)
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
      <button onClick={increasePosition}>Next Question</button>
      <h1>
        {position === questions.length - 1 ? "Vas sccoere je: " + sccore : ""}
      </h1>
      <button onClick={resetQuiz}>Reset</button>
    </div>
  );
}

export default App;
