<?php
include 'db_connect.php';
$stmt = $pdo->query("SELECT * FROM categories");
$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($categories);
?>