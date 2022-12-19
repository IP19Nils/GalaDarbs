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
    <script src="assets/js/gameScript.js"></script>
    <title>Board</title>
</head>

<body>
    <div class="container">
        <div class="fullsize">
            <div class="h25">
            <div id="enamy-cards" class="enamydeckcards"></div>
            </div>
            <div class="h50">
                <div class="w20" id="w20">
                <img src="assets/cardimg/BACK.png" class="deck">
                </div>
            
                <div class="w58-mid">
                    <div id="placed-cards" class="placed-cards"></div>
                </div>
            </div>
            <div class="h25">
                <button id="endturn">end trun</button>
                <button>pick up</button>
                <button></button>
                <div id="player-cards" class="deckcards"></div>
                </div>
        </div>

    </div>
</body>

</html>