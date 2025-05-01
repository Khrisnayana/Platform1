<?php
session_start();
include "db.php";
$task = $_POST['task'];
$user_id = $_SESSION['user_id'];
$conn->query("INSERT INTO todos (task, user_id) VALUES ('$task', $user_id)");
header("Location: todo.php");
