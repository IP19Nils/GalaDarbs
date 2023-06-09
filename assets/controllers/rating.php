<?php
session_start();
include "../config/db.php";
include "../modules/dbOperations.php";

function rating($conn)
{

    if (isset($_POST['win'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.win DESC";
        $result = select($sql, $conn);
        $rating = 1;
        echo "
        <style>
        .lose,
        .mach,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-rating-box hide-info'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Uzvaras🏆</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-rating-box hide-info'>
            " . $rating++ . "
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['win'] . "🏆</p>
            </div>
            ";
        }
    } else if (isset($_POST['lose'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.lose DESC";
        $result = select($sql, $conn);
        $rating = 1;
        echo "
        <style>
        .win,
        .mach,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-rating-box hide-info'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Zaudes❌</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-rating-box hide-info'>
            " . $rating++ . "
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['lose'] . "❌</p>
            </div>
            ";
        }
    } else if (isset($_POST['mach'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.mach DESC";
        $result = select($sql, $conn);
        $rating = 1;
        echo "
        <style>
        .lose,
        .win,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-rating-box hide-info'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Mači🏅</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-rating-box hide-info'>
            " . $rating++ . "
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['mach'] . "🏅</p>
            </div>
            ";
        }
    } else if (isset($_POST['money'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.money DESC";
        $result = select($sql, $conn);
        $rating = 1;
        echo "
        <style>
        .lose,
        .mach,
        .win {
            opacity: .2;
        }
        </style>
        <div class='mini-rating-box hide-info'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Nauda💵</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-rating-box hide-info'>
            " . $rating++ . "
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['money'] . "💵</p>
            </div>
            ";
        }
    } else {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userData.username ASC";
        $result = select($sql, $conn);
        $rating = 1;
        echo "
        <div class='rating-box hide-info'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Nauda💵</p>
            <p class='sort-box'>Mači🏅</p>
            <p class='sort-box'>Uzvaras🏆</p>
            <p class='sort-box'>Zaudes❌</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='rating-box hide-info'>
            " . $rating++ . "
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['money'] . "💵</p>
                <p class='sort-box'>" . $row['mach'] . "🏅</p>
                <p class='sort-box'>" . $row['win'] . "🏆</p>
                <p class='sort-box'>" . $row['lose'] . "❌</p>
            </div>
            ";
        }
    }

    echo '<style>';
    echo '@media only screen and (max-width: 1010px) {';

    if (isset($_POST['win'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.win DESC";
        $result = select($sql, $conn);
        echo "
        <style>
        .lose,
        .mach,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-box-info-hide mini-rating-box'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Uzvaras🏆</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-box-info-hide mini-rating-box'>
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['win'] . "🏆</p>
            </div>
            ";
        }
    } else if (isset($_POST['lose'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.lose DESC";
        $result = select($sql, $conn);
        echo "
        <style>
        .win,
        .mach,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-box-info-hide mini-rating-box'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Zaudes❌</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-box-info-hide mini-rating-box'>
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['lose'] . "❌</p>
            </div>
            ";
        }
    } else if (isset($_POST['mach'])) {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.mach DESC";
        $result = select($sql, $conn);
        echo "
        <style>
        .lose,
        .win,
        .money {
            opacity: .2;
        }
        </style>
        <div class='mini-box-info-hide mini-rating-box'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Mači🏅</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-box-info-hide mini-rating-box'>
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['mach'] . "🏅</p>
            </div>
            ";
        }
    } else {
        $sql = "SELECT * FROM userData, userMach WHERE userMach.userID=userData.id ORDER BY userMach.money DESC";
        $result = select($sql, $conn);
        echo "
        <style>
        .lose,
        .mach,
        .win {
            opacity: .2;
        }
        </style>
        <div class='mini-box-info-hide mini-rating-box'>
            <p class='sort-box'></p>
            <p class='sort-box'>Lietotājvards</p>
            <p class='sort-box'>Nauda💵</p>
        </div>";
        while ($row = $result->fetch_assoc()) {
            echo "
            <div class='mini-box-info-hide mini-rating-box'>
                <p class='sort-box'><img src=" . $row['img'] . " alt='Profile Image' style='width: 5vh; height: 5vh; object-fit: cover;'></p>
                <p class='sort-box'>" . $row['username'] . "</p>
                <p class='sort-box'>" . $row['money'] . "💵</p>
            </div>
            ";
        }
    }
}
