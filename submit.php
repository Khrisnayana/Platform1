<?php
session_start();
require 'db.php';

$id = $_GET['id'];
$stmt = $pdo->prepare("UPDATE todos SET done = 1 WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $_SESSION['user']['id']]);
header("Location: todo.php");
