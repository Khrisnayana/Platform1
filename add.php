<?php
session_start();
require 'db.php';

if (isset($_POST['task']) && trim($_POST['task']) !== '') {
    $stmt = $pdo->prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
    $stmt->execute([$_SESSION['user']['id'], $_POST['task']]);
}
header("Location: todo.php");
