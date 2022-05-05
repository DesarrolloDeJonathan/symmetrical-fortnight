<?php
include_once "../Conexion.php";

$metodo = $_POST["metodo"];
$model = new model();

switch ($metodo) {
  case 'register':
    $model->register($_POST['data']);
    break;

  case 'login':
    $model->login($_POST['data']);
    break;

  case 'list_march':
    $model->listMarch();
    break;

  case 'user_concat':
    $model->userByRol();
    break;


  default:
    # code...
    break;
}


class model
{

  function register($data)
  {
    $conexion = new Conexion();

    $sql = $conexion->prepare("INSERT INTO usuarios(names, email, password, id_rol) VALUES (?,?,?,?);");
    $resultado =  $sql->execute([$data["names"], $data["email"], $data["password"], 2]);

    if ($resultado === TRUE) {
      $status = array(
        "status"  => 200,
        "message" => "Guardado correctamente"
      );
    } else {
      $status = array(
        "status"  => 401,
        "message" => "Ocurrió un error"
      );
    }
    echo json_encode($status);
  }


  function login($data)
  {
    $conexion = new Conexion();

    $conexion = new Conexion();
    $sql = $conexion->prepare('SELECT * FROM usuarios where email=? AND password=?');
    $sql->execute([$data["email"], $data["password"]]);
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

    if (count($resultado) > 0) {
      $status = array(
        "status"  => 200,
        "id_rol" => $resultado[0]["id_rol"]
      );
    } else {
      $status = array(
        "status"  => 401,
        "message" => "Usuario o contraseña incorrecta"
      );
    }
    echo json_encode($status);
  }


  function listMarch()
  {
    $conexion = new Conexion();

    $fromdate = "2022-04-01 00:00:00.000000";
    $todate = "2022-04-30 23:59:00.000000";

    $sql = "SELECT * FROM usuarios WHERE date_create BETWEEN :fromdate AND :todate";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':fromdate', $fromdate, PDO::PARAM_STR);
    $stmt->bindParam(':todate', $todate, PDO::PARAM_STR);
    $stmt->execute();

    $total = $stmt->rowCount();

    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($resultado) > 0) {
      $status = array(
        "status"  => 200,
        "result" => $resultado
      );
    } else {
      $status = array(
        "status"  => 401,
        "message" => "Ocurrió un error"
      );
    }
    echo json_encode($status);
  }

  function userByRol()
  {
    $conexion = new Conexion();

    $sentencia = $conexion->prepare('SELECT * FROM persona WHERE codigo = ?;');
    $sentencia->execute();
    $persona = $sentencia->fetch(PDO::FETCH_OBJ);

    $total = $persona->rowCount();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);

    if (count($resultado) > 0) {
      $status = array(
        "status"  => 200,
        "result" => $resultado
      );
    } else {
      $status = array(
        "status"  => 401,
        "message" => "Ocurrió un error"
      );
    }
    echo json_encode($status);
  }
}
