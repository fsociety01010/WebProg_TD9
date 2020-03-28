$(document).ready(() => {
    $("#DNA").submit(function(event) {
        event.preventDefault()
        $.ajax({
            url: "/" + $("#username").val() + "/distance?A=" + $("#A").val() + "&B=" + $("#B").val(),
            success: function(data) {
                $("#UserRes").text("User: " + data.user)
                $("#DateRes").text("Date: " + data.date)
                $("#A_res").text("A: " + data.A)
                $("#B_res").text("B: " + data.B)
                $("#DistanceRes").text("Distance: " + data.distance)
                $("#nbRequestRes").text("Number of requests : " + data.nbRequest),
                    $("#Results").fadeIn(10000, linear)
            },
            error: function(data) {
                console.log("Error has beeb detected")
                console.log("Username : " + data.user + "\n")
                console.log("Status : " + status + "\n")
                console.log("Error : " + JSON.parse(data.responseText).error)

                alert(JSON.parse(data.responseText).error)
            }
        })
    })
})