<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    
    $sql = "DELETE FROM pororo_table          
            WHERE   userId='$userId'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>