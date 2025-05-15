<?php
include 'db_connect.php';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
switch ($method) {
    case 'GET':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 5;
        $offset = ($page - 1) * $limit;
        $search = $_GET['search'] ?? '';
        $sql = "SELECT t.*, c.name AS category_name FROM tasks t 
                LEFT JOIN categories c ON t.category_id = c.id 
                WHERE t.title LIKE ? LIMIT ? OFFSET ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, "%$search%", PDO::PARAM_STR);
        $stmt->bindValue(2, $limit, PDO::PARAM_INT);
        $stmt->bindValue(3, $offset, PDO::PARAM_INT);
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM tasks WHERE title LIKE ?");
        $countStmt->execute(["%$search%"]);
        $total = $countStmt->fetchColumn();
        echo json_encode(['tasks' => $tasks, 'total' => $total, 'page' => $page, 'limit' => $limit]);
        break;
    case 'POST':
        $title = $input['title'];
        $description = $input['description'];
        $status = $input['status'];
        $priority = $input['priority'];
        $due_date = $input['due_date'];
        $category_id = $input['category_id'];
        $progress = $input['progress'];
        $stmt = $pdo->prepare("INSERT INTO tasks (title, description, status, priority, due_date, category_id, progress) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $description, $status, $priority, $due_date, $category_id, $progress]);
        echo json_encode(["message" => "Task created"]);
        break;
    case 'PUT':
        $id = $input['id'];
        $title = $input['title'];
        $description = $input['description'];
        $status = $input['status'];
        $priority = $input['priority'];
        $due_date = $input['due_date'];
        $category_id = $input['category_id'];
        $progress = $input['progress'];
        $stmt = $pdo->prepare("UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, category_id = ?, progress = ? WHERE id = ?");
        $stmt->execute([$title, $description, $status, $priority, $due_date, $category_id, $progress, $id]);
        echo json_encode(["message" => "Task updated"]);
        break;
    case 'DELETE':
        $id = $input['id'];
        $stmt = $pdo->prepare("DELETE FROM task_reminders WHERE task_id = ?");
        $stmt->execute([$id]);
        $stmt = $pdo->prepare("DELETE FROM task_shares WHERE task_id = ?");
        $stmt->execute([$id]);
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
      echo json_encode(["message" => "Task deleted"]);
        break;
}
?>