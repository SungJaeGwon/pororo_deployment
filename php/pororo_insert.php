<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];
    $userName   = $_POST['userName'];
    $userHp = $_POST['userHp'];
    $userAddress    = $_POST['userAddress'];
    $userEmail  = $_POST['userEmail'];
    $userBirth  = $_POST['userBirth'];
    $userRecommend  = $_POST['userRecommend'];
    $userService    = $_POST['userService'];

    $sql = "INSERT INTO pororo_table (userId, userPw, userName ,userHp, userAddress, userEmail, userBirth, userRecommend, userService) 
            VALUES ('$userId','$userPw','$userName','$userHp','$userAddress', '$userEmail','$userBirth','$userRecommend', '$userService')";

    $result = mysqli_query($conn, $sql);

    if( $result===true ){
        echo 1;
    }
    else {
        echo 0;
    }
?>