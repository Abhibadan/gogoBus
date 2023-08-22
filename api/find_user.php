<?php
header('Content-type:application/json;');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$email=$data['email'];
$password=md5($data['password']);
$sql="SELECT `user_id`,`password` FROM `user` WHERE `email`= '{$email}'";
$result=$conn->query($sql);
if($result->num_rows>0){
    $row=$result->fetch_assoc();
    if($row['password']==$password){
        echo json_encode(array('status'=>true,'message'=>$row['user_id']));
    }
    else{
        echo json_encode(array('status'=>false,'message'=>"Password doesn't match"));
    }
}
else{
    echo json_encode(array('status'=>false,'message'=>'Email not found'));
}
?>