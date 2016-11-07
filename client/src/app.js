var taskInput = document.getElementById("new_task"); //new Task
var addButton = document.getElementById('add_task'); // first button
var incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete Tasks
var completedTasksHolder = document.getElementById("completed_tasks");  //completed Tasks

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  //children of listItem
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";  
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";  

  label.innerText = taskString;
  //append children to parent listItem
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  //return listItem with children
  return listItem;
};

var addTask = function() {
    console.log('addTask');
    // create new list item
    var listItem = createNewTaskElement(taskInput.value);
    // append new list item
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

var editTask = function() {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass){
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //remove child from ul
    ul.removeChild(listItem);
};

var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(item, checkboxEvent) {
  var checkBox = item.querySelector("input[type=checkbox]");
  var editButton = item.querySelector("button.edit");
  var deleteButton = item.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxEvent;
  
};

var ajaxRequest = function() {
  console.log("AJAX requested");
};
//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle through incompleteTasksHolder ul list items
for(var i=0, l=incompleteTasksHolder.children.length; i<l; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


//cycle through completedTasksHolder ul list items
for(var i=0, l=completedTasksHolder.children.length; i<l; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
console.log(incompleteTasksHolder.children);

