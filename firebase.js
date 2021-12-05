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

// получает значения выбранных кнопок (radio buttons)
const getCheckedRadio = (name) => {
  const radioButtons = document.getElementsByName(name);
  let value = null;
  for (let i = 0; i < radioButtons.length; i++)
    if (radioButtons[i].checked) {
      value = radioButtons[i].value;
      break;
    }
  return value;
};

// получает сферы деятельности
const getActivities = () => {
  let activities = [];
  const activityItems = document.getElementsByClassName("activities-item");
  for (let i = 0; i < activityItems.length; i++) {
    const name =
      activityItems[i].querySelector(".radio-container").children[0].name;
    const value = getCheckedRadio(name);
    const activity = { name: name, value: value };
    activities.push(activity);
  }
  return activities;
};

const checkData = (data) => {
  if (data.Gender === null) throw "Пожалуйста, выберите ваш пол.";
  if (data.Year === "") throw "Пожалуйста, введите год рождения.";
  if (data.PremKrai === null)
    throw "Пожалуйста, ответьте на вопрос о проживании в Пермском крае.";
  if (data.Education === "") throw "Пожалуйста, напишите ваше образование.";
  if (data.Profession === "") throw "Пожалуйста, напишите вашу профессию.";
  data.Activities.forEach((activity) => {
    if (activity.value === null)
      throw "Пожалуйста, ответьте на вопрос про сферы деятельности.";
  });
};

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
    version: VERSION,
  };

  try {
    checkData(data);
  } catch (e) {
    alert(e);
    return;
  }

  console.log(data);

  // const database = getDatabase();

  // set(ref(database, "data/"), {
  //   data: data,
  // });
};

const submit = document.getElementById("submit");
submit.addEventListener("click", submitAnswers);
