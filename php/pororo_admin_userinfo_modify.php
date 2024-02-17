<?
    include_once('./pororo_header.php');

    $userId=$_POST['userId'];
    $userHp=$_POST['userHp'];
    $userPw=$_POST['userPw'];
    $userName=$_POST['userName'];
    $userEmail=$_POST['userEmail'];
    $userAddress=$_POST['userAddress'];
    $userBirth=$_POST['userBirth'];

    $sql = "UPDATE pororo_table 
            SET userPw='$userPw', userEmail='$userEmail', userAddress='$userAddress',userName='$userName',userBirth='$userBirth'
            WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
    
    if( $res ==true){
        echo 1;
    }
    else {
        echo 0;
    }

?>