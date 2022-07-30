const input = document.querySelector("[type=text]");
const submit = document.querySelector("form");
const tasksSection = document.querySelector(".tasks");
const tasks = [];
let index = 0;

const localStorageItems = window.localStorage.getItem("tasks");

if (localStorageItems !== null) {
  for (let i = 0; i < JSON.parse(localStorageItems).length; i += 1) {
    createTask(JSON.parse(localStorageItems)[i].title, tasksSection);
  }
}

submit.onsubmit = function (event) {
  event.preventDefault();
  index += 1;
  if (input.value !== "") {
    createTask(input.value, tasksSection);

    tasks.push({
      id: index,
      title: input.value,
    });

    window.localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    input.focus();
  } else {
    window.alert("Input mustn't be empty");
  }
};

function createTask(taskValue, parent) {
  const task = document.createElement("div");
  const taskText = document.createTextNode(taskValue);
  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("Delete");

  task.className = "task";
  deleteButton.className = "delete";
  deleteButton.append(deleteButtonText);
  task.append(taskText);
  task.append(deleteButton);

  parent.append(task);

  deleteButton.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    const tasksElements = document.querySelectorAll(".task");
  });
}
