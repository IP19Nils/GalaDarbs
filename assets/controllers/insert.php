<?php
include "../config/db.php";
include "../modules/dbOperations.php";

$name = $_POST['name'];
$surname = $_POST['surname'];
$gmail = $_POST['gmailRegister'];
$username = $_POST['usernameRegister'];
$passwd = $_POST['passwdRegister'];
$reapetPasswd = $_POST['reapetPasswdRegister'];
$hashPass = password_hash($passwd, PASSWORD_DEFAULT);
$uppercase = preg_match('@[A-Z]@', $passwd);
$lowercase = preg_match('@[a-z]@', $passwd);
$number    = preg_match('@[0-9]@', $passwd);
$symbol    = preg_match('@[^A-Za-z0-8]@', $passwd);



if (!empty($name || $surname || $gmail || $username || $passwd || $reapetPasswd)) {
    if (!empty($name)) {
        if (!empty($surname)) {
            if (!empty($gmail)) {
                if (!empty($username)) {
                    if (!empty($passwd)) {
                        if (!empty($reapetPasswd)) {
                            if ($passwd == $reapetPasswd) {
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
                                                    if (!filter_var($gmail, FILTER_VALIDATE_EMAIL)) {
                                                        echo "Nederīgs e-pasta formāts";
                                                    } else {
                                                        $sql = "SELECT * FROM userData WHERE username='$username' OR gmail='$gmail'";
                                                        $result = select($sql, $conn);
                                                        if ($result) {
                                                            echo "User with that gmail or username alerady exist";
                                                        } else {
                                                            $sql = "INSERT INTO userData(`name`, surname, gmail, username, passwd)
    VALUES ('$name', '$surname', '$gmail', '$username', '$hashPass')";

                                                            $text = insert($sql, $conn);
                                                            if ($text === TRUE) {
                                                                $last_id = $conn->insert_id;
                                                                $sql = "INSERT INTO userMach(`money`, userID, mach, win, lose, img) 
                                        VALUE ('1000', '$last_id', '0', '0', '0', 'assets/image/userIcon.png')";
                                                                if (insert($sql, $conn) === TRUE) {
                                                                    echo "Veiksmigi izveidots lietotajs.";
                                                                } else {
                                                                    echo "Kluda! Neizdavas izveidot.";
                                                                }
                                                            } else {
                                                                echo "Kluda! Neizdavas izveidot.";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                echo "Paroles nesakrīt";
                            }
                        } else {
                            echo "Aizpildiet atkartotas paroles ievades lauku";
                        }
                    } else {
                        echo "Ievadiet savu paroli";
                    }
                } else {
                    echo "Ievadiet savu lietotāj vārdu";
                }
            } else {
                echo "Ievadiet savu ēpastu";
            }
        } else {
            echo "Ievadiet savu uzvārdu";
        }
    } else {
        echo "Ievadiet savu vārdu";
    }
} else {
    echo "Aizpildiet visus ievades laukus";
}
