$(document).ready(() => {
  $("#btn").on("click", e => {
    var method = $("#dropdown-method").val();
    var path = $("#path").val();
    console.log(method, path);

    if (!path) {
      alert('Pathname is required, Enter "friends" to start');
      exit();
    }

    if (path.charAt(0) === "/") {
      path = path.substring(1);
    }

    if (method === "POST" || method === "PUT") {
      const body = {
        name: $("#fname").val(),
        lastname: $("#lname").val(),
        occupation: $("#occupation").val(),
        place: $("#place").val(),
        contact: $("#contact").val()
      };
      $.ajax({
        method: method,
        url: path,
        data: JSON.stringify(body),
        contentType: "application/json",
        success: handleSuccess,
        error: function(jqxhr) {
          $("#status-code").text(jqxhr.status);
          $("#response-body").text("");
        }
      });
    } else {
      $.ajax({
        method: method,
        url: path,
        success: handleSuccess,
        error: function(jqxhr) {
          $("#status-code").text(jqxhr.status);
          $("#response-body").text("Not Found!!!");
        }
      });
    }
    e.preventDefault();
    $("#dropdown-method").val("GET");
    $("#path").val("");
    $("#fname").val("");
    $("#lname").val("");
    $("#occupation").val("");
    $("#place").val("");
    $("#contact").val("");
  });
});

function handleSuccess(response, status, jqxhr) {
  $("#status-code").text(`${status} , ${jqxhr.status}`);
  $("#response-body").text(JSON.stringify(response, null, 4));
}
