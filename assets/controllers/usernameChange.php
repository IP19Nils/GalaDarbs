<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

$username = $_POST['username'];
$password = $_POST['passwd'];
$user_id = $_SESSION['id'];

if (!empty($username || $password)) {
if (!empty($username)) {
    if (!empty($password)) {
        $sql = "SELECT * FROM userData WHERE username='$username'";
        $result = select($sql, $conn);
        if ($result) {
            echo "Lietotājvārds jau ir aizņemts";
        } else {
            $sql = "SELECT * FROM userData WHERE id='$user_id'";
            $result = select($sql, $conn);
            while ($row = $result->fetch_assoc()) {
                if (password_verify($password, $row['passwd'])) {
                    $sql = "UPDATE userData SET username='$username' WHERE id='$user_id'";
                    $text = insert($sql, $conn);
                    if ($text === TRUE) {
                        echo "Lietotājvārds tika veiksmīgi nomainīts";
                    } else {
                        echo "Kļūda! Neizdodas nomainīt lietotājvārdu";
                    }
                } else {
                    echo "Nepareiza parole!";
                }
            }
        }
    } else {
        echo "Aizpildiet paroles ievades lauku";
    }
} else {
    echo "Aizpildiet lietotāja ievades lauku";
}
} else {
    echo "Aizpildiet visus ievades laukus";
}