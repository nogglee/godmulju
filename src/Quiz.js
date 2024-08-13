import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {

  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  useEffect(() => {
    console.log("currentQuestion 상태가 업데이트됨:", currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    console.log("answers 상태가 업데이트됨:", answers);
  }, [answers]);

  // 질문 및 답변 설정
  const questions = [
    { text: '질문 1', options: [{ text: '답변 1 - I', type: 'I' }, { text: '답변 2 - E', type: 'E' }] },
    { text: '질문 2', options: [{ text: '답변 1 - I', type: 'I' }, { text: '답변 2 - E', type: 'E' }] },
    { text: '질문 3', options: [{ text: '답변 1 - I', type: 'I' }, { text: '답변 2 - E', type: 'E' }] },
    { text: '질문 4', options: [{ text: '답변 1 - S', type: 'S' }, { text: '답변 2 - N', type: 'N' }] },
    { text: '질문 5', options: [{ text: '답변 1 - S', type: 'S' }, { text: '답변 2 - N', type: 'N' }] },
    { text: '질문 6', options: [{ text: '답변 1 - S', type: 'S' }, { text: '답변 2 - N', type: 'N' }] },
    { text: '질문 7', options: [{ text: '답변 1 - T', type: 'T' }, { text: '답변 2 - F', type: 'F' }] },
    { text: '질문 8', options: [{ text: '답변 1 - T', type: 'T' }, { text: '답변 2 - F', type: 'F' }] },
    { text: '질문 9', options: [{ text: '답변 1 - T', type: 'T' }, { text: '답변 2 - F', type: 'F' }] },
    { text: '질문 10', options: [{ text: '답변 1 - J', type: 'J' }, { text: '답변 2 - P', type: 'P' }] },
    { text: '질문 11', options: [{ text: '답변 1 - J', type: 'J' }, { text: '답변 2 - P', type: 'P' }] },
    { text: '질문 12', options: [{ text: '답변 1 - J', type: 'J' }, { text: '답변 2 - P', type: 'P' }] },
  ];

  // 답변 클릭 핸들러
  const handleAnswerClick = (type) => {
    // 선택된 답변의 유형 점수 업데이트
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [type]: prevAnswers[type] + 1,
    }));

    // 다음 질문으로 이동
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // 모든 질문에 답변한 후 결과 계산
      calculateResult();
    }
  };

  // 결과 계산
  const calculateResult = () => {
    const result =
      (answers.I >= answers.E ? 'I' : 'E') +
      (answers.S >= answers.N ? 'S' : 'N') +
      (answers.T >= answers.F ? 'T' : 'F') +
      (answers.J >= answers.P ? 'J' : 'P');
    
    console.log("최종 MBTI 결과:", result);

    // 결과 페이지로 이동
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

