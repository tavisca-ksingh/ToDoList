var taskInput=document.getElementById("add-new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTask=document.getElementById("incomplete-tasks");
var completedTasks=document.getElementById("completed-tasks");

var createNewTaskElement=function(taskString){
	var { label, checkBox, editInput, editButton, deleteButton, listItem } = createElements();

	label.innerText=taskString;

	checkBox.type="checkbox";
	editInput.type="text";
	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

function createElements() {
	
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
	var editInput = document.createElement("input");
	editInput.disabled=true;
    var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");
	
    return { label, checkBox, editInput, editButton, deleteButton, listItem };
}

var addTask=function(){
	if(taskInput.value!='')
	{
	var listItem=createNewTaskElement(taskInput.value);
	incompleteTask.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	
	}
	taskInput.value="";
}



var editTask=function(){
	var listItem=this.parentNode;
	var editInput=listItem.querySelector('input[type=text]');
	var label=listItem.querySelector("label");
	var containsClass=listItem.classList.contains("editMode");
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		listItem.classList.toggle("editMode");
}


var deleteTask=function(){
		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);

}
 

var taskCompleted=function(){
	var listItem=this.parentNode;
	completedTasks.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
	var listItem=this.parentNode;
	incompleteTask.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<incompleteTask.children.length;i++){
		bindTaskEvents(incompleteTask.children[i],taskCompleted);
	}

	for (var i=0; i<completedTasks.children.length;i++){
		bindTaskEvents(completedTasks.children[i],taskIncomplete);
	}  


