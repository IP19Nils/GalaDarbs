<?php

if(!$_SESSION['id']) {
    header("Location: ./login.php");
    exit();
 }