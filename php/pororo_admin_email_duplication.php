<?
    include_once('./pororo_header.php');

    $adminEmail = $_POST['adminEmail'];

    $sql = "SELECT * FROM pororo_admin_table WHERE adminEmail='$adminEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo 1;
    }
    else {
        echo 0;
    }

?>