<?php
header('Content-type:application/json;');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Conten-Type,Access-Control-Allow-Methods,Access-Control-Allow-Origin');
include("database/database.php");
$sql="SELECT bus_details.bus_number,bus_details.row_number,bus_details.column_number,bus_schedule.* FROM bus_details JOIN bus_schedule ON bus_details.bus_id=bus_schedule.bus_id WHERE bus_schedule.state IS NULL";
$result=$conn->query($sql);
if($result->num_rows>0){
    $row=$result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row);
}
else{
    echo json_encode(array('message'=>'failure','status'=>404));
}
?>