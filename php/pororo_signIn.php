<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];

    $sql = "SELECT userId, userName, userHp, userAddress, userBirth, userPw, userEmail
            FROM   pororo_table 
            WHERE  userId='$userId' AND userPw='$userPw'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'", "생년월일": "'.$record['userBirth'].'", "비밀번호": "'.$record['userPw'].'","이메일": "'.$record['userEmail'].'" }';
    }
    else{
        echo '';
    }
?>