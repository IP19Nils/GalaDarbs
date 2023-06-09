<?php
include "../config/db.php";
include "../modules/dbOperations.php";

// Izgūst e-pastu un token no URL
$gmail = $_GET['gmailRegister'];
$token = $_GET['token'];

// Pieslēdzas datubāzei
$pdo = new PDO('mysql:host=localhost;dbname=NilsP', 'skolnieks', 'pQcM10ClEn3lSWy');

// Veic vaicājumu datubāzei, lai pārbaudītu, vai tokens atbilst e-pastam
$stmt = $pdo->prepare("SELECT * FROM userData WHERE gmail = :gmail AND token = :token");
$stmt->execute(['gmail' => $gmail, 'token' => $token]);
$user = $stmt->fetch();
$sql = "SELECT * FROM userData WHERE  gmail='$gmail'";
$result = select($sql, $conn);
while ($row = $result->fetch_assoc()) {
    $time = strtotime($row['registered']);
    if (time() - $time >= 1.5 * 60 * 60) {
        echo "Atvainojiet, verifikācijas laiks ir pagājis. Lūdzu, mēģiniet vēlreiz.";
        // Izmanto sagatavotu izteikumu ar parametrizētu vaicājumu
        $sql = "DELETE FROM userData WHERE gmail = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $gmail);
        $stmt->execute();
        // Pārbauda, vai vaicājums izpildījās veiksmīgi
        if ($stmt->affected_rows > 0) {
        }
    } else {
        if ($user) {
            // Atjauno `verified` lauku datubāzē, ja tokens atbilst
            $stmt = $pdo->prepare("UPDATE userData SET verified = 1 WHERE gmail = :gmail");
            $stmt->execute(['gmail' => $gmail]);

            // Rāda lietotājam paziņojumu
            echo "Jūsu e-pasts ir verificēts.";
        } else {
            // Rāda kļūdas paziņojumu, ja tokens neatbilst
            echo "Nederīga verifikācijas saite.";
        }
    }
}
