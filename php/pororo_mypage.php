<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    $userEmail = $_POST['userEmail'];
    $userHp = $_POST['userHp'];
    $userAddress = $_POST['userAddress'];
    $userPw = $_POST['userPw'];

    $sql = "UPDATE pororo_table 
            SET userEmail = '$userEmail',userHp = '$userHp', userAddress = '$userAddress', userPw = '$userPw'
            WHERE userId='$userId'";
    mysqli_query($conn, $sql);
    
    $sqlSelect = "SELECT * FROM pororo_table
                  WHERE userId='$userId'";
    $res = mysqli_query($conn, $sqlSelect);
    
    if( $res == true ){
        $record = mysqli_fetch_array($res);
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'", "생년월일": "'.$record['userBirth'].'", "비밀번호": "'.$record['userPw'].'","이메일": "'.$record['userEmail'].'" }';
    }
    else {
        echo 0;
    }
?>