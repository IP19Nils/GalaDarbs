<?php

function insert($sql, $conn) {
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

function select($sql, $conn) {
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        return $result;
    } else {
        return false;
    }
}
