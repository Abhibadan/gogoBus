<?php
header('Content-type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$bus_number=$data['bus_number'];
$row_number=$data['row_number'];
$column_number=$data['column_number'];
$licence=$data['licence'];
$sql="INSERT INTO `bus_details`(`bus_number`, `licence`, `row_number`, `column_number`) VALUES ('{$bus_number}','{$licence}','{$row_number}','{$column_number}')";
try{
    $conn->query($sql);
    echo json_encode(array('status'=>true,'message'=>'Record inserted successfully'));
}
catch(Exception $e){
    echo json_encode(array('status'=>false,'message'=>"{$e->getMessage()}"));
}
?>