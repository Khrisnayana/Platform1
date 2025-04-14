<?php
session_start();
require 'db.php';

$id = $_GET['id'];
$stmt = $pdo->prepare("DELETE FROM todos WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $_SESSION['user']['id']]);
header("Location: todd.php");
