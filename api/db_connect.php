<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'sql12.freesqldatabase.com'; // From FreeSQLDatabase email
$db = 'sql12778939'; // Your database name
$user = 'sql12778939'; // Your username
$pass = 'n76rXP4fTv'; // Your password
$port = '3306';
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit;
}
?>