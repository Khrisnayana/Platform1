<?php
session_start();
if (!isset($_SESSION['login'])) {
  header("Location: index.php");
  exit;
}
include "db.php";

$user_id = $_SESSION['user_id'];
$tasks = $conn->query("SELECT * FROM todos WHERE user_id = $user_id");
?>

<!DOCTYPE html>
<html>
<head>
  <title>To Do List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Khrisnayana - 235314114</h1>
    <img src="img/3.jpg" width="100">
    <a href="logout.php">Logout</a>
  </header>

  <form action="add.php" method="post">
    <input type="text" name="task" placeholder="Teks to do" required>
    <button type="submit">Tambah</button>
  </form>

  <?php while ($t = $tasks->fetch_assoc()): ?>
    <div class="task <?= $t['is_done'] ? 'done' : '' ?>">
      <?= htmlspecialchars($t['task']) ?>
      <a href="done.php?id=<?= $t['id'] ?>">Selesai</a>
    </div>
    <div>
    <a href="delete.php?id=<?= $t['id'] ?>">Hapus</a>
    </div>
  <?php endwhile; ?>
</body>
</html>
