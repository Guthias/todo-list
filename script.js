const taskList = document.getElementById('lista-tarefas');
const taskText = document.getElementById('texto-tarefa');
const addTaskButton = document.getElementById('criar-tarefa');
const deleteAllBUtton = document.getElementById('apaga-tudo');
const deleteCompletedButton = document.getElementById('remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
const removeItemButton = document.getElementById('remover-selecionado');

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

function adicionarTarefa(text, completed = false) {
  const newTask = document.createElement('li');
  newTask.innerText = text;

  listItemEvents(newTask);

  if (completed) {
    newTask.className = 'completed';
  }

  taskList.appendChild(newTask);
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

  localStorage.setItem('taskList', JSON.stringify(listItems));
}

function loadList() {
  let listItems = localStorage.getItem('taskList');
  let elementText;
  let completed;
  listItems = JSON.parse(listItems);

  for (let i = 0; i < listItems.length; i += 1) {
    elementText = listItems[i].text;
    completed = listItems[i].class;

    adicionarTarefa(elementText, completed);
  }
}

function moveUp() {
  const element = document.querySelector('.selected');
  if (!element) {
    return;
  }
  const referencePosition = element.previousSibling;

  if (referencePosition) {
    element.parentNode.insertBefore(element, referencePosition);
  }
}

function moveDown() {
  const element = document.querySelector('.selected');
  if (!element) {
    return;
  }
  const referencePosition = element.nextSibling;

  if (referencePosition) {
    referencePosition.after(element);
  }
}

function removeItem() {
  const element = document.querySelector('.selected');

  if (element) {
    element.remove();
  }
}

addTaskButton.addEventListener('click', () => {
  adicionarTarefa(taskText.value);
  taskText.value = '';
});

deleteAllBUtton.addEventListener('click', removeTodos);
deleteCompletedButton.addEventListener('click', removerCompletos);
saveButton.addEventListener('click', saveList);
moveUpButton.addEventListener('click', moveUp);
moveDownButton.addEventListener('click', moveDown);
removeItemButton.addEventListener('click', removeItem);

window.onload = () => {
  if (localStorage.getItem('taskList')) {
    loadList();
  }
};
