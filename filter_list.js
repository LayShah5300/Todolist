    function filterTodo(e) {

        const todos = todoList.childNodes;
        // console.log(todos);
        //    console.log(e.target.value);

        todos.forEach(function (todo) {

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

module.exports = {
    filterTodo
};