<?php
include "../config/db.php";
include "../modules/dbOperations.php";

// Retrieve the email and token from the URL
$gmail = $_GET['gmailRegister'];
$token = $_GET['token'];

// Connect to your database
$pdo = new PDO('mysql:host=localhost;dbname=NilsP', 'skolnieks', 'pQcM10ClEn3lSWy');

// Query your database to check if the token matches the gmail
$stmt = $pdo->prepare("SELECT * FROM userData WHERE gmail = :gmail AND token = :token");
$stmt->execute(['gmail' => $gmail, 'token' => $token]);
$user = $stmt->fetch();
$sql = "SELECT * FROM userData WHERE  gmail='$gmail'";
$result = select($sql, $conn);
while ($row = $result->fetch_assoc()) {
    $time = strtotime($row['registered']);
    if (time() - $time >= 1.5 * 60 * 60) {
        echo "Atvainojiet verifikācijas laiks pagāja lūdzu mēginiet vēlreiz";
        $sql = "DELETE FROM userData WHERE gmail='$gmail'";
        $text = insert($sql, $conn);
        if ($text === TRUE) {
        }
    } else {
        if ($user) {
            // Update the `verified` field in your database if the token matches
            $stmt = $pdo->prepare("UPDATE userData SET verified = 1 WHERE gmail = :gmail");
            $stmt->execute(['gmail' => $gmail]);

            // Display a message to the user
            echo "Your email has been verified.";
        } else {
            // Display an error message if the token does not match
            echo "Invalid verification link.";
        }
    }
}
