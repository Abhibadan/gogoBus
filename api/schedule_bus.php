<?php
header("Content-type:Application/json");
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin");
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$date=date_create($data['date']);
$date=date_format($date,"Y/m/d");
$bus_id=$data['bus_id'];
$time=$data['time'];
$from=$data['from'];
$to=$data['to'];
$rate=$data['rate'];
$sql="INSERT INTO `bus_schedule`(`bus_id`,`departure_date`, `departure_time`, `departure`, `arival`, `rate`) VALUES ('{$bus_id}','{$date}','{$time}','{$from}','{$to}','{$rate}')";
try{
    $conn->query($sql);
    echo json_encode(array('status'=>true,'message'=>'Record inserted successfully'));
}
catch(Exception $e){
    echo json_encode(array('status'=>false,'message'=>"{$e->getMessage()}"));
}
?>