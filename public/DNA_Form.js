$(document).ready(() => {
    $("#DNA").submit(function(event) {
        event.preventDefault()
        $.ajax({
            url: "/" + $("#username").val() + "/distance?A=" + $("#A").val() + "&B=" + $("#B").val(),
            success: function(data) {
                $("#UserRes").text(data.user)
                $("#DateRes").text(data.date)
                $("#A_res").text(data.A)
                $("#B_res").text(data.B)
                $("#DistanceRes").text(data.distance)
                $("#nbRequestRes").text(data.nbRequest)
                $("#totalRequest").text(data.totalRequest)
                $("#result").show()
                $(".font-weight-bold").show()
                $("#reset").show()
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

function reset() {
    $("#result").hide()
    $(".font-weight-bold").hide()
    $('#DNA input[type="text"]').val('')
}