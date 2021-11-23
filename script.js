const taskList = document.getElementById('lista-tarefas');
const taskText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const deleteAllBUtton = document.getElementById('apaga-tudo');
const deleteCompletedButton = document.getElementById('remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');

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

function removerCompletos() {
  const elements = document.querySelectorAll('.completed');

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].remove();
  }
}
function elementToObject(elementText, elementClass) {
  return { text: elementText,
    class: elementClass };
}

function saveList() {
  const elements = document.querySelectorAll('#lista-tarefas li');
  const listItems = [];
  let elementText;
  let classCompleted;
  for (let i = 0; i < elements.length; i += 1) {
    elementText = elements[i].innerText;
    if (elements[i].classList.contains('completed')) {
      classCompleted = true;
    } else {
      classCompleted = false;
    }
    listItems.push(elementToObject(elementText, classCompleted));
  }

  localStorage.setItem(taskList, JSON.stringify(listItems));
}

addTaskButton.addEventListener('click', adicionarTarefa);
deleteAllBUtton.addEventListener('click', removeTodos);
deleteCompletedButton.addEventListener('click', removerCompletos);
saveButton.addEventListener('click', saveList);
