<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

$username = $_POST['usernameLog'];
$passwd = $_POST['passwdLog'];

if (!empty($username || $passwd)) {
    if (!empty($username)) {
        if (!empty($passwd)) {
            // Prepare the SQL statement with placeholders
            $sql = "SELECT * FROM userData WHERE username=? OR gmail=?";
            $stmt = $conn->prepare($sql);

            // Bind the user input to the prepared statement parameters
            $stmt->bind_param("ss", $username, $username);
            $stmt->execute();

            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $usernameRow = $row['username'];
                    $gmailRow = $row['gmail'];
                    $verified = $row['verified'];
                    $time = $row['registered'];
                    if ($verified) {
                        // Verify the password using password_verify
                        if (($username == $usernameRow || $username == $gmailRow) && password_verify($passwd, $row['passwd'])) {
                            $_SESSION['id'] = $row['id'];
                            $_SESSION['logedIn'] = true;
                            echo "true";
                        } else {
                            echo "Parole vai lietotājvārds ir ievadīts nepareizi";
                        }
                    } else {
                        echo "Lūdzu verificējiet savu kontu";
                    }
                }
            } else {
                echo "Šāds lietotājs neeksistē";
            }

            // Close the prepared statement and the database connection
            $stmt->close();
            $conn->close();
        } else {
            echo "Aizpildiet Paroles ievades lauku";
        }
    } else {
        echo "Aizpildiet Lietotāja ievades lauku";
    }
} else {
    echo "Aizpildiet visus ievades laukus";
}
