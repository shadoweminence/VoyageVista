<?php
    header('Access-Control-Allow-Origin: http://localhost:3001');
    $user = $_POST['name'];
    echo ("Hello from server: $user");
?>