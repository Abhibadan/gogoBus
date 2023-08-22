<?php
include('api/database/database.php');
    $sql="SELECT * FROM `bus_details` WHERE `bus_number`='{$_GET['bus']}'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        $row=$result->fetch_assoc();
        $bus_id=$row['bus_id'];
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
        <div id="modal_back">
        <?php
            include("edit_modal.php");
            include("view_sit_modal.php");?>
        </div>
        <div class="navbar">
            <h1>Bus sitting</h1>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <label for="from">From</label>
                    <input type="text" name="from" id="from"> 
                </div>
                <div class="col-6">
                    <label for="to">To</label>
                    <input type="text" name="to" id="to"> 
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label for="date">Date</label>
                    <input type="date" name="date" id="date"> 
                </div>
                <div class="col-4">
                    <label for="time">time</label>
                    <input type="time" name="time" id="time"> 
                </div>
                <div class="col-4">
                    <label for="rate">Rate</label>
                    <input type="number" name="rate" id="rate">
                </div>
            </div>
            <div class="row">
                <input type="button" id="schedule_button" class="btn set" value="New Schedule">
            </div>
            <div class="row">
                <div id="schedules">
                    
                </div>
            </div>
            
        </div> 
        <script>
            const bus_id="<?php echo $bus_id; ?>";
        </script>

        <script type="module" src="./js/schedule_bus.js"></script>
        <script src="js/update.js"></script>
        <script type="module" src="./js/view_sit.js"></script>
    </body>