<?php
include "../config/db.php";
include "../modules/dbOperations.php";

function rating($conn)
{
    $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.money DESC";
    $result = select($sql, $conn);
    while ($row = $result->fetch_assoc()) {
        echo "
<div class='rating-box'>
<p class='sort-box'>" . $row['username'] . "</p>
<p class='sort-box'>" . $row['money'] . "</p>
<p class='sort-box'>" . $row['mach'] . "</p>
<p class='sort-box'>" . $row['win'] . "</p>
<p class='sort-box'>" . $row['lose'] . "</p>
</div>
";
    }
}
