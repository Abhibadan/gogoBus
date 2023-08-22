<?php
header('Content-type:application/json;');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$data=json_decode(file_get_contents("php://input"),true);
$sql="SELECT * FROM `bus_schedule` WHERE `id`='{$data['id']}'";
$result=$conn->query($sql);
if($result->num_rows>0){
    $row=$result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);
}
else{
    echo json_encode(array('message'=>'failure','status'=>false));
}
?>