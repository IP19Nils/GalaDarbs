<?php
session_start();
include "assets/controllers/matchData.php";
include "assets/controllers/sessionDestroy.php";
include "assets/controllers/session.php";
include "assets/controllers/rightline.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="assets/image/3043464.jpg">
    <script src="assets/js/script.js"></script>
    <title>Profile</title>
</head>

<body>
    <div class="container center col">
        <?php echo matchData($conn); ?>
    </div>
</body>

</html>