<?php
session_start();
include "assets/controllers/sessionDestroy.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script>
    <title>CreateGame</title>
</head>

<body>
    <div class="container center col">
        <input type="range">
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>

        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>

        <div class="rightline center col">
            <iconify-icon style="font-size: 32px" icon="mdi:cards-heart" class="heart" onClick="location.href='http://into.id.lv/ip19/nils/game/profile.php'"></iconify-icon>
            <iconify-icon style="font-size: 32px" icon="fluent-emoji-flat:club-suit" class="pointer" onClick="location.href='http://into.id.lv/ip19/nils/game/menu.php'"></iconify-icon>
            <iconify-icon style="font-size: 32px" icon="ph:diamond-fill" class="diamond" onClick="location.href='http://into.id.lv/ip19/nils/game/creategame.php'"></iconify-icon>
            <iconify-icon style="font-size: 32px" icon="bi:suit-spade-fill" class="pointer" onClick="location.href='http://into.id.lv/ip19/nils/game/topplayer.php'"></iconify-icon>
            <form method="POST">
                <button name="logOut" class="logout"><iconify-icon style="font-size: 32px" icon="ooui:log-out-rtl" class="logout"></iconify-icon></button>
                <?php echo logOut(); ?>
            </form>
        </div>
    </div>
</body>

</html>