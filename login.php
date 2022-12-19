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
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Login</title>
</head>

<body>

    <div class="container">
        <div class="login-box">

            <form method="POST">

                <h1>Sing In</h1>
                <input type="text" name="username" class="input-style" placeholder="Username... " required>
                <input type="password" name="passwd" class="input-style" placeholder="Password..." required>
                <input type="submit" name="LoginSubmit" class="btn" value="submit">

                <div class="links">
                    <a href="http://into.id.lv/ip19/nils/game/forgotpass.php">Forgot password?</a>
                    <a href="http://into.id.lv/ip19/nils/game/registration.php">Sing Up</a>
                </div>

                <p class="Msg"> <?php echo login($conn); ?> </p>


            </form>
        </div>
    </div>
</body>

</html>