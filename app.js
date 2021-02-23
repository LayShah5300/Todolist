//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".form-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

//Functions
function addTodo(event){
    //prevent from submitting

    event.preventDefault();

    //todo Div

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li

    const newTodo = document.createElement("li");
    //newTodo.firstElementChild= todoInput.value;
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to local storage

    saveLocalTodos(todoInput.value);

    //Tick Mark Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.append(completedButton);

    //Trash Button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.append(trashButton);

    //Append List
    todoList.appendChild(todoDiv);

    //Clear i/p value
    todoInput.value="";
}

function deleteCheck(e) {
   // console.log(e.target);

   const item = e.target;
   
   //delete from list

   if (item.classList[0] === "trash-btn") {
       const todo = item.parentElement;
       //Animation 
       todo.classList.add("fall");
       removeLocalTodos(todo);  
       todo.addEventListener('transitionend',function name() {

           todo.remove();  
       
        });

   }

   //tick-off

   if(item.classList[0] === "complete-btn")
   {
       const todo = item.parentElement;
       todo.classList.toggle("completed");
   }
}

// Filter the list

function filterTodo(e) {

   const todos = todoList.childNodes;
  // console.log(todos);
//    console.log(e.target.value);
    
    todos.forEach(function(todo) {

        switch(e.target.value)
        {
        case "all":
            todo.style.display = "flex";
            break;

        case "completed":
             if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            }
            else{
                todo.style.display = "none";
            }
            break;
            case "pending":
            if(!todo.classList.contains("completed")){
                todo.style.display = "flex";
            }
            else {
                todo.style.display = "none";
            }
            break;
       }
             });
}
    

// Local Storage

function saveLocalTodos(todo) {

    //Check already value present or not

    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];

    }
    else{

        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];

    }
    else {

        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
    
        //todo Div

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create li

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
  
        //Tick Mark Button

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.append(completedButton);

        //Trash Button

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.append(trashButton);

        //Append List
        todoList.appendChild(todoDiv);

        
        
    });

}

function removeLocalTodos(todo) {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];

    }
    else {

        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}



//search try 3

const searchBar = document.forms["search-list"].querySelector("input");


searchBar.addEventListener("keyup", function (e) {

    const term = e.target.value.toLowerCase();
    const searched = todoList.getElementsByTagName("li");
    
    Array.from(searched).forEach(function (todo) {

    
        const title = todo.textContent;
        if (title.toLowerCase().indexOf(term) != -1) {

            todo.style.display = "flex";

        }

        else {
            todo.style.display = "none";
        }

    })

})

