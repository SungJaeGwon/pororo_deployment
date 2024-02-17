<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    $userEmail = $_POST['userEmail'];

    $sql = "SELECT * FROM pororo_table 
            WHERE userId='$userId' AND userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);
  
    if( mysqli_num_rows($res) > 0 ){  
        $record = mysqli_fetch_array($res);
        echo '{"비밀번호": "'.$record['userPw'].'"}';
    }
    else{
        echo '';
    }
?>