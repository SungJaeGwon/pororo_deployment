<?
    // http://gwonsj94.co.kr/pororo/pororo_cart_table.php
    include_once('./pororo_header.php');
    
    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];

    $sql = "DELETE FROM pororo_cart_table 
            WHERE userId='$userId' AND 제품코드='$제품코드'";
    $res = mysqli_query($conn, $sql);
 
    if( $res == true ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>