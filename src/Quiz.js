import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  // 질문과 답변
  const questions = [
    { text: '질문 1', options: [{ text: '답변 1 - I', type: 'I' }, { text: '답변 2 - E', type: 'E' }] },
    // ... 나머지 질문들
  ];

  const handleAnswerClick = (type) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [type]: prevAnswers[type] + 1,
    }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const result =
      (answers.I >= answers.E ? 'I' : 'E') +
      (answers.S >= answers.N ? 'S' : 'N') +
      (answers.T >= answers.F ? 'T' : 'F') +
      (answers.J >= answers.P ? 'J' : 'P');

    navigate('/result', { state: { result } });
  };

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].text}</h2>
      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerClick(option.type)}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;