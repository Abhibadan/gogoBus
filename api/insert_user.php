<?php
header('Content-type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$name=$data['name'];
$address=$data['address'];
$mno=$data['mno'];
$email=$data['email'];
$password=md5($data['password']);
$sql="INSERT INTO `user`(`name`, `email`, `mno`, `address`, `password`) VALUES ('{$name}','{$email}','{$mno}','{$address}','{$password}')";
try{
    $conn->query($sql);
    echo json_encode(array('status'=>true,'message'=>"{$conn->insert_id}"));
}
catch(Exception $e){
    echo json_encode(array('status'=>false,'message'=>"{$e->getMessage()}"));
}
?>