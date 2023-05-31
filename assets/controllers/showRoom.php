<?php
error_reporting(0);

include "../config/db.php";
include "../modules/dbOperations.php";
include "machStart.php";

function showUpRooms($conn)
{

    $sql = "SELECT * FROM createGame";
    $result = select($sql, $conn);
    while ($row = $result->fetch_assoc()) {
        echo "
    <div class='bg-line row ai-center'>
    <div class='w80-cg row'>
        <p class='w80-cg fs-20'>" . $row['name'] . "</p>
        <p class='w80-cg fs-20'>" . $row['playerJoin'] . "/" . $row['playerCount'] . "👤</p>
        <p class='w80-cg fs-20'>" . $row['pay'] . "💲</p>
    </div>
    <div class='w20-cg'>
        <form method='POST' class='center'>
        <a class='btn-play pointer center link' href='menu.php?id=" . $row['id'] . "'>Spēlēt</a>
        </form>
    </div>
</div>
";
    }
}
