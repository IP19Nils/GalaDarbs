<?php
include "assets/config/db.php";
include "assets/modules/dbOperations.php";
include "assets/controllers/insert.php";
include "assets/controllers/select.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Registration</title>
</head>

<body>
    <div class="container">
        <div class="login-box">

            <form method="POST">

                <h1>Registration</h1>
                <div class="reg-style-row">
                    <input type="text" name="name" class="reg-style" placeholder="Name" required>
                    <input type="text" name="surname" class="reg-style" placeholder="Surname" required>
                </div>
                <input type="text" name="gmail" class="input-style" placeholder="gmail" required>
                <input type="text" name="username" class="input-style" placeholder="Username" required>
                <input type="password" name="passwd" class="input-style" placeholder="Password" required>
                <input type="submit" name="SignUp" class="btn" value="Sing Up">

                <p class="Msg"> <?php echo !empty($userExistMsg) ? $userExistMsg : ""; ?> </p>
                <p class="Msg"> <?php echo !empty($SingUpMsg) ? $SingUpMsg : ""; ?> </p>

                <a href="http://into.id.lv/ip19/nils/game/login.php">Sing In</a>



            </form>


        </div>
    </div>
</body>

</html>