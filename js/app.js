const data = [
  { id: 1, name: 'Dan Abramov', score: 50 },
  { id: 2, name: 'Evan You', score: 30 },
  { id: 3, name: 'Rich Harris', score: 15 }
];
console.log(data);

const li = document.getElementById('list-item').innerHTML;
let newLi = '';

for (let i = 0; i < data.length; i++) {
  newLi += li
    .replace(/{{index}}/g, i)
    .replace(/{{name}}/g, data[i]['name'])
    .replace(/{{score}}/g, data[i]['score']);
}

document.getElementById('list').innerHTML = newLi;
