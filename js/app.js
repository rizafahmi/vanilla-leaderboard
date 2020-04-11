const data = [
  { id: 1, name: 'Dan Abramov', score: 50 },
  { id: 2, name: 'Evan You', score: 30 },
  { id: 3, name: 'Rich Harris', score: 15 }
];

function render() {
  const li = document.getElementById('list-item').innerHTML;
  let newLi = '';

  let newList = data
    .sort((a, b) => parseInt(b.score) - parseInt(a.score))
    .map((d, i) => {
      return li
        .replace(/{{index}}/g, i)
        .replace(/{{name}}/g, d.name)
        .replace(/{{score}}/g, d.score);
    });

  document.getElementById('list').innerHTML = newList.join('');
}

render();

const form = document.querySelector('form');
form.onsubmit = function(event) {
  event.preventDefault();

  const nameInput = document.querySelector('#name');

  const name = nameInput.value;
  const score = Math.floor(Math.random() * 100);

  data.push({ name, score });
  nameInput.value = '';
  render();
};
