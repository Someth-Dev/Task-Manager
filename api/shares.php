<?php
include 'db_connect.php';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
switch ($method) {
    case 'GET':
        $task_id = $_GET['task_id'];
        $stmt = $pdo->prepare("SELECT * FROM task_shares WHERE task_id = ?");
        $stmt->execute([$task_id]);
        $shares = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($shares);
        break;
    case 'POST':
        $task_id = $input['task_id'];
        $email = $input['email'];
        $stmt = $pdo->prepare("INSERT INTO task_shares (task_id, email) VALUES (?, ?)");
        $stmt->execute([$task_id, $email]);
        echo json_encode(["message" => "Task shared"]);
        break;
}
?>