<?php
$ncco = array(
            "action"=>  "talk" ,
            "text"=> "Hello World"
        );

header('Content-Type: application/json');
echo json_encode($ncco);
?>
