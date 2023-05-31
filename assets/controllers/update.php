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
                    echo "Parolē jābūt mazajiem burtiem";
                } else {
                    if (!$uppercase) {
                        echo "Parolē jābūt lielajiem burtiem";
                    } else {
                        if (!$number) {
                            echo "Parolē jābūt cipariem";
                        } else {
                            if (!$symbol) {
                                echo "Parolē jābūt simboliem";
                            } else {
                                if (strlen($passwd) < 8) {
                                    echo "Parolei jābūt vismaz 8 rakstzīmēm";
                                } else {
                                    // Prepare the SQL statement with placeholders
                                    $sql = "SELECT * FROM userData WHERE gmail=? AND username=?";
                                    $stmt = $conn->prepare($sql);

                                    // Bind the user input to the prepared statement parameters
                                    $stmt->bind_param("ss", $gmail, $username);
                                    $stmt->execute();

                                    $result = $stmt->get_result();

                                    if ($result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            $usernameRow = $row['username'];
                                            $gmailRow = $row['gmail'];
                                            if ($gmail == $gmailRow && $username == $usernameRow) {
                                                // Prepare the update SQL statement with placeholders
                                                $updateSql = "UPDATE userData SET passwd=? WHERE gmail=? AND username=?";
                                                $updateStmt = $conn->prepare($updateSql);
                                                $updateStmt->bind_param("sss", $hashPass, $gmail, $username);
                                                $updateStmt->execute();

                                                if ($updateStmt->affected_rows > 0) {
                                                    echo "Parole tika veiksmīgi nomainīta";
                                                } else {
                                                    echo "Kļūda! Neizdevās nomainīt paroli";
                                                }

                                                $updateStmt->close();
                                            } else {
                                                echo "Ievadītais lietotājvārds vai e-pasts ir nepareizs";
                                            }
                                        }
                                    } else {
                                        echo "Nepareizi ievadīti dati";
                                    }

                                    $stmt->close();
                                }
                            }
                        }
                    }
                }
            } else {
                echo "Ievadiet savu jauno paroli";
            }
        } else {
            echo "Ievadiet savu lietotājvārdu";
        }
    } else {
        echo "Ievadiet savu e-pastu";
    }
} else {
    echo "Aizpildiet visus ievades laukus";
}
