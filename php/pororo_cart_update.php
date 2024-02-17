<?
    // http://gwonsj94.co.kr/pororo/pororo_cart_table.php
    include_once('./pororo_header.php');
    
    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];
    $수량 = $_POST['수량'];

    $sql = "UPDATE pororo_cart_table 
            SET 수량='$수량'
            WHERE userId='$userId' AND 제품코드='$제품코드'
           ";
    $res = mysqli_query($conn, $sql);
 
    if( $res == true ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>