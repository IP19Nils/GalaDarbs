<?php
include "../config/db.php";
include "../modules/dbOperations.php";

$Gmail = $_POST['GmailForgotPass'];
$Username = $_POST['UsernameForgotPass'];
$Passwd =  $_POST['NewPassword'];
$hashPass = password_hash($Passwd, PASSWORD_DEFAULT);

if (!empty($Gmail || $Username || $Passwd)) {
    if (!empty($Gmail)) {
        if (!empty($Username)) {
            if (!empty($Passwd)) {
                $sql = "SELECT * FROM userData WHERE gmail='$Gmail' AND username='$Username'";
                $result = select($sql, $conn);
                while ($row = $result->fetch_assoc()) {
                    $usernameRow = $row['username'];
                    $gmailRow = $row['gmail'];
                    if ($Gmail == $gmailRow && $Username == $usernameRow) {
                        $sql = "UPDATE userData SET passwd='$hashPass' WHERE gmail='$Gmail' AND username='$Username'";
                        $text = insert($sql, $conn);
                        if ($text === TRUE) {
                            echo "Parole tika veiksmigi nomainita";
                        } else {
                            echo "Kluda! Neizdavas nomainit parole";
                        }
                    } else {
                        echo "Ievadīta parole vai epasts ir nepareizs";
                    }
                }
            } else {
                echo "Ievadiet savu jauno paroli";
            }
        } else {
            echo "Ievadiet savu lietotāj vārdu";
        }
    } else {
        echo "Ievadiet savu ēpastu";
    }
} else {
    echo "Aizpildiet visus ievades laukus";
}
