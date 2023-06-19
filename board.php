<?php
session_start();
include "assets/controllers/session.php";
include "assets/controllers/surrender.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script>
    <script src="assets/js/gameScript-bu.js" defer></script>
    <title>Spēles galds</title>
</head>

<body>
    <div class="container center col">
        <div class="fullsize">
            <form method="POST" class="h0">
                <button class="hide-btn" name="surrender"><iconify-icon icon="ph:flag-fill" flip="horizontal" class="surr pointer" id="surr"></iconify-icon></button>
            </form>
            <div class="h25 center">
                <div class="col center enamy-btns">
                    <div class="playBtn-row">
                        <button id="endEnemyTurn" class="play-btn">Beigt gājienu</button>
                        <button id="enemyPickUp" class="play-btn">Pacelt</button>
                    </div>
                    <div class="playBtn-row">
                        <button id="enemyHit" class="play-btn">Sists</button>
                        <button id="enemyHited" class="play-btn">Piekrītu</button>
                    </div>
                </div>

                <div id="enemy-cards" class="enemydeckcards"></div>
            </div>
            <div class="h50">
                <div class="w20 center" id="w20">
                    <img src="assets/cardimg/BACK.png" id="back" class="deck left-back">
                    <p id="text-sym"></p>
                </div>

                <div class="w58-mid center">
                    <div id="placed-cards" class="placed-cards"></div>

                    <div id="hit-cards" class="hit-cards"></div>
                </div>

                <div class="w20-hited center" id="hited">
                    <img src="assets/cardimg/BACK.png" class="deck right-back">
                </div>

            </div>
            <div class="h25 center">
                <div class="col center player-btns">
                    <div class="playBtn-row">
                        <button id="endPlayerTurn" class="play-btn">Beigt gājienu</button>
                        <button id="playerPickUp" class="play-btn">Pacelt</button>
                    </div>
                    <div class="playBtn-row">
                        <button id="playerHit" class="play-btn">Sists</button>
                        <button id="playerHited" class="play-btn">Piekrītu</button>
                    </div>
                </div>
                <div id="player-cards" class="deckcards"></div>
            </div>
        </div>
    </div>
    <script>
        
    </script>
</body>

</html>
