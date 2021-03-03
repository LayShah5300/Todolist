$(document).ready(function ($) {
    $('form').submit(function () {
        if ($('.input').val() !== '') {
            var newTask = $('.input').val();
            var newDiv = $('<div></div>', {
                class: 'todo'
            })
            var newCheckButton = $(
                '<button class="complete-btn"><i class="fas fa-check"></i></button>')
            var newDelButton = $(
                '<button class="trash-btn"><i class="fas fa-trash"></i></button>')
            var newLi = $('<li class="list__item">' + newTask + '</li>');
            newDelButton.on('click', function () {
                newDiv.remove(); // Attach the event handler *before* adding the element
            });
            newCheckButton.on('click', function () {
                newDiv.toggleClass("completed");                
            })
            $('ul').prepend(newDiv);
            newDiv.prepend(newLi); // To put the new task at the top of the list
            newDiv.append(newCheckButton);
            newDiv.append(newDelButton);
            $('.input').val('');
            return false; // So the change persists
        }
    });
});
