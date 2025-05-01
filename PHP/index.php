<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $user = $_POST['username'];
  $pass = $_POST['password'];

  $result = $conn->query("SELECT * FROM users WHERE username='$user'");
  $row = $result->fetch_assoc();

  if ($row && password_verify($pass, $row['password'])) {
    $_SESSION['login'] = true;
    $_SESSION['user_id'] = $row['id'];
    header("Location: todo.php");
    exit;
  } else {
    $error = "Login gagal!";
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="login-box">
    <h2>Login</h2>
    <?php if (isset($error)) echo "<p>$error</p>"; ?>
    <form method="post">
      <input type="text" name="username" placeholder="User Name" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>
