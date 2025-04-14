<?php
session_start();
if (!isset($_SESSION['user'])) header("Location: index.php");

require 'db.php';
$user_id = $_SESSION['user']['id'];

$todos = $pdo->prepare("SELECT * FROM todos WHERE user_id = ?");
$todos->execute([$user_id]);
$todos = $todos->fetchAll();
?>

<!DOCTYPE html>
<html>
<head>
    <title>To Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <img src="images/foto.jpg" alt="Foto" width="100"><br>
        <strong>Nama:</strong> Nama Kamu<br>
        <strong>NIM:</strong> NIM Kamu
        <a href="logout.php">[Logout]</a>
    </header>

    <h2>To Do List</h2>

    <form action="tambah.php" method="POST">
        <input type="text" name="task" placeholder="Tulis tugas...">
        <button type="submit">Tambah</button>
    </form>

    <ul>
    <?php foreach ($todos as $todo): ?>
        <li>
            <?= htmlspecialchars($todo['task']) ?>
            <?= $todo['done'] ? '(Selesai)' : "<a href='selesai.php?id={$todo['id']}'>[Selesai]</a>" ?>
            <a href="hapus.php?id=<?= $todo['id'] ?>">[Hapus]</a>
        </li>
    <?php endforeach; ?>
    </ul>
</body>
</html>
