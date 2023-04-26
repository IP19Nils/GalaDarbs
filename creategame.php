<?php
session_start();
include "assets/config/db.php";
include "assets/controllers/sessionDestroy.php";
include "assets/controllers/session.php";
include "assets/controllers/rightline.php";
include "assets/controllers/roomCreate.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <script src="assets/js/script.js"></script>
    <title>CreateGame</title>
</head>

<body>

    <div class="container center col">
        <form method="POST" class="col">
            <input type="text" name="name" placeholder="name" class="roomName">
            <input type="number" name="money" min="200" value="200" max="10000000000" class="moneys">
            <div class="row gap10">
                <input id="player" name="player" type="range" class="player" onclick="playerCount()" value="2" min="2" max="6" step="1">
                <p class="color-w" id="value"></p>
            </div>

            <button name="roomCreate" class="roomCreate">Create Room</button>
    </div>
    </form>

    </div>

</body>

</html>