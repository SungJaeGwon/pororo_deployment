<?
    include_once('./pororo_header.php');
    
    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];

    $sql = "DELETE FROM pororo_table
            WHERE userId='$userId' AND userPw='$userPw'";

    $result = mysqli_query($conn, $sql);

    if( $result==true ){
        echo 1;
    }
    else {
        echo 0;
    }
?>