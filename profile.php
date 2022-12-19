<?php
session_start();
include "assets/config/db.php";
include "assets/modules/dbOperations.php";
include "assets/controllers/select.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <title>Profile</title>
</head>

<body>

    <div class="container">
    <?php echo matchData($conn); ?>
        <div class="justify-left">
            <div class="rightline">
            <div class="fa-solid fa-heart fa-2x" onClick="location.href='http://into.id.lv/ip19/nils/game/profile.php'"></div>
                <div class="fa-solid fa-club fa-2x" onClick="location.href='http://into.id.lv/ip19/nils/game/menu.php'"></div>
                <div class="fa-solid fa-diamond fa-2x" onClick="location.href='http://into.id.lv/ip19/nils/game/creategame.php'"></div>
                <div class="fa-solid fa-spade fa-2x" onClick="location.href=''"></div>
            </div>
        </div>
    </div>
    <?php
    echo $_SESSION['id'];
    ?>
</body>

</html>