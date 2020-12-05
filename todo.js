
const toDoForm = document.querySelector(".todo__form"),
toDoInput = toDoForm.querySelector("input"),
pendingList = document.querySelector(".pending__list"),
finishedList = document.querySelector(".finished__list");

const PENDING = "pending";
const FINISHED = "finished";
let pending = [];
let finished = [];

function deleteToDo(event) {
const btn = event.target;
const li = btn.parentNode;
pendingList.removeChild(li);
const cleanToDos = pending.filter(function (toDo) {
  return toDo.id !== parseInt(li.id);
});
pending = cleanToDos;
saveToDos(PENDING, pending);
}

function deleteFinished(event) {
const btn = event.target;
const li = btn.parentNode;
finishedList.removeChild(li);
const cleanToDos = finished.filter(function (fin) {
  return fin.id !== parseInt(li.id);
});
finished = cleanToDos;
saveToDos(FINISHED, finished);
}

function moveToFinishedList(event) {
const btn = event.target;
const li = btn.parentNode;
pendingList.removeChild(li);
const cleanToDos = pending.filter(function (toDo) {
  return toDo.id !== parseInt(li.id);
});
pending = cleanToDos;
saveToDos();
let text = li.querySelector("span").innerHTML;
paintFinished(text);
}

function moveToPendingList(event) {
const btn = event.target;
const li = btn.parentNode;
finishedList.removeChild(li);
  
const cleanToDos = finished.filter(function (toDo) {
  return toDo.id !== parseInt(li.id);
});
finished = cleanToDos;
saveToDos(FINISHED, finished);

const delFins = finished.filter(function (fin) {
  return fin.id !== parseInt(li.id);
});
finished = delFins;
saveToDos(FINISHED, finished);

let text = li.querySelector("span").innerHTML;
paintPending(text);
}

function saveToDos() {
localStorage.setItem(PENDING, JSON.stringify(pending));
localStorage.setItem(FINISHED, JSON.stringify(finished));
}

function paintPending(text) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
const downBtn = document.createElement("button");
const span = document.createElement("span");
const newId = pending.length + 1;
downBtn.innerText = "v";
downBtn.addEventListener("click", moveToFinishedList);
delBtn.innerText = "x";
delBtn.addEventListener("click", deleteToDo);
span.innerText = text;
li.appendChild(delBtn);
li.appendChild(downBtn);
li.appendChild(span);
li.id = newId;
pendingList.appendChild(li);
const toDoObj = {
  text: text,
  id: newId
};
pending.push(toDoObj);
saveToDos(PENDING, pending);
}

function paintFinished(text) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
const downBtn = document.createElement("button");
const span = document.createElement("span");
const newId = pending.length + 1;
downBtn.innerText = "B";
downBtn.addEventListener("click", moveToPendingList);
delBtn.innerText = "x";
delBtn.addEventListener("click", deleteFinished);
span.innerText = text;
li.appendChild(delBtn);
li.appendChild(downBtn);
li.appendChild(span);

finishedList.appendChild(li);
const toDoObj = {
  text: text,
  id: newId
};
finished.push(toDoObj);
saveToDos(FINISHED, finished);
}

function handleSubmit(event) {
event.preventDefault();
const currentValue = toDoInput.value;
paintPending(currentValue);
toDoInput.value = "";
}

function loadToDos() {
const loadedPending = localStorage.getItem(PENDING);
const loadedFinished = localStorage.getItem(FINISHED);

if (loadedFinished !== null) {
  const parsedFinished = JSON.parse(loadedFinished);
  parsedFinished.forEach(function (toDo) {
    paintFinished(toDo.text);
  });
}
if (loadedPending !== null) {
  const parsedPending = JSON.parse(loadedPending);
  parsedPending.forEach(function (toDo) {
    paintPending(toDo.text);
  });
}
}

function init() {
loadToDos();
toDoForm.addEventListener("submit", handleSubmit);
}

init();