
export const searchBar = document.forms["search__list"].querySelector("input");
/**
 * Function for searching from list 
 */
export function searchList() {
    
 searchBar.addEventListener("keyup", function (e) {

    const term = e.target.value.toLowerCase();
    const searched = todoList.getElementsByTagName("li");
    const delelement = document.getElementsByClassName(".todo");

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
}