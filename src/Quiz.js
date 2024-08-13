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
    { text: '계약 전 세입자가 집 보러온다고 연락이 왔다.', options: [{ text: '굳이 만날 필요 있나? 문자로도 충분히 소통할 수 있지', type: 'I' }, { text: '역시 직접 만나서 대화하는 게 최고지! 세입자랑 친해질 수 있는 기회다', type: 'E' }] },
    { text: '세입자와 만났다. 어색한 이 순간..', options: [{ text: '궁금한건 먼저 물어보겠지? 물어보면 대답해줘야지', type: 'I' }, { text: '회사가 여기 근처인가? 궁금한데 물어봐야겠다', type: 'E' }] },
    { text: '건물 관리 회의가 잡혔다. 첫 회의를 위해,', options: [{ text: '내가 굳이 가야하나...?', type: 'I' }, { text: '적극적으로 의견 어필해서 분위기를 휘어잡을거야!', type: 'E' }] },
    { text: '부동산 계약을 전자문서로 한다고?', options: [{ text: '문서는 무조건 종이지. 기존 방식에는 다 이유가 있는 법!', type: 'S' }, { text: '완전 편한데? 디지털 시대에 뒤쳐지면 안되지!', type: 'N' }] },
    { text: '오늘 본 집이 마음에 드는데 직거래하자고 연락이 왔다. 당신의 선택은?', options: [{ text: '중개사가 괜히 중개사겠어? 원칙대로 해야지 무슨 직거래야', type: 'S' }, { text: '오 보증금 아끼고 좋은데? 직거래 한 번 해볼까?', type: 'N' }] },
    { text: '길가다가 우연히 본 휘향찬란한 건물', options: [{ text: ' 저런 건물은 얼마나할까?', type: 'S' }, { text: '저 건물주는 무슨 일할까?', type: 'N' }] },
    { text: '친구가 돈을 빌려달라고 부탁했다. 당신의 반응은?', options: [{ text: '왜 필요해? 얼마나 필요해? 언제 갚을 수 있어?', type: 'T' }, { text: '요즘 힘드냐? 이럴 때 도와주는게 친구지 얼마면 되!', type: 'F' }] },
    { text: '당신의 집이 마음에 든 세입자. 그런데, 보증금을 깎아 달라고 한다.', options: [{ text: '얼마나 남는지 계산해보고 합당한 이유면 깎아주지 뭐', type: 'T' }, { text: '어떤 상황인지 들어보고 가능하면 배려해줘야겠다', type: 'F' }] },
    { text: '세입자가 자꾸 새벽에 노래를 부른다.. 당신의 대처 방법은?', options: [{ text: '녹음 해놓고 세입자에게 경고한다', type: 'T' }, { text: '조용히 쪽지로 의견을 전달한다', type: 'F' }] },
    { text: '첫 월세 입금날이다! 이 돈으로 뭐하지?', options: [{ text: '미래에 투자하자 적금 액수 늘려야지', type: 'J' }, { text: '그 동안 고생했는데 해외 한 번 갔다와야지', type: 'P' }] },
    { text: '부동산에 집을 내놓을 때 나는', options: [{ text: '월, 수, 금 오후 1시부터 오후 5시까지 가능해요', type: 'J' }, { text: '세입자 구해지면 연락주세요', type: 'P' }] },
    { text: '세입자가 월세를 보내지 않았다. 당신의 반응은?', options: [{ text: '이럴 줄 알았어 알림 설정해놓길 잘했네 연락해봐야지', type: 'J' }, { text: '깜빡했을수도 있어 며칠 더 기다려봐야지', type: 'P' }] },
  ];

  // 답변 클릭 핸들러
  const handleAnswerClick = (type) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [type]: prevAnswers[type] + 1,
      };
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        calculateResult(updatedAnswers);
      }
  
      return updatedAnswers;
    });
  };

  // 결과 계산
  const calculateResult = (finalAnswers) => {
    const result =
      (finalAnswers.I >= finalAnswers.E ? 'I' : 'E') +
      (finalAnswers.S >= finalAnswers.N ? 'S' : 'N') +
      (finalAnswers.T >= finalAnswers.F ? 'T' : 'F') +
      (finalAnswers.J >= finalAnswers.P ? 'J' : 'P');
  
    console.log("최종 MBTI 결과:", result);
  
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

