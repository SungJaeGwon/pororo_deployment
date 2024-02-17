<?
    include_once('./pororo_header.php');

    $adminId = $_POST['adminId'];
    $adminEmail = $_POST['adminEmail'];

    $sql = "SELECT * FROM pororo_admin_table 
            WHERE adminId='$adminId' AND adminEmail='$adminEmail'";
    $res = mysqli_query($conn, $sql);
  
    if( mysqli_num_rows($res) > 0 ){  
        $record = mysqli_fetch_array($res);
        echo '{"비밀번호": "'.$record['adminPw'].'"}';
    }
    else{
        echo '';
    }
?>