<?php
include "../config/db.php";
include "assets/modules/dbOperations.php";


function matchData($conn)
{
    $userid = $_SESSION['id'];
    $sql = "SELECT * FROM userMach, userData WHERE userData.id='$userid' AND userMach.userID='$userid'";
    $result = select($sql, $conn);
    while ($row = $result->fetch_assoc()) {
        echo "
            <div class='profile-box'>
                <div class='row'>
                    <div class='w30'>
                        <form method='POST' class='row' enctype='multipart/form-data'>
                            <label for='image'>
                                <img src=" . $row['img'] . " alt='Profile Image' style='width: 20vh; height: 20vh; object-fit: cover;'>
                            </label>
                            <input type='file' id='image' name='image' style='display:none;'>
                            <button type='submit' name='submit' class='imgButton'>Add Image</button>
                        </form>
                    </div>
                    <div class='w80 center col'>
                        <p>" . "Username: " . $row['username'] . "</p>
                        <p>" . "Money: " . $row['money'] . "</p>
                        <p>" . "Mach: " . $row['mach'] . "</p>
                        <p>" . "Win: " . $row['win'] . "</p>
                        <p>" . "Lose: " . $row['lose'] . "</p>
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
        $allowed_types = array('image/jpeg', 'image/png', 'image/gif, image/jpg');
        if (!in_array($image_type, $allowed_types)) {
            echo "<p class='imgText'>Invalid file type. Please upload a JPEG, PNG, or GIF file.</p>";
            exit();
        }

        // Check if the uploaded file size is within limits
        $max_size = 1000000; // 1 MB
        if ($image_size > $max_size) {
            echo "<p class='imgText'>File size is too large. Please upload an image smaller than 1 MB.</p>";
            exit();
        }

        // Save the uploaded image to a folder on your server
        $target_dir = "assets/image/";
        $target_file = $target_dir . $image_name;
        move_uploaded_file($image, $target_file);

        // Update the users profile image in the database
        $sqll = "UPDATE userMach SET img='$target_file' WHERE userID='$userid'";
        $results = update($sqll, $conn);
        if ($results) {
            echo "<p class='imgText'>Profile image updated successfully, to see it refresh page.</p>";
        } else {
            echo "<p class='imgText'>Failed to update profile image.</p>";
        }
    }
}
