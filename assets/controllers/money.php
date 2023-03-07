<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

$userid = $_SESSION['id'];

$sql = "SELECT * FROM userMach WHERE userID='$userid'";
$result = select($sql, $conn);
while ($row = $result->fetch_assoc()) {
    $lastClickTime = strtotime($row['lastClick']);
    if (time() - $lastClickTime >= 24 * 60 * 60) {
        $sql = "UPDATE userMach SET `money`= `money` + 200 WHERE userID='$userid'";
        $text = insert($sql, $conn);
        if ($text === TRUE) {
            $sql = "UPDATE userMach SET lastClick=NOW() WHERE userID='$userid'";
            $text = insert($sql, $conn);
            echo "You earn 200 money";
        } else {
            echo "noo :/";
        }
    } else {
        echo "You can click the button again in 24 hours.";
    }
}
