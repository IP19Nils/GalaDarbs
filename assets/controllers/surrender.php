<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

$userid = $_SESSION['id'];

$sql = "SELECT * FROM userMach WHERE userID='$userid'";
$result = select($sql, $conn);
while ($row = $result->fetch_assoc()) {
    $sql = "UPDATE userMach SET `lose`= `lose` + 1 WHERE userID='$userid'";
    $text = insert($sql, $conn);
    if ($text === TRUE) {
    } else {
    }
}
