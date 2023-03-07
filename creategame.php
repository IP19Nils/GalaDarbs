<?php
session_start();
include "assets/controllers/sessionDestroy.php";
include "assets/controllers/session.php";
include "assets/controllers/rightline.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
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

    </div>
</body>

</html>