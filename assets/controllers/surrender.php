<?php
include "../config/db.php";
include "../modules/dbOperations.php";

if (isset($_POST['surrender'])) {
    $id = $_GET['id'];
    $userid = $_SESSION['id'];
    $sql = "SELECT * FROM createGame, userMach WHERE createGame.id='$id' AND userMach.userID='$userid'";
    $result = select($sql, $conn);
    $sql = "UPDATE createGame SET `playerJoin`= (`playerJoin` - 1) WHERE id='$id'";
    $text = insert($sql, $conn);
    if ($text === TRUE) {
    }
    header("location: menu.php");
    while ($row = $result->fetch_assoc()) {
        $playerCount = $row['playerCount'];
        $playerJoin = $row['playerJoin'];
        if ($playerCount === $playerJoin) {
            $sql = "UPDATE userMach SET `lose`= `lose` + 1 WHERE userID='$userid'";
            $text = insert($sql, $conn);
            if ($text === TRUE) {
                $sql = "DELETE FROM createGame WHERE id='$id'";
                $text = insert($sql, $conn);
                if ($text === TRUE) {
                    echo '<script>alert("Jūs vai pretinieks padevās")</script>';
                }
            }
        }
        if ($playerJoin == 1) {
            $sql = "DELETE FROM createGame WHERE id='$id'";
            $text = insert($sql, $conn);
            if ($text === TRUE) {
            }
        }
    }
}
