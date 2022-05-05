_list = (function () {
  var marchUser = function () {
    debugger;
    parametros = {
      metodo: "list_march",
    };

    $.ajax({
      url: "../models/user.php",
      type: "post",
      data: parametros,
      success: function (data, textStatus, jQxhr) {
        debugger;
        var data = JSON.parse(data);
        if (data.status === 200) {
          data.result.forEach((element) => {
            $("#tablemarch tbody").append(
              `<tr>
                <td>
                  ${element.names} ${element.email}
                </td>
              </tr>`,
            );
          });
        } else {
          alert(data.message);
        }
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  };

  var userByRol = function () {
    debugger;
    parametros = {
      metodo: "user_concat",
    };

    $.ajax({
      url: "../models/user.php",
      type: "post",
      data: parametros,
      success: function (data, textStatus, jQxhr) {
        debugger;
        var data = JSON.parse(data);
        if (data.status === 200) {
          // data.result.forEach((element) => {
          //   $("#tablebyrol tbody").append(
          //     `<tr>
          //       <td>
          //         ${element.names}
          //       </td>
          //       <td>
          //         ${element.email}
          //       </td>
          //       <td>
          //         ${element.password}
          //       </td>
          //     </tr>`,
          //   );
          // });
        } else {
          alert(data.message);
        }
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  };

  return {
    userByRol: userByRol,
  };
})();

$(document).ready(function () {
  debugger;
  _list.marchUser();
});
