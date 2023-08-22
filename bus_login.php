<?php
include('api/database/database.php');
if(isset($_POST["find_bus"])){
    $sql="SELECT * FROM `bus_details` WHERE `bus_number`='{$_POST['bus_number']}'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        header("location: bus_time.php?bus={$_POST['bus_number']}");
    }
}
?>
<html>
    <head>
        <title>
            contain
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rancho&effect=shadow-multiple|3d-float"> -->
    </head>
    <body>
        <div class="navbar">
            <h1>Bus sitting</h1>
        </div>
        <div class="container">
            <form method="post" action="bus_login.php">
            <div class="row">
                <label>Already registered</label> 
                <input type="text" name="bus_number" placeholder="Bus number" id="bus_number"> 
            </div>
            <div class="row">
                <button type="submit" name="find_bus" class="btn set" >Log in</button>
            </div>
            </form>
            <div class="row">
                <label for="signin">new Registration</label> 
                <a href="bus_register.html"><input type="button" class="btn set" value="register"></a>
            </div>
        </div>
    </body>
</html>