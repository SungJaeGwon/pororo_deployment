<?
    include_once('./pororo_header.php');

    $userEmail = $_POST['userEmail'];

    $sql = "SELECT * FROM pororo_table WHERE userEmail='$userEmail'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo -1;
    }
    else {
        echo 2;
    }

?>