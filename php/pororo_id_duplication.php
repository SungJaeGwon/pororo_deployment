<?
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];

    $sql = "SELECT * FROM pororo_table WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        echo 1;
    }
    else {
        echo 0;
    }

?>