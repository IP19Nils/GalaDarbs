<?php
include "../config/db.php";
include "../modules/dbOperations.php";

function matchData($conn)
{
    $userid = $_SESSION['id'];
    $sql = "SELECT * FROM userMach, userData WHERE userData.id='$userid' AND userMach.userID='$userid'";
    $result = select($sql, $conn);
    while ($row = $result->fetch_assoc()) {
        echo "
        <div class='profile-box center'>
        <div class='col center'>
            <div class='row-profile'>
                <div class='w50 center'>
                    <form method='POST' class='col ai-center' enctype='multipart/form-data'>
                        <p>" . "Lietotājvards: " . $row['username'] . "</p>
                        <label for='image'>
                            <img src=" . $row['img'] . " alt='Profile Image' style='width: 20vh; height: 20vh; object-fit: cover;'>
                        </label>
                        <input type='file' id='image' name='image' style='display:none;'>
                        <button type='submit' name='submit' class='imgButton pointer'>Pievienot bildi</button>
                    </form>
                </div>
                <div class='w50-username center col'>
                    <div class='w50-split center'>
                        <div class='col'>
                            <button name='money' onclick=getValue('assets/controllers/money.php') class='link pointer profile-btn'>Nav naudas?</button>
                            <button onclick='changeUsername()' class='link pointer profile-btn'>Nomainīt lietotājvardu</button>
                            <form id='form' class='center'>
                                <button onclick=getValue('assets/controllers/delete.php') class='link pointer delete-btn'>dzēst?</button>
                        </div>
                    </div>
                    <div id='msg' class='color text-w textCenter'></div>
                    <div class='w50-split jc-start'>
                        <div id='showUp' style='display:none'>
                            <div class='usernameChange center col'>
                                <input type='text' class='input-changeUsername' name='wtf' placeholder='Jaunais lietotājvards'>
                                <input type='password' class='input-changeUsername' name='wtf2' placeholder='Apsiptināt paroli..'>
                                <div class='gap10 row'>
                                    <button class='btn-changeUsername' onclick=getValue('assets/controllers/usernameChange.php')>Mainīt</button>
                                    <button class='btn-changeUsername' onclick='changeUsername()'>Aizvērt</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='w50-text center col'>
                <p>" . "Nauda: " . $row['money'] . "</p>
                <p>" . "Mači: " . $row['mach'] . "</p>
                <p>" . "Uzvaras: " . $row['win'] . "</p>
                <p>" . "Zaudes: " . $row['lose'] . "</p>
            </div>
        </div>
    </div>
";
    }

    if (isset($_POST['submit'])) {
        $image = $_FILES['image']['tmp_name'];
        $image_name = $_FILES['image']['name'];
        $image_type = $_FILES['image']['type'];
        $image_size = $_FILES['image']['size'];

        // Check if the uploaded file is an image
        $allowed_types = array('image/jpeg', 'image/png', 'image/gif', 'image/jpg');
        if (!in_array($image_type, $allowed_types)) {
            echo "<p class='imgText'>Nederīgs faila tips. Lūdzu izēlaties kādu no šiem GIF, JPEG, PNG</p>";
            exit();
        }

        // Check if the uploaded file size is within limits
        $max_size = 1000000; // 1 MB
        if ($image_size > $max_size) {
            echo "<p class='imgText'>Faila izmērs parāk liels. Lūdzu izvēleties failu kas mazāks par 1MB.</p>";
            exit();
        }

        // Save the uploaded image to a folder on your server
        $target_dir = "assets/image/";
        $target_file = $target_dir . $image_name;
        move_uploaded_file($image, $target_file);

        // Update the users profile image in the database
        $sql = "UPDATE userMach SET img='$target_file' WHERE userID='$userid'";
        $result = insert($sql, $conn);
        if ($result) {
            echo "<p class='imgText'>Profila bilde veiksmīgi atjaunota, lai redzētu atjauniniet lapu.</p>";
        } else {
            echo "<p class='imgText'>Neizdevās atjaunot profila bildi.</p>";
        }
    }
}
