const store = new xStore('leaderboard_', localStorage);

// Seed data
let data = [];
const dataFromDb = store.get('data');
if (dataFromDb && dataFromDb.length > 0) {
  data = store.get('data');
} else {
  data = [
    {
      id: lil.uuid(),
      name: 'Dan Abramov',
      score: 50,
      updatedAt: dayjs().toDate()
    },
    {
      id: lil.uuid(),
      name: 'Evan You',
      score: 30,
      updatedAt: dayjs().toDate()
    },
    {
      id: lil.uuid(),
      name: 'Rich Harris',
      score: 15,
      updatedAt: dayjs().toDate()
    }
  ];
}

render();

const form = document.querySelector('form');

form.onsubmit = function(event) {
  event.preventDefault();

  const nameInput = document.querySelector('#name');

  const name = nameInput.value;
  const score = Utils.randomize();
  const id = lil.uuid();
  const updatedAt = dayjs().toDate();

  data.push({ id, name, score });
  nameInput.value = '';
  render();
  confetti.start(1000);
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
