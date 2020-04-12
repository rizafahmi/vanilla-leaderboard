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

function randomize() {
  return Math.floor(Math.random() * 100);
}

function render() {
  const li = document.getElementById('list-item').innerHTML;

  let newList = data
    .sort((a, b) => parseInt(b.score) - parseInt(a.score))
    .map((d) => {
      dayjs.extend(dayjs_plugin_relativeTime);
      const daysAgo = dayjs().from(dayjs(d.updatedAt));
      return li
        .replace(/{{id}}/g, d.id)
        .replace(/{{name}}/g, d.name)
        .replace(/{{daysAgo}}/g, daysAgo)
        .replace(/{{score}}/g, d.score);
    });

  document.getElementById('list').innerHTML = newList.join('');

  // Attach onclick
  const incrButtons = document.querySelectorAll('.btn-success');
  const decrButtons = document.querySelectorAll('.btn-danger');

  for (let i = 0; i < incrButtons.length; i++) {
    incrButtons[i].onclick = function() {
      const id = incrButtons[i].dataset.id;
      const changeData = data.find((d) => d.id === id);
      const index = data.indexOf(changeData);
      data[index].score = data[index].score + randomize();
      data[index].updatedAt = dayjs();

      render();
      const container = document.querySelector(`#container-${id}`);
      container.classList.add('background-secondary');

      setInterval(function() {
        container.classList.remove('background-secondary');
      }, 1500);
    };

    decrButtons[i].onclick = function() {
      const id = decrButtons[i].dataset.id;
      const changeData = data.find((d) => d.id === id);
      const index = data.indexOf(changeData);
      data[index].score = data[index].score - randomize();
      data[index].updatedAt = dayjs();

      render();
    };
  }
}

render();

const form = document.querySelector('form');

form.onsubmit = function(event) {
  event.preventDefault();

  const nameInput = document.querySelector('#name');

  const name = nameInput.value;
  const score = randomize();
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
