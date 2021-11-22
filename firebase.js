import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.5.0/firebase-database.min.js";

// конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkN3yTFSzr1y4DCgqvj_xZj6xnNKE9cy4",
  authDomain: "sense-of-time.firebaseapp.com",
  databaseURL:
    "https://sense-of-time-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sense-of-time",
  storageBucket: "sense-of-time.appspot.com",
  messagingSenderId: "1021138154123",
  appId: "1:1021138154123:web:eadb6712fd52fe7823da8e",
};

// инициализирует Firebase
const app = initializeApp(firebaseConfig);

// отправляет результаты опроса на сервер
const submitAnswers = () => {
  const gender = getCheckedRadio("gender");
  const yearOfBirth = document.getElementById("year-of-birth").value;
  const permKraiLiving = getCheckedRadio("perm-krai-living");
  const education = document.getElementById("education").value;
  const profession = document.getElementById("profession").value;
  const activites = getActivities();

  const data = {
    Gender: gender,
    Year: yearOfBirth,
    PremKrai: permKraiLiving,
    Education: education,
    Profession: profession,
    Activities: activites,
  };

  const database = getDatabase();

  set(ref(database, "data/"), {
    data: data,
  });
};

const submit = document.getElementById("submit");
submit.addEventListener("click", submitAnswers);
