const taskList = document.getElementById('lista-tarefas');
const taskText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const deleteAllBUtton = document.getElementById('apaga-tudo');

function selectItem(event) {
  const elements = document.querySelectorAll('.selected');
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function completeItem(event) {
  const element = event.target;
  element.classList.remove('selected');
  element.classList.toggle('completed');
}

function listItemEvents(element) {
  element.addEventListener('click', selectItem);
  element.addEventListener('dblclick', completeItem);
}

function adicionarTarefa() {
  const newTask = document.createElement('li');
  const text = taskText.value;
  newTask.innerText = text;
  listItemEvents(newTask);
  taskList.appendChild(newTask);

  taskText.value = '';
}

function removeTodos() {
  const elements = document.querySelectorAll('#lista-tarefas li');

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].remove();
  }
}

addTaskButton.addEventListener('click', adicionarTarefa);
deleteAllBUtton.addEventListener('click', removeTodos);
