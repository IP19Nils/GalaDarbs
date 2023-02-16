<?php
// session_start();
// include "assets/config/db.php";
// include "assets/modules/dbOperations.php";
// include "assets/controllers/select.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script>
    <script src="assets/js/gameScript.js"></script>
    <!-- <script src="assets/js/helps.js"></script> -->
    <title>Board</title>
</head>

<body>
    <div class="container center col">
        <div class="fullsize">
        <iconify-icon icon="ph:flag-fill" flip="horizontal" class="surr pointer" id="surr"></iconify-icon>
            <div class="h25 center">
                <button id="endEnamyTurn">Beigt gājienu</button>
                <button id="enamyPickUp">Pacelt</button>
                <button id="enamyHit">Sists</button>
                <button id="enamyHited">Nosists</button>

                <div id="enamy-cards" class="enamydeckcards"></div>
            </div>
            <div class="h50">
                <div class="w20 center" id="w20">
                    <img src="assets/cardimg/BACK.png" class="deck">
                </div>

                <div class="w58-mid center">
                    <div id="placed-cards" class="placed-cards"></div>
                    
                    <div id="hit-cards" class="hit-cards"></div>
                </div>

                <div class="w20-hited center" id="hited">
                    <img src="assets/cardimg/BACK.png" class="deck">
                </div>

            </div>
            <div class="h25 center">
                <button id="endPlayerTurn">Beigt gājienu</button>
                <button id="playerPickUp">Pacelt</button>
                <button id="playerHit">Sists</button>
                <button id="playerHited">Nosists</button>
                <div id="player-cards" class="deckcards"></div>
            </div>
        </div>

    </div>
</body>

</html>