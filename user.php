<?php
include('api/database/database.php');
    $sql="SELECT * FROM `user` WHERE `user_id`='{$_GET['id']}'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        $row=$result->fetch_assoc();
    }
    else{
        header("location: bus_login.php");
    }

?>
<html>
    <head>
        <title>
            contain
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css?v=1.1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rancho&effect=shadow-multiple|3d-float"> -->
    </head>
    <body>
        <div class="navbar">
            <h1>Bus sitting</h1>
            <a href="user_booking.php?id=<?php echo $_GET['id'];?>"><button class="btn" id="my_booking"> My booking</button></a>
        </div>
        <div class="container">
            <div class="row " id="heading">
                <div class="col-md-2 col-sm-2  d-flex justify-content-center">Bus</div>
                <div class="col-md-2 col-sm-2  d-flex justify-content-center">Departure</div>
                <div class="col-md-2 col-sm-2  d-flex justify-content-center">Arival</div>
                <div class="col-md-2 col-sm-2  d-flex justify-content-center">Date</div>
                <div class="col-md-2 col-sm-2  d-flex justify-content-center">Time</div>
                <div class="col-md-1 col-sm-1  d-flex justify-content-center">Fare</div>
                <div class="col-md-1 col-sm-1  d-flex justify-content-center"></div>
            </div>
            <div id="sits">
                
            </div>
            <div class="row">
                <input type="button" id="set_button" class="btn set" value="Book" style="visibility:hidden">
            </div>
            <div class="row">
                <input type="button" id="cancle_button" class="btn btn-danger" value="Cancle" style="visibility:hidden">
            </div>
        </div>
        <script>
           const user="<?php echo $_GET['id'];?>";
        </script>
        <script type="module" src="js/select_sit.js"></script>
    </body>