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
