<?php
include "../config/db.php";
include "../modules/dbOperations.php";

if (isset($_POST['roomCreate'])) {
    $id = $_GET['id'];
    $name = $_POST['name'];
    $money = $_POST['money'];
    $player = $_POST['player'];

    $sql = "INSERT INTO createGame(`name`, playerCount, pay, playerJoin, `status`, c1, c2) VALUES ('$name', '$player', '$money', '1', '0', '', '')";
    $text = insert($sql, $conn);
    if ($text === TRUE) {
        echo "okey";
        header("location: board.php?id=" . $id);
    } else {
        echo "error";
    }
}
