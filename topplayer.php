<?php
include "assets/controllers/rating.php";
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
    <script src="assets/js/script.js"></script>
    <title>Player top</title>
</head>

<body>
    <div class="container center col">
        <form method="POST">
            <div class='rating-box'>
                <button class="option-btn hide-btn pointer money" id="option-btn" name="money">
                    <div class="col">
                        <p class="btn-emoji">💲</p>
                        <p class="btn-name">Nauda</p>
                    </div>
                </button>
                <button class="option-btn hide-btn pointer win" id="option-btn" name="win">
                    <div class="col">
                        <p class="btn-emoji">🏆</p>
                        <p class="btn-name">Uzvaras</p>
                    </div>
                </button>
                <button class="option-btn hide-btn pointer mach" id="option-btn" name="mach">
                    <div class="col">
                        <p class="btn-emoji">🏅</p>
                        <p class="btn-name">Mači</p>
                    </div>
                </button>
                <button class="option-btn hide-btn pointer lose" id="option-btn" name="lose">
                    <div class="col">
                        <p class="btn-emoji">❌</p>
                        <p class="btn-name">Zaudes</p>
                    </div>
                </button>
            </div>
        </form>
        <?php echo rating($conn); ?>
    </div>
</body>

</html>