// Firebase SDK에서 필요한 함수들 가져오기
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid'; // UUID를 사용하여 고유 ID 생성

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: "AIzaSyCDPT5VSNSsqLeuFGfYXQL8i6WFY3r004M",
  authDomain: "godmulju-3b74e.firebaseapp.com",
  projectId: "godmulju-3b74e",
  storageBucket: "godmulju-3b74e.appspot.com",
  messagingSenderId: "388543139721",
  appId: "1:388543139721:web:030eb5b93a6488ec1a9b58",
  measurementId: "G-TTR21FCJMB"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 생성
const db = getFirestore(app);

// 다른 파일에서 사용할 수 있도록 내보내기
export { db };

// 중복 확인 후 데이터 저장 함수
export const saveUserData = async (userData) => {
  try {
    // IP 주소 가져오기
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIP = data.ip;

    // Firestore에서 기존에 같은 IP로 저장된 데이터가 있는지 확인
    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, where("userIP", "==", userIP));
    const querySnapshot = await getDocs(q);
    const referrer = document.referrer; // 유입 경로

    let docId;
    if (querySnapshot.empty) {
      // 기존 데이터가 없으면 새로운 문서 ID 생성
      docId = uuidv4();
    } else {
      // 기존 데이터가 있으면 해당 문서 ID를 가져와서 덮어쓰기
      docId = querySnapshot.docs[0].id;
    }

    // Firestore에 데이터 저장 (있으면 덮어쓰기)
    await setDoc(doc(submissionsRef, docId), {
      referrer: referrer,
      submissionId: docId,
      userIP: userIP,
      age: userData.age,
      role: userData.role,
      quizResponses: userData.quizResponses,
      entrySource: userData.entrySource
    });

    console.log("데이터 저장 성공");
  } catch (error) {
    console.error("데이터 저장 오류: ", error);
  }
};