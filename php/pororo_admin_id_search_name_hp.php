<?
    include_once('./pororo_header.php');

    $adminName = $_POST['adminName'];
    $adminHp = $_POST['adminHp'];

    $sql = "SELECT * FROM pororo_admin_table 
            WHERE adminName='$adminName' AND adminHp='$adminHp'";
    $res = mysqli_query($conn, $sql);
  
    if( mysqli_num_rows($res) > 0 ){  
        $record = mysqli_fetch_array($res);
        echo '{"이름": "'.$record['adminName'].'", "휴대폰번호": "'.$record['adminHp'].'", "아이디": "'.$record['adminId'].'"}';
    }
    else{
        echo '';
    }
?>