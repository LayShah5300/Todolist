function deleteCheck(e) {
    // console.log(e.target);

    const item = e.target;

    //delete from list

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function name() {

            todo.remove();

        });

    }

    //tick-off

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

module.exports = deleteCheck