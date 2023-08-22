<?php
header("Content-type:Application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin");
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$sql="UPDATE `bus_schedule` SET `departure_date`='{$data['date']}',`departure_time`='{$data['time']}',`departure`='{$data['from']}',`arival`='{$data['to']}',`rate`='{$data['rate']}' WHERE `id`='{$data['id']}'";
try{
    $conn->query($sql);
    echo json_encode(array('status'=>true,'message'=>'Record inserted successfully'));
}
catch(Exception $e){
    echo json_encode(array('status'=>false,'message'=>"{$e->getMessage()}"));
}
?>