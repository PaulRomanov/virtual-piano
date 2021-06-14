const keys = document.querySelectorAll('.piano-key'); //нахожу все клавиши класса piano-key

//при нажатии мышкой
function playAudio(e) {
  const key = e.target; // узнали по какой клавише кликнули
  const note = document.getElementById(key.dataset.note); // нахожу все src audio
  note.currentTime = 0; //запускает проигрывание с начала трека
  note.play();
  key.classList.toggle('playing'); // добавляем класс playing
}

keys.forEach(key => {
  key.addEventListener('mousedown', playAudio); // при нажатии мышкой запускает функцию playAudio

});


window.addEventListener('mouseup', function (e) {
  keys.forEach(key => {
    key.classList.remove('playing') // при отпускании мышки удаляет класс playing
  });
})

// при движении мыши с зажатой клавишей

const piano = document.getElementById('piano');

const startSound = function (event) {
  event.target.classList.add('playing');
  const key = event.target; // узнали по какой клавише кликнули
  const note = document.getElementById(key.dataset.note);
  note.currentTime = 0; //запускает проигрывание с начала трека
  note.play();
}

const stoptSound = function (event) {
  event.target.classList.remove('playing');
}

//передаем event, получаем target и каждому эл-ту коллекции  keys задаем новый Listener, как только на него наводим запускаем startSound
const startOver = function (event) {
  event.target.classList.add('playing'); //по первому нажатию появляется класс playing
  keys.forEach(function (elem) {
    elem.addEventListener('mouseover', startSound)
    elem.addEventListener('mouseout', stoptSound)
  });
}

const stopOver = function (event) {
  event.target.classList.remove('playing');
  keys.forEach(function (elem) {
    elem.removeEventListener('mouseover', startSound)
    elem.removeEventListener('mouseout', stoptSound)
  });
}
// задаем Listener который реагирует на mousedown и mouseup
piano.addEventListener('mousedown', startOver, false); //false - убирает зажим мышки на элементе
piano.addEventListener('mouseup', stopOver); // останавливает реагирование на наведение мышки



//при нажатии на клавиатуру

window.addEventListener('keydown', function (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing'); //вместо add - toggle убирает залипание

  if (e.repeat) return;
  audio.currentTime = 0;
  audio.play();
});

//перебирает все keys и запустит call-back removeTransition
const keysKeybord = document.querySelectorAll('.piano-key');
window.addEventListener('keyup', function (e) {
  keysKeybord.forEach(key => {
    key.classList.remove('playing')
  });
})


//FullScreen

document.querySelector('.openfullscreen').addEventListener('click', function (e) {
  if (e.target) {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}


//Notes/Letters

const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

//при нажатии на Letters добавляю класс active и удаляю его у Notes
btnLetters.addEventListener('click', function(event){ 
  event.target.classList.add('btn-active');
  btnNotes.classList.remove('btn-active');
  //т.к.  keys псевдомассив перебераем его
  keys.forEach(key => {
    key.classList.add('piano-key-letter');
  });

}) 

btnNotes.addEventListener('click', function(event){
  event.target.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');

  keys.forEach(key => {
    key.classList.remove('piano-key-letter');
  });
}) 

