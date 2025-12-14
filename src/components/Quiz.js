import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { ReactComponent as PreviousIcon } from '../assets/ico-previous.svg';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({ I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  // 특정 질문의 답변 저장
  const [specificAnswers, setSpecificAnswers] = useState({
    question1: null, // 부동산 계약 전자문서로 진행
    question2: null, // 부동산 직거래 의향
  });

  // 질문 배열
  const questions = [
    { id: 1, text: '계약 전 세입자가\n집 보러온다고 연락이 왔다.', options: [{ text: '굳이 만날 필요 있나?\n문자로도 충분히 소통할 수 있지', type: 'I' }, { text: '역시 직접 만나서 대화하는 게 최고지!\n세입자랑 친해질 수 있는 기회다', type: 'E' }] },
    { id: 2, text: '세입자와 만났다.\n어색한 이 순간..', options: [{ text: '궁금한건 먼저 물어보겠지?\n물어보면 대답해줘야지', type: 'I' }, { text: '회사가 여기 근처인가?\n궁금한데 물어봐야겠다', type: 'E' }] },
    { id: 3, text: '건물 관리 회의가 잡혔다.\n첫 회의를 위해,', options: [{ text: '굳이 참석 해야하나..?', type: 'I' }, { text: '적극적으로 의견 어필해서\n분위기를 휘어잡을거야!', type: 'E' }] },
    { id: 4, text: '부동산 계약을\n전자문서로 한다고?', options: [{ text: '문서는 무조건 종이지.\n기존 방식에는 다 이유가 있는 법!', type: 'S' }, { text: '완전 편한데?\n디지털 시대에 뒤쳐지면 안되지!', type: 'N' }] },
    { id: 5, text: '오늘 본 집이 마음에 들어서\n직거래하자고 연락이 왔다.\n당신의 선택은?', options: [{ text: '중개사가 괜히 중개사겠어?\n원칙대로 해야지 무슨 직거래야', type: 'S' }, { text: '오 보증금 아끼고 좋은데?\n직거래 한 번 해볼까?', type: 'N' }] },
    { id: 6, text: '길가다가 우연히\n본 휘황찬란한 건물', options: [{ text: ' 저런 건물은 얼마나할까?', type: 'S' }, { text: '저 건물주는 무슨 일할까?', type: 'N' }] },
    { id: 7, text: '친구가 돈을 빌려달라고 부탁했다.\n당신의 반응은?', options: [{ text: '왜 필요해? 얼마나 필요해?\n언제 갚을 수 있어?', type: 'T' }, { text: '요즘 힘드냐?\n이럴 때 도와주는게 친구지 얼마면 되!', type: 'F' }] },
    { id: 8, text: '당신의 집이 마음에 든 세입자.\n그런데 보증금을 깎아 달라고 한다.', options: [{ text: '얼마나 남는지 계산해보고\n합당한 이유면 깎아주지 뭐', type: 'T' }, { text: '어떤 상황인지 들어보고\n가능하면 배려해줘야겠다', type: 'F' }] },
    { id: 9, text: '세입자가 자꾸 새벽에 노래를 부른다. 당신의 대처 방법은?', options: [{ text: '녹음 해놓고 세입자에게 경고한다', type: 'T' }, { text: '조용히 쪽지로 의견을 전달한다', type: 'F' }] },
    { id: 10, text: '첫 월세 입금날이다!\n이 돈으로 뭐하지?', options: [{ text: '미래에 투자하자\n적금 액수 늘려야지', type: 'J' }, { text: '그 동안 고생했는데\n해외 한 번 갔다와야지', type: 'P' }] },
    { id: 11, text: '부동산에 집을 내놓을 때 나는', options: [{ text: '월, 수, 금 오후 1시부터 오후 5시까지\n가능해요', type: 'J' }, { text: '세입자 구해지면 연락주세요', type: 'P' }] },
    { id: 12, text: '세입자가 월세를 보내지 않았다.\n당신의 반응은?', options: [{ text: '이럴 줄 알았어\n알림 설정해놓길 잘했네 연락해봐야지', type: 'J' }, { text: '깜빡했을수도 있어 며칠 더 기다려봐야지', type: 'P' }] },
  ];

  // Fisher-Yates 알고리즘을 사용하여 배열 섞기
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 questions 배열을 섞어서 상태에 저장
    setShuffledQuestions(shuffleArray([...questions]));
  }, []);

  // 답변 클릭 핸들러
