$(function () {
    $(".eat-burger").on("click", function (event) {
        var id = $(this).data("id");
        var eaten = true;

        var devouredState = {
            devoured: eaten
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                console.log("changed devoured to", eaten);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger: $("#newBurger").val().trim()
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger - " + newBurger);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
