<?php
include 'db_connect.php';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
switch ($method) {
    case 'GET':
        $task_id = $_GET['task_id'];
        $stmt = $pdo->prepare("SELECT * FROM task_reminders WHERE task_id = ?");
        $stmt->execute([$task_id]);
        $reminders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($reminders);
        break;
    case 'POST':
        $task_id = $input['task_id'];
        $reminder_date = $input['reminder_date'];
        $stmt = $pdo->prepare("INSERT INTO task_reminders (task_id, reminder_date) VALUES (?, ?)");
        $stmt->execute([$task_id, $reminder_date]);
        echo json_encode(["message" => "Reminder added"]);
        break;
}
?>