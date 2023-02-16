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

            <form id="form">

                <div id="login" style="display:block">
                    <h1>Sign In</h1>
                    <input type="text" name="usernameLog" class="input-style" placeholder="Username or email... " required>
                    <input type="password" name="passwdLog" class="input-style" placeholder="Password..." required>
                    <button onclick="getInput('assets/controllers/select.php')" class="btn pointer">Login</button>
                    <div class="links">
                        <button onclick="loginForgotPass()" class="link">Forgot Password</button>
                        <button onclick="loginRegister()" class="link">Registration</button>
                    </div>
                </div>

                <div id="forgotPass" style="display:none">
                    <h1>Forgot password?</h1>
                    <input type="email" name="GmailForgotPass" class="input-style" placeholder="gmail" required>
                    <input type="text" name="UsernameForgotPass" class="input-style" placeholder="username" required>
                    <input type="password" name="NewPassword" class="input-style" placeholder="New password" required>
                    <button onclick="getInput('assets/controllers/update.php')" class="btn pointer">Update password</button>
                    <button onclick="loginForgotPass()" class="link">Sing In</button>
                </div>

                <div id="registr" onclick="paswordStrenght()" style="display:none">
                    <h1>Registration</h1>
                    <div class="row center">
                        <input type="text" name="name" class="reg-style" placeholder="Name" required>
                        <input type="text" name="surname" class="reg-style" placeholder="Surname" required>
                    </div>
                    <input type="email" name="gmailRegister" class="input-style" placeholder="Gmail@gmail.com" required>
                    <input type="text" name="usernameRegister" class="input-style" placeholder="Username" required>
                    <div class="pass-eye">
                        <input type="password" name="passwdRegister" class="input-style" id="password" placeholder="Password" required>
                        <iconify-icon class="eye pointer" onclick="showHide()" icon="mdi:eye-outline"></iconify-icon>
                    </div>
                    <input type="password" name="reapetPasswdRegister" class="input-style" placeholder="Reapet password" required>
                    <button onclick="getInput('assets/controllers/insert.php')" class="btn pointer">Register</button>
                    <p id="strong"></p>
                    <button onclick="loginRegister()" class="link">Sign In</button>
                </div>
                <div id="msg"></div>
            </form>
        </div>
    </div>
</body>

</html>
