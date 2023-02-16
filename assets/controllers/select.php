<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

$username = $_POST['usernameLog'];
$passwd = $_POST['passwdLog'];
if (!empty($username || $passwd)) {
    if (!empty($username)) {
        if (!empty($passwd)) {
            $sql = "SELECT * FROM userData WHERE username='$username' OR gmail='$username'";
            $result = select($sql, $conn);
            if ($result) {
                while ($row = $result->fetch_assoc()) {
                    $usernameRow = $row['username'];
                    $gmailRow = $row['gmail'];
                    if ($username == $usernameRow && password_verify($passwd, $row['passwd']) || $username == $gmailRow && password_verify($passwd, $row['passwd'])) {
                        $_SESSION['id'] = $row['id'];
                        $_SESSION['logedIn'] = true;
                        echo "true";
                    } else {
                        echo "Parole vai lietotaj vārds ir ievadīts nepareizi";
                    }
                }
            } else {
                echo "Šāds lietotājs neeksistē";
            }
        } else {
            echo "Aizpildiet Paroles ievades lauku";
        }
    } else {
        echo "Aizpildiet Litotaja ievades lauku";
    }
} else {
    echo "Aizpildiet visus ievades laukus";
}
