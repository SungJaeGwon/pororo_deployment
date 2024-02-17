<?
    include_once('./pororo_header.php');

    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];

    $sql = "SELECT * FROM pororo_table 
            WHERE userName='$userName' AND userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);
  
    if( mysqli_num_rows($res) > 0 ){  
        $record = mysqli_fetch_array($res);
        echo '{"이름": "'.$record['userName'].'", "휴대폰번호": "'.$record['userHp'].'", "아이디": "'.$record['userId'].'", "가입일": "'.$record['userSignInDate'].'"}';
    }
    else{
        echo '';
    }
?>