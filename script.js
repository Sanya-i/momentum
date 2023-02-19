

// Изменение времени //
function showTime() {
  let time = document.querySelector(".time");
  const date = new Date();
  const currentTimes = date.toLocaleTimeString();
  time.textContent = currentTimes;
  setTimeout(showTime, 1000);
};

showTime();

// Изменение даты //
function showDate() {
  let data = document.querySelector(".date");
  const date = new Date();
  const options = { weekday: "long", month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-US', options);
  data.textContent = currentDate;
  setTimeout(showDate, 1000);
};
showDate();

//приветствие //
function showGreeting() {
  const dateHello = new Date();
  const hours = dateHello.getHours();

  let greeting = document.querySelector(".greeting");
  function getTimeOfDay() {
    if (hours >= 0 && hours < 6) {
      return "night"
    } else if (hours >= 6 && hours < 12) {
      return "morning"
    } else if (hours >= 12 && hours < 18) {
      return "afternoon"
    } else if (hours >= 18 && hours < 24) {
      return "evening"
    }
  }
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay},`;
  greeting.textContent = greetingText;
  setTimeout(showGreeting, 1000);
};
showGreeting();
//сохранение введенного имени//
const name = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);


//Фоновая картинка//

const body = document.getElementsByTagName('body')[0];;

body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/')";

function getRandomNum() {
  return String(getRandomIntInclusive(1, 20)).padStart(2, '0')
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum();

const dateHello = new Date();
const hours = dateHello.getHours();

let greeting = document.querySelector(".greeting");
function getTimeOfDay() {
  if (hours >= 0 && hours < 6) {
    return "night"
  } else if (hours >= 6 && hours < 12) {
    return "morning"
  } else if (hours >= 12 && hours < 18) {
    return "afternoon"
  } else if (hours >= 18 && hours < 24) {
    return "evening"
  }
};
const timeOfDay = getTimeOfDay();


function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  };
}
setBg();

//Слайдер//

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


function getSlideNext() {
  let numRandom = +randomNum;
  numRandom++
  if (numRandom > 20) numRandom = 1;

  randomNum = (String(numRandom).padStart(2, '0'));
  setBg();

};

function getSlidePrev() {
  let numRandom = +randomNum;
  numRandom--
  if (numRandom < 1) numRandom = 20;

  randomNum = (String(numRandom).padStart(2, '0'));
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

//Погода//

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eng&appid=3642f595815943223c6228f6a3335991&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404') {
    weatherError.textContent = `Error! city not found for ${city.value}'!`;
    temperature.textContent = null;
    weatherDescription.textContent = null;
    wind.textContent = null;
    humidity.textContent = null;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
    weatherError.textContent = null;
  }
}




function setCityLocalStorage() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setCityLocalStorage);

function getCityLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getCityLocalStorage);


city.addEventListener('change', getWeather);


function getCity() {
  city.value = localStorage.getItem('city') ?? 'Minsk';
  getWeather();
}

getCity()




/// цитаты ///

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  let randomQuote = getRandomQuote(0, 11);
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[randomQuote].author;
  author.textContent = data[randomQuote].text;
}

function getRandomQuote(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);

/// Плейер ///

const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const muteBtn = document.querySelector('.mute');
const volumeDownBtn = document.querySelector('.volume-down');
const volumeUpBtn = document.querySelector('.volume-up');
const nameTrack = document.querySelector('.name-track');
let currTime = document.querySelector('.curr-time');
let totalTime = document.querySelector('.total-time');
let seekBar = document.querySelector('.seek-bar');
let volumeBar = document.querySelector('.volume-bar');
let playNum = 0;
let updateTimer;
let isPlay = false;
let currTrack = document.createElement('audio');

const audio = new Audio();




function playAudio() {
  if (isPlay == true) {
    pauseAudio();
   
  } else {
    audio.src = playList[playNum].src;
    nameTrack.textContent = `${playList[playNum].title}`
    audio.play();
    play.classList.add('pause');
    isPlay = true;
    activeTrack()
  }

};

