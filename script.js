const taskList = document.getElementById('lista-tarefas');
const taskText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');

function adicionarTarefa() {
  const newTask = document.createElement('li');
  const text = taskText.value;
  newTask.innerText = text;
  taskList.appendChild(newTask);
}

addTaskButton.addEventListener('click', adicionarTarefa);
