$(document).ready( () => {
  $('#btn').on('click', (e) => {

    var method = $('#dropdown-method').val();
    var path = $('#path').val();
    console.log(method, path);

    if (path.charAt(0) === '/') {
      path = path.substring(1);
    }

    if (method === 'POST' || method === 'PUT') {
      const body = {
        friend: {
          name: $('#fname').val(),
          lastname: $('#lname').val()
        }
      }
      $.ajax({
        method: method,
        url: path,
        data: JSON.stringify(body),
        contentType: 'application/json',
        success:  handleSuccess,
        error:  function(jqxhr) {
          $('#status-code').text(jqxhr.status);
          $('#response-body').text('');
        }
      });
    } else {
      $.ajax({
        method: method,
        url: path,
        success:  handleSuccess,
        error:  function(jqxhr) {
          $('#status-code').text(jqxhr.status);
          $('#response-body').text('Not Found!!!');
        }
      });
    }
    e.preventDefault();
  });
});

function handleSuccess(response, status, jqxhr) {
  $('#status-code').text(jqxhr.status);
  $('#response-body').text(JSON.stringify(response, null, 4));
}