function pauseAudio() {
  const playItem = document.querySelectorAll('.play-item');
  playItem.forEach(element => {

    element.classList.remove('play-active')
  });
  play.classList.remove('pause');
  audio.pause();
  isPlay = false;
}

play.addEventListener('click', playAudio);

function playNext() {
  playNum++
  if (playNum >= playList.length) playNum = 0;
  isPlay = false;

  playAudio()
};
function playPrev() {
  playNum--
  if (playNum < 0) playNum = (playList.length - 1);
  isPlay = false;
  playAudio()
};

playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = `${playList[i].title}`;
  playListContainer.append(li);
};

function activeTrack() {
  const playItem = document.querySelectorAll('.play-item');
  playItem.forEach(element => {
    element.classList.remove('item-active')
    element.classList.remove('play-active')
  });
  playItem[playNum].classList.add('item-active');
  playItem[playNum].classList.add('play-active');
}
audio.addEventListener("ended", playNext)

let isVolume = true;

function mute() {
  if (isVolume == true) {
    audio.muted = true;
    muteBtn.classList.add('volume');
    isVolume = false;
  } else {
    muteBtn.classList.remove('volume');
    audio.muted = false;
    isVolume = true;
  }
}

muteBtn.addEventListener('click', mute);

function updateProgressValue() {
  seekBar.max = audio.duration;
  seekBar.value = audio.currentTime;
  currTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
 
   
 
    totalTime.innerHTML = (formatTime(Math.floor(audio.duration)));
  
};

setInterval(updateProgressValue, 500);


function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
};

function changeProgressBar() {
  audio.currentTime = seekBar.value;
}
function changeProgressVolumeBar() {
  audio.volume = (volumeBar.value) * 0.01;
}


function volumeUp() {
  audio.volume = + audio.volume + 0.1;
}
function volumeDown() {
  audio.volume = + audio.volume - 0.1;
}

volumeDownBtn.addEventListener('click', volumeDown);
volumeUpBtn.addEventListener('click', volumeUp);

function updateVolume() {

  volumeBar.value = (audio.volume) * 100;
}

setInterval(updateVolume, 300);



document.querySelectorAll('.play-item').forEach((li, index) => {

  li.addEventListener('click', function () {
    playNum = index;
    audio.src = playList[playNum].src;
    if (li.classList.contains('play-active')) {
      pauseAudio()
    } else {
      isPlay = false;
      playAudio()
    }


  })

})

/// Тodo List 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask)




function addTask (event) {
  event.preventDefault();

 const taskText = taskInput.value;

 const taskHTML =   `<li class="list-group-item d-flex justify-content-between task-item">
 <div class="task-title">${taskText}</div>
 <div class="task-item__buttons">
   <button type="button" data-action="done" class="btn-action">
     <img src="./assets/svg/tick.svg" alt="Done" width="18" height="18">
   </button>
   <button type="button" data-action="delete" class="btn-action">
     <img src="./assets/svg/cross.svg" alt="Done" width="18" height="18">
   </button>
 </div>
</li>`;
tasksList.insertAdjacentHTML('beforeend', taskHTML);
taskInput.value = "";
taskInput.focus();

if (tasksList.children.length > 1) {
  emptyList.classList.add('none')
 }
 saveHTMLtoLS();
}

function deleteTask (e) {
  if (e.target.dataset.action === "delete") {
    const parentNode = e.target.closest('.list-group-item');
    parentNode.remove();
    if (tasksList.children.length == 1) {
      emptyList.classList.remove('none')
    }
  
  }
  saveHTMLtoLS();
};

tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function doneTask (e) {
  if (e.target.dataset.action === "done") {
    const parentNode = e.target.closest('.list-group-item');
   taskTitle =  parentNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done');
  }
  saveHTMLtoLS();
};

if (localStorage.getItem('tasksHTML')) {
  tasksList.innerHTML = localStorage.getItem('tasksHTML')
}
function saveHTMLtoLS() {
  localStorage.setItem('tasksHTML', tasksList.innerHTML)
};