<?php

$getId = $_GET['id'];
if ($getId) {

    $userid = $_SESSION['id'];
    $sql = "SELECT * FROM createGame, userMach WHERE createGame.id='$getId' AND userMach.userID='$userid'";
    $result = select($sql, $conn);
    while ($row = $result->fetch_assoc()) {
        $playerJoin = $row['playerJoin'];
        $playerCount = $row['playerCount'];
        $pay = $row['pay'];
        $money = $row['money'];
        if ($playerJoin < $playerCount) {
            if ($money >= $pay) {
                $sql = "UPDATE createGame SET `playerJoin`= `playerJoin` + 1 WHERE id='$getId'";
                $text = insert($sql, $conn);
                if ($text === TRUE) {
                    if ($playerCount == $playerJoin + 1) {
                        $sql = "UPDATE createGame SET `status`=  1 WHERE id='$getId'";
                        $text = insert($sql, $conn);
                        if ($text === TRUE) {
                            $sql = "UPDATE userMach SET `mach`= `mach` + 1, `money` = `money` - $pay WHERE userID='$userid'";
                            $text = insert($sql, $conn);
                            if ($text === TRUE) {
                            }
                        }
                    }
                }
                header("location: board.php?id=" . $_GET['id']);
            } else {
                echo '<script>alert("Nav pietiekami naudas")</script>';
            }
        } else {
            echo '<script>alert("Atvainojies istaba ir pilna")</script>';
        }
    }
}
