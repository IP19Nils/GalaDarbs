<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script>
    <script src="assets/js/script.js"></script>

    <title>Login</title>
</head>

<body>

    <div class="container center col">
        <div class="login-box center textCenter col">

            <form id="form" class="center col">

                <div id="login" style="display:block">
                    <h1>Ienākt</h1>
                    <input type="text" name="usernameLog" class="input-style" placeholder="Lietotājvārds vai ēpasts... " required>
                    <input type="password" name="passwdLog" class="input-style" placeholder="Parole..." required>
                    <button onclick="getInput('assets/controllers/select.php')" class="btn pointer">Ienākt</button>
                    <div class="links">
                        <button onclick="loginForgotPass()" class="link">Aizmirsi paroli</button>
                        <button onclick="loginRegister()" class="link">Reģistrēties</button>
                    </div>
                </div>

                <div id="forgotPass" style="display:none">
                    <h1>Aizmirsi paroli?</h1>
                    <input type="email" name="GmailForgotPass" class="input-style" placeholder="ēpasts" required>
                    <input type="text" name="UsernameForgotPass" class="input-style" placeholder="Lietotājvards" required>
                    <input type="password" name="NewPassword" class="input-style" placeholder="Jaunā parole" required>
                    <button onclick="getValue('assets/controllers/update.php')" class="btn pointer">Atjaunot paroli</button>
                    <button onclick="loginForgotPass()" class="link">Ienākt</button>
                </div>

                <div id="registr" style="display:none">
                    <h1>Reģistrēties</h1>
                    <div class="row center">
                        <input type="text" name="name" class="reg-style" placeholder="Vārds" required>
                        <input type="text" name="surname" class="reg-style" placeholder="Uzvārds" required>
                    </div>
                    <input type="email" name="gmailRegister" class="input-style" placeholder="Gmail@gmail.com" required>
                    <input type="text" name="usernameRegister" class="input-style" placeholder="Lietotājvards" required>
                    <div class="pass-eye">
                        <input type="password" name="passwdRegister" onclick="paswordStrenght()" class="input-style" id="password" placeholder="Parole" required>
                        <iconify-icon class="eye pointer" onclick="showHidePasswd()" icon="mdi:eye-outline"></iconify-icon>
                    </div>
                    <div class="pass-eye">
                        <input type="password" name="reapetPasswdRegister" class="input-style" id="repeatPassword" placeholder="Atkartot paroli" required>
                        <iconify-icon class="eye pointer" onclick="showHideRepeatPasswd()" icon="mdi:eye-outline"></iconify-icon>
                    </div>
                    <button onclick="getValue('assets/controllers/insert.php')" class="btn pointer">Reģistrēties</button>
                    <p id="strong"></p>
                    <button onclick="loginRegister()" class="link">Pievienoties</button>
                </div>
                <div id="msg" class="color-w"></div>
            </form>
        </div>
    </div>
</body>

</html>