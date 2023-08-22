<?php
header('Content-type:application/json;');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);

$sql="INSERT INTO `booking`(`schedule_id`, `user_id`, `sit_number`) VALUES ('{$data['schedule_id']}','{$data['user']}','{$data['sit']}')";
try{
    $conn->query($sql);
    echo json_encode(array('status'=>true,'message'=>'booking successfull'));
}
catch(Exception $e){
    echo json_encode(array('status'=>false,'message'=>"{$e->getMessage()}"));
}
?>