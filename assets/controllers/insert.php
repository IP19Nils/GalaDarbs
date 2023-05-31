<?php
include "../config/db.php";
include "../modules/dbOperations.php";

require '../../PHPMailer-master/src/PHPMailer.php';
require '../../PHPMailer-master/src/SMTP.php';
require '../../PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Generate a random token
$token = bin2hex(random_bytes(16));

$name = $_POST['name'];
$surname = $_POST['surname'];
$gmail = $_POST['gmailRegister'];
$username = $_POST['usernameRegister'];
$passwd = $_POST['passwdRegister'];
$reapetPasswd = $_POST['reapetPasswdRegister'];
$hashPass = password_hash($passwd, PASSWORD_DEFAULT);
$uppercase = preg_match('@[A-Z]@', $passwd);
$lowercase = preg_match('@[a-z]@', $passwd);
$number = preg_match('@[0-9]@', $passwd);
$symbol = preg_match('@[^A-Za-z0-8]@', $passwd);



if (!empty($name || $surname || $gmail || $username || $passwd || $reapetPasswd)) {
    if (!empty($name)) {
        if (!empty($surname)) {
            if (!empty($gmail)) {
                if (!empty($username)) {
                    if (!empty($passwd)) {
                        if (!empty($reapetPasswd)) {
                            if ($passwd == $reapetPasswd) {
                                if (!$lowercase) {
                                    echo "Parolei jasatur mazie burti";
                                } else {
                                    if (!$uppercase) {
                                        echo "Parolei jasatur lielie burti";
                                    } else {
                                        if (!$number) {
                                            echo "Parolei jasatur cipari";
                                        } else {
                                            if (!$symbol) {
                                                echo "Parolei jasatur simboli";
                                            } else {
                                                if (strlen($passwd) < 8) {
                                                    echo "Parolei jabūt vismaz 8 rakstzīmēm";
                                                } else {
                                                    if (!filter_var($gmail, FILTER_VALIDATE_EMAIL)) {
                                                        echo "Nederīgs e-pasta formāts";
                                                    } else {
                                                        $sql = "SELECT * FROM userData WHERE username= ? OR gmail= ?";
                                                        $stmt = $conn->prepare($sql);
                                                        $stmt->bind_param("ss", $username, $gmail);
                                                        $stmt->execute();
                                                        $result = $stmt->get_result();
                                                        if ($result->num_rows > 0) {
                                                            echo "Lietotājs ar šadu lietotājvārdu vai ēpastu jau eksistē";
                                                        } else {
                                                            $mail = new PHPMailer;
                                                            // SMTP settings
                                                            $mail->isSMTP();
                                                            $mail->Host       = 'smtp.gmail.com';
                                                            $mail->CharSet = 'UTF-8';
                                                            $mail->SMTPAuth   = true;
                                                            $mail->Username   = 'ip19.n.podins@vtdt.edu.lv';
                                                            $mail->Password   = 'Nilspodins123!';
                                                            $mail->SMTPSecure = 'tls';
                                                            $mail->Port       = 587;
                                                            $mail->setFrom('ip19.n.podins@vtdt.edu.lv', 'CardGame');
                                                            $mail->addAddress($gmail);
                                                            $mail->Subject = 'Ēpasta verificēšana';
                                                            $mail->Body = 'Cienītais ' . $name . ' ' . $surname . ', Lūdzu nospiediet uz saites lai verificētu savu profilu. http://into.id.lv/ip19/nils/game/assets/controllers/verify.php?gmailRegister=' . $gmail . '&token=' . $token;
                                                            if (!$mail->send()) {
                                                                echo '';
                                                                echo 'Mailer Error: ' . $mail->ErrorInfo;
                                                            } else {
                                                                echo 'Verifikācijas emails tika nosūtīts uz norādito ēpastu.';
                                                            }
                                                            $sql = "INSERT INTO userData(name, surname, gmail, username, passwd, token, verified, registered)
                                                            VALUES (?, ?, ?, ?, ?, ?, '0', NOW())";
                                                            $stmt = $conn->prepare($sql);
                                                            $stmt->bind_param("ssssss", $name, $surname, $gmail, $username, $hashPass, $token);
                                                            if ($stmt->execute()) {
                                                                $last_id = $conn->insert_id;
                                                                $sql = "INSERT INTO userMach(money, userID, mach, win, lose, img, lastClick)
                                                            VALUE ('1000', ?, '0', '0', '0', 'assets/image/userIcon.png', '0000-00-00 00:00:00')";
                                                                $stmt = $conn->prepare($sql);
                                                                $stmt->bind_param("i", $last_id);
                                                                if ($stmt->execute()) {
                                                                    echo "Veiksmīgi izveidots lietotājs, pirms pievienošanās lūdzu verificējiet savu kontu.";
                                                                } else {
                                                                    echo "Kļūda! Neizdodas izveidot.";
                                                                }
                                                            } else {
                                                                echo "Kļūda! Neizdodas izveidot.";
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
                    echo "Ievadiet savu lietotājvārdu";
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
