<?php
include "../config/db.php";
include "../modules/dbOperations.php";

$gmail = $_POST['GmailForgotPass'];
$username = $_POST['UsernameForgotPass'];
$passwd =  $_POST['NewPassword'];
$hashPass = password_hash($passwd, PASSWORD_DEFAULT);
$uppercase = preg_match('@[A-Z]@', $passwd);
$lowercase = preg_match('@[a-z]@', $passwd);
$number = preg_match('@[0-9]@', $passwd);
$symbol = preg_match('@[^A-Za-z0-8]@', $passwd);

if (!empty($gmail || $username || $passwd)) {
    if (!empty($gmail)) {
        if (!empty($username)) {
            if (!empty($passwd)) {
                if (!$lowercase) {
                    echo "Parolej jasatur mazie burti";
                } else {
                    if (!$uppercase) {
                        echo "Parolej jasatur lielie burti";
                    } else {
                        if (!$number) {
                            echo "Parolej jasatur cipari";
                        } else {
                            if (!$symbol) {
                                echo "Parolej jasatur simboli";
                            } else {
                                if (strlen($passwd) < 8) {
                                    echo "Parolej jabūt vismaz 8 rakstzīmēm";
                                } else {
                                    $sql = "SELECT * FROM userData WHERE gmail='$gmail' AND username='$username'";
                                    $result = select($sql, $conn);
                                    if ($result) {
                                        while ($row = $result->fetch_assoc()) {
                                            $usernameRow = $row['username'];
                                            $gmailRow = $row['gmail'];
                                            if ($gmail == $gmailRow && $username == $usernameRow) {
                                                $sql = "UPDATE userData SET passwd='$hashPass' WHERE gmail='$gmail' AND username='$username'";
                                                $text = insert($sql, $conn);
                                                if ($text === TRUE) {
                                                    echo "Parole tika veiksmigi nomainita";
                                                } else {
                                                    echo "Kluda! Neizdavas nomainit parole";
                                                }
                                            } else {
                                                echo "Ievadīta lietotājvards vai epasts ir nepareizs";
                                            }
                                        }
                                    } else {
                                        echo "Nepareizi ievadīti dati";
                                    }
                                }
                            }
                        }
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
