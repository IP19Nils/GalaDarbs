<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";
include "../controllers/session.php";

$userid = $_SESSION['id'];
$sql = "DELETE FROM userData WHERE id='$userid'";
$sql2 = "DELETE FROM userMach WHERE userID='$userid'";
$text = insert($sql, $conn);
$text2 = insert($sql2, $conn);
if ($text === TRUE && $text2 === TRUE) {
    session_destroy();
    echo "Viss tika veiksmigi izdzēsts!";
} else {
    echo "Kluda! Neizdavas izdzēst.";
}