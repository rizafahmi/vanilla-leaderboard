import uuid from 'lil-uuid';
import dayjs from 'dayjs';
import ConfettiGenerator from 'confetti-js';
import xStore from 'xStore';

import render from './ui.js';
import randomize from './utils.js';

const store = new xStore('leaderboard_', localStorage);

// Seed data
let data = [];
const dataFromDb = store.get('data');
if (dataFromDb && dataFromDb.length > 0) {
  data = store.get('data');
} else {
  data = [
    {
      id: uuid(),
      name: 'Dan Abramov',
      score: 50,
      updatedAt: dayjs().toDate()
    },
    {
      id: uuid(),
      name: 'Evan You',
      score: 30,
      updatedAt: dayjs().toDate()
    },
    {
      id: uuid(),
      name: 'Rich Harris',
      score: 15,
      updatedAt: dayjs().toDate()
    }
  ];
}

render(data);

const form = document.querySelector('form');

form.onsubmit = function(event) {
  event.preventDefault();

  const confetti = new ConfettiGenerator({
    target: 'confetti-canvas',
    animate: true,
    width: 800,
    height: document.querySelector('.paper.container').offsetHeight
  });

  const nameInput = document.querySelector('#name');

  const name = nameInput.value;
  const score = randomize();
  const id = uuid();
  const updatedAt = dayjs().toDate();

  data.push({ id, name, score });
  nameInput.value = '';
  render(data);

  document.querySelector('#confetti-canvas').style['z-index'] = 1;
  confetti.render();
  setTimeout(() => {
    confetti.clear();
    document.querySelector('#confetti-canvas').style['z-index'] = -1;
  }, 3000);
};

// Page Visibility API
document.onvisibilitychange = function() {
  store.set({
    data
  });
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
