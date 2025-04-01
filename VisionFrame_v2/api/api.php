<?php 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
} 
$input = file_get_contents("php://input");
$data = json_decode($input, true);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
header("Access-Control-Allow-Headers: Content-Type");

$sql = [
    "host"      => "127.0.0.1:3307",
    "username"  => "root",
    "password"  => "",
    "db"        => "animeflix"
];

$conn = new mysqli($sql["host"], $sql["username"], $sql["password"], $sql["db"]);

if ($conn->connect_error) {
    echo json_encode(["error" => "Error connecting to the database"]);
    exit;
}

$action = $_GET["endpoint"] ?? '';

if (empty($action)) {
    echo json_encode(["error" => "Parameter 'endpoint' not provided"]);
    exit;
}

// LOGIN
if ($action === "login") {
    $email = $_GET["email"] ?? '';
    $password = $_GET["password"] ?? '';

    if (empty($email)) {
        echo json_encode(["error" => "Please provide a valid email"]);
        exit;
    }

    if (empty($password)) {
        echo json_encode(["error" => "Please provide a valid password"]);
        exit;
    }

    $query = "SELECT * FROM accounts WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "Account not found"]);
        exit;
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user["password"])) {
        echo json_encode(["success" => false, "message" => "Incorrect password!"]);
        exit;
    }

    $_SESSION['account_id'] = $user["id"];
    $_SESSION['logged'] = true;
    echo json_encode(["success" => true, "message" => "Login successful!"]);
    exit;
}


if ($action === "loginUser") {
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET["user_id"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit;
    }
    $user = $result->fetch_assoc();
    $_SESSION['user_id'] = $user["id"];
    $_SESSION['logged'] = true;
    echo json_encode(["success" => true]);
    exit;
}

if ($action === "animes") {
    $cat = $_GET["cat"] ?? '';

    if (empty($cat)) {
        $sql = "SELECT * FROM animes WHERE visible = 1";  
        $result = $conn->query($sql);
    } else {
        $sql = "SELECT * FROM animes WHERE visible = 1 AND category LIKE ?";
        
        $stmt = $conn->prepare($sql);
        $search = "%{$cat}%";
        $stmt->bind_param('s', $search);
        $stmt->execute();
        $result = $stmt->get_result();
    }

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "No anime found!"]);
        exit;
    }

    $animes = [];
    while ($row = $result->fetch_assoc()) {
        $animes[] = $row;
    }

    echo json_encode(["animes" => $animes]);
    exit;
}


// LIST EPISODES BY ANIME
if ($action === "episodes") {
    $anime_id = $_GET["id"] ?? 0;

    if (!is_numeric($anime_id) || $anime_id <= 0) {
        echo json_encode(["error" => "Invalid anime ID"]);
        exit;
    }

    $sql = "SELECT * FROM episodes WHERE anime_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $anime_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $episodes = [];
    while ($row = $result->fetch_assoc()) {
        $episodes[] = $row;
    }

    echo json_encode(["episodes" => $episodes]);
    exit;
}

// LIST A SPECIFIC EPISODE
if ($action === "episode") {
    $query = "SELECT * FROM episodes WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $_GET["id"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "Episode not found"]);
        exit;
    }

    $ep = $result->fetch_assoc();
    echo json_encode($ep);
    exit;
}

// LIST A SPECIFIC ANIME
if ($action === "anime") {
    $query = "SELECT * FROM animes WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $_GET["id"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "Anime not found"]);
        exit;
    }

    $anime = $result->fetch_assoc();
    echo json_encode($anime);
    exit;
}
if ($action === "view") {
    $anime_id = $_GET["id"] ?? '';
    
    if (empty($anime_id)) {
        echo json_encode(["error" => "Please provide an id"]);
        exit;
    }
    $sql = "SELECT * FROM animes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $anime_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "No anime found with this id"]);
        exit;
    }

    $anime = $result->fetch_assoc();
    $sql = "UPDATE animes SET views = views + 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $anime_id);
    $stmt->execute();
    exit;
}

if ($action === "verifyLogin") {
    if (!isset($_SESSION["account_id"])) {
        echo json_encode(["success" => false]);
        exit;
    }
    echo json_encode(["success" => true]);
    exit;
}

if ($action === "verifyUser") {
    if (!isset($_SESSION["user_id"])) {
        echo json_encode(["success" => false]);
        exit;
    }
    http_response_code(200);
    echo json_encode(["success" => true]);
    exit;
}


if ($action === "select_account") {
    $sql = "SELECT * FROM users WHERE account_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_SESSION["account_id"]);
    exit;
}

if ($action === "logout") {
    echo json_encode(["success" => true]);

    session_unset();
    session_destroy();
    if (session_status() === PHP_SESSION_NONE) {
        error_log('Session successfully destroyed');
    } else {
        error_log('Failed to destroy session');
    }
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Pragma: no-cache");
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
    exit;
}
if ($action === "logoutUser") {
    unset($_SESSION["user_id"]);
    if (!isset($_SESSION["user_id"])) {
        echo json_encode(["success" => true]);
    }
    exit;
}

if ($action === "mostViewedAnimes") {
    $sql = "SELECT * FROM animes WHERE visible = 1 ORDER BY views DESC LIMIT 5";
    
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        echo json_encode(["error" => "No anime found!"]);
        exit;
    }

    $animes = [];
    while ($row = $result->fetch_assoc()) {
        $animes[] = $row;
    }

    echo json_encode(["animes" => $animes]);
    exit;
}

if ($action === "users") {
    $sql = "SELECT * FROM users WHERE account_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET["account_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
        http_response_code(404);
        echo json_encode(["error" => "Account not found"]);
        exit;
    }
    $results = [];

    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($results);
    exit;
}

if ($action === "account") {
    if (!isset($_SESSION["account_id"])) {
        http_response_code(404);
        echo json_encode(["error" => "Account id not found"]);
        exit;
    }

    http_response_code(200);
    echo json_encode(["id" => $_SESSION["account_id"]]);
    exit;
}

if ($action === "user") {
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_GET["id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        exit;
    }
    $user = $result->fetch_assoc();
    echo json_encode($user);
    exit;
}

if ($action === "markEpisodeWatched") {
    $ep_id = $_GET["id"];
    $user_id = $_SESSION["user_id"];
    $anime_id = null;
    if (!isset($ep_id) or empty($ep_id)) {
        http_response_code(403);
        echo json_encode(["success" => false, "message" => "Id not provided"]);
        exit;
    }

    $sql = "SELECT * FROM episodes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $ep_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Anime not found"]);
        exit;
    }
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
    $anime_id = $results[0]["anime_id"];

    $sql = "SELECT * FROM watched WHERE episode_id = ? AND user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $ep_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        http_response_code(403);
        echo json_encode(["success" => false, "message" => "Episode already registered"]);
        exit;
    }

    $sql = "INSERT INTO watched (anime_id, episode_id, user_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $anime_id, $ep_id, $user_id);
    $stmt->execute();

    if (!$stmt->affected_rows) {
        echo json_encode(["success" => false, "message" => "Error inserting episode"]);
        exit;
    }

    echo json_encode(["success" => true]);
    exit;
}
if ($action === "watchedEpisodes") {
    $anime_id = $_GET["anime_id"];
    $sql = "SELECT * FROM watched WHERE anime_id = ? AND user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $anime_id, $_SESSION["user_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
        echo json_encode(["message" => "No episode found"]);
        exit;
    }
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
    echo json_encode($results);
    exit;
}

echo json_encode(["error" => "Endpoint not found or invalid"]);

$conn->close();
?>