_user = (function () {
  var registerUser = function () {
    var names = $("#txtName").val();
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    parametros = {
      metodo: "register",
      data: {
        names,
        email,
        password,
      },
    };

    if (
      $.trim(names) !== "" &&
      $.trim(email) !== "" &&
      $.trim(password) !== ""
    ) {
      $.ajax({
        url: "../../models/user.php",
        type: "post",
        data: parametros,
        success: function (data, textStatus, jQxhr) {
          var data = JSON.parse(data);
          if (data.status === 200) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        },
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    } else {
      alert("No deje campos vacíos");
    }
  };

  var loginUser = function () {
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    parametros = {
      metodo: "login",
      data: {
        email,
        password,
      },
    };

    if ($.trim(email) !== "" && $.trim(password) !== "") {
      $.ajax({
        url: "../../models/user.php",
        type: "post",
        data: parametros,
        success: function (data, textStatus, jQxhr) {
          debugger;
          var data = JSON.parse(data);
          if (data.status === 400) {
            alert(data.message);
          } else {
            if (data.id_rol === "1") {
              window.location.href = "../admin/home.php";
            } else if (data.id_rol === "2") {
              window.location.href = "../user/home.php";
            }
          }
        },
        error: function (jqXhr, textStatus, errorThrown) {
          debugger;
          console.log(errorThrown);
        },
      });
    } else {
      alert("No deje campos vacíos");
    }
  };
  return {
    registerUser: registerUser,
    loginUser: loginUser,
  };
})();

$(document).ready(function () {
  $("#btnRegister").on("click", function () {
    _user.registerUser();
  });

  $("#btnLogin").on("click", function () {
    debugger;
    _user.loginUser();
  });
});

// alert();
