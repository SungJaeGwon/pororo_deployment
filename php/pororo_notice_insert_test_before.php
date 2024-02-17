<?
    include_once('./pororo_header.php');

    $wType    = $_POST['wType'];
    $wName    = $_POST['wName'];
    $wId      = $_POST['wId'];
  
    $wType    = $_POST['wType'];
    $wSubjuct = $_POST['wSubjuct'];
    $wContent = $_POST['wContent'];
    $wName    = $_POST['wName'];
    $wId      = $_POST['wId'];

    $sql = "INSERT INTO pororo_notice_table (wType, wSubjuct, wContent, wName, wId)
                VALUES ('$wType','$wSubjuct','$wContent','$wName','$wId')";
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>