const deleteCheck = require("./deletetCheck");



it("displays another css when task complete button clicked", () => {
    const $ = require("jquery");
    $(".complete-btn").click();
    $(".trash-btn").click();
    expect($(".todo").hasClass("completed"));
});

it("displays another css when task complete button clicked", () => {
    const $ = require("jquery");
    $(".trash-btn").click();
    expect($(".todo").hasClass("fall"));
});