<?php
include "assets/config/db.php";
include "assets/modules/dbOperations.php";
include "assets/controllers/update.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Forgot password</title>
</head>

<body>
    <div class="container">
        <div class="login-box">

            <form method="POST">
                <h1>Forgot password?</h1>
                <input type="text" name="Gmail" class="input-style" placeholder="gmail" required>
                <input type="text" name="Username" class="input-style" placeholder="username" required>
                <input type="password" name="NewPassword" class="input-style" placeholder="New password" required>
                <input type="submit" name="ForgotPass" class="btn" value="submit">

                <p class="Msg"> <?php echo !empty($PassMsg) ? $PassMsg : ""; ?> </p>

                <a href="http://into.id.lv/ip19/nils/game/login.php">Sing In</a>
            </form>

        </div>
    </div>

</body>

</html>