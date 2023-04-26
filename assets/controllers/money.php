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
            echo "Jūs saņēmāt 200 naudiņas";
        } else {
            echo "Nesanāca saņemt naudu.";
        }
    } else {
        echo "Jūs varat saņemt tikai reizi 24 stundu laikā.";
    }
}
