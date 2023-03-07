<?php
    if (isset($_POST['logOut'])) {
        session_destroy();
        header("Location: ./login.php");
    }