const handleAnswerClick = (type, index) => {
  setSelectedAnswerIndex(index); // 클릭한 답변의 인덱스를 설정

  // 선택한 답변을 저장
  setSelectedAnswers((prev) => {
    const updatedAnswers = [...prev];
    updatedAnswers[currentQuestion] = index;
    return updatedAnswers;
  });

  setTimeout(() => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [type]: prevAnswers[type] + 1,
      };

      // 특정 질문의 답변 추적
      const newSpecificAnswers = { ...specificAnswers };

      if (shuffledQuestions[currentQuestion]?.text === '부동산 계약을\n전자문서로 한다고?') {
        newSpecificAnswers.question1 = index === 0 ? 'X' : 'O';
      } else if (shuffledQuestions[currentQuestion]?.text === '오늘 본 집이 마음에 들어서\n직거래하자고 연락이 왔다.\n당신의 선택은?') {
        newSpecificAnswers.question2 = index === 0 ? 'X' : 'O';
      }

      setSpecificAnswers(newSpecificAnswers); // 새로운 specificAnswers 설정

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < shuffledQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswerIndex(selectedAnswers[nextQuestion] || null); // 이전에 선택한 답변 유지
      } else {
        // 비동기적으로 라우팅을 처리하여 상태 업데이트와 충돌을 방지합니다.
        setTimeout(() => {
          navigate('/user-info', { state: { answers: updatedAnswers, specificAnswers: newSpecificAnswers } });
        }, 0); // 상태 
      }
      return updatedAnswers;
    });
  }, 200); // 다음 질문 딜레이
};

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      const previousQuestion = currentQuestion - 1;
      setCurrentQuestion(previousQuestion);
      setSelectedAnswerIndex(selectedAnswers[previousQuestion] || null);
    }
  };

  // 프로그레스 바 너비 계산
  const progressPercentage = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    
    <div className="h-screen flex flex-col justify-center items-center font-title">
      <Header />
      {shuffledQuestions[currentQuestion] ? (
        <div className="flex flex-col h-full max-w-md w-full bg-gray-100 py-8 px-8 font-title gap-16">
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row justify-between items-center font-body text-md'>
              {/* 이전 문제 버튼 */}
              <button
                  onClick={handlePreviousClick}
                  disabled={currentQuestion === 0}
                  className={`${currentQuestion === 0 ? 'text-gray-200' : 'text-black'} flex flex-row items-center gap-1`}
              >
                <PreviousIcon className={`${currentQuestion === 0 ? 'stroke-gray-200' : 'stroke-black'}`}/>이전 문제
              </button>
              <div className='flex flex-row gap-1 font-bold'>
                <div className="text-primary-400">{currentQuestion + 1}</div><div>/ {questions.length}</div>
              </div>
            </div>
            {/* 프로그레스 바 */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-primary-400 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className='flex flex-col gap-2'>
            {/* 질문 번호 */}
            <div className="text-xl text-center mb-2.5">{`Q${currentQuestion + 1}.`}</div>
            {/* 상단 질문 영역 */}
            <div className="text-center text-xl md:text-2xl whitespace-pre-line">
              {shuffledQuestions[currentQuestion]?.text}
            </div>
          </div>
          {/* 하단 버튼 영역 */}
          <div className="grid gap-6 mt-4">
            {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
              // <button key={index} onClick={() => handleAnswerClick(option.type)} style={{ whiteSpace: 'pre-wrap' }} className="button-quiz">
              //   {option.text}
              // </button>
              <button
              key={index}
              onClick={() => handleAnswerClick(option.type, index)}
              className={`button-quiz transition-colors shadow-[0_3px_1px_0_rgba(17,17,17,1)] ${
                selectedAnswerIndex === index
                  ? 'bg-primary-400 text-white border-4 border-solid border-black'
                  : 'bg-white text-black border-4 border-solid border-black'
              }`}
              style={{ whiteSpace: 'pre-wrap'}}
            >
              {option.text}
            </button>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Quiz;