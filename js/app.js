const store = new xStore('prefix', localStorage);

// Seed data
let data = [];
if (store.get('data').length > 0) {
  data = store.get('data');
} else {
  data = [
    { id: lil.uuid(), name: 'Dan Abramov', score: 50 },
    { id: lil.uuid(), name: 'Evan You', score: 30 },
    { id: lil.uuid(), name: 'Rich Harris', score: 15 }
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
      return li
        .replace(/{{id}}/g, d.id)
        .replace(/{{name}}/g, d.name)
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
      render();
    };

    decrButtons[i].onclick = function() {
      const id = decrButtons[i].dataset.id;
      const changeData = data.find((d) => d.id === id);
      const index = data.indexOf(changeData);
      data[index].score = data[index].score - randomize();
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

  data.push({ id, name, score });
  nameInput.value = '';
  render();
};

// Page Visibility API
document.onvisibilitychange = function() {
  store.set({
    data
  });
};
