//import


//Selectors
/**
 * Form Input.
 * @type {HTMLElement}
 */
const todoInput = document.querySelector(".form__input");
const todoButton = document.querySelector(".form__button");
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter__todo");
const searchBar = document.forms["search__list"].querySelector("input");

//Event listeners

document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);
//todoButton.addEventListener("click", createList);

//Functions
/**
 * Add list of the tasks
 * @param {object} event - to get event object 
 * submit of form
 */
function addTodo(event){
    //prevent from submitting

    event.preventDefault();

    //Add todo Div
    /**
     * Creates a new todo Div
     */
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li

    const newTodo = document.createElement("li");
    //newTodo.firstElementChild= todoInput.value;
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo__item");
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
/**
 * TO perform Check and Remove on List
 * @param  {object} e - to find the target click.
 */
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

/**
 * Filter the list using function from filter_list js file
 * @param  {object} e - to perform event
 */
function filterTodo(e) {

    const todos = todoList.childNodes;
    // console.log(todos);
    //    console.log(e.target.value); 
    todos.forEach(todo => {

        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//  import { filter_the_list } from "./filter_list.js";
//  filter_the_list();    

// Local Storage
/**Perform Local Storage save.
 * @param  {String} todo - gets input text
 */
function saveLocalTodos(todo) {

    //Check if value is already present or not.

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
/**
 * Display The List by getting values from local storage
 */
function getTodos() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];

    }
    else {

        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
    
        //todo Div

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create li

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo__item");
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
/**
 * Remove the list from local storage
 * @param  {String} todo - gets the list item whose 
 * remove button is clicked.
 */
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

//Using the search function from searchlist js file.
// import "./search_list";
// import { search_the_list } from "./search_list.js";
// search_the_list();

searchBar.addEventListener("keyup", e => {

    const term = e.target.value.toLowerCase();
    const searched = todoList.getElementsByTagName("li");
    const delelement = document.getElementsByClassName(".todo");

    Array.from(searched).forEach(todo => {


        const title = todo.textContent;
        if (title.toLowerCase().indexOf(term) != -1) {

            todo.style.display = "flex";

        }

        else {
            todo.style.display = "none";
        }

    })

})

const todoButtonForHandleBar = document.querySelector(".form__button2")
todoButtonForHandleBar.addEventListener("click",addnew);

// to provide value to the template.
const todocontext = {
    "todos":  []
};
/**Perform Add list using HandleBars.
 * @param  {object} event
 */
function addnew(event) {
    event.preventDefault();

    const taskInput = {};
    taskInput["todoname"] = todoInput.value;
    todocontext.todos.push(taskInput);
    //console.log(todocontext);
    
    const todosource = document.getElementById("display-template").innerHTML;
    const todotemplate = Handlebars.compile(todosource);
    const todohtml = todotemplate(todocontext);

    const tododestination = document.querySelector(".todo__container");
    tododestination.innerHTML = todohtml;
    
    todoInput.value="";
}
