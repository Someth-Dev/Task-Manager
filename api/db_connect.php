<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'sql207.infinityfree.com'; // From MySQL Databases
$db = 'if0_38989271_task_manager_db';     // From MySQL Databases
$user = 'if0_38989271';        // From MySQL Databases
$pass = 'kxtEzau72w';        // From MySQL Databases
$port = '3306';
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit;
}
?>