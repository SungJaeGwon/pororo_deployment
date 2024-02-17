<?
    // http://gwonsj94.co.kr/pororo/pororo_cart_table.php
    include_once('./pororo_header.php');

    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];
    $번호 = $_POST['번호'];
    $이미지 = $_POST['이미지'];
    $제품명 = $_POST['제품명'];
    $할인율 = $_POST['할인율'];
    $판매가 = $_POST['판매가'];
    $제품특징 = $_POST['제품특징'];
    $배송 = $_POST['배송'];
    $옵션 = $_POST['옵션'];
    $옵션상품목록 = $_POST['옵션상품목록'];
    $정가 = $_POST['정가'];
    $장바구니상품명 = $_POST['장바구니상품명'];
    $수량 = $_POST['수량'];

    $sql = "SELECT * FROM pororo_cart_table 
           WHERE userId='$userId' AND 제품코드='$제품코드'";
    $result = mysqli_query($conn, $sql);

    if( mysqli_num_rows($result) > 0 ){ 
        $sql = "UPDATE pororo_cart_table SET 수량=수량+$수량  
                WHERE userId='$userId' AND 제품코드='$제품코드'";
        $result = mysqli_query($conn, $sql);
        if($result==true){
            echo 1;  // 장바구니 => 수정 저장 성공 1
        }
        else{
            echo 0; // 장바구니 => 수정 저장 실패 0
        } 
    }
    else {
        $sql = "INSERT INTO pororo_cart_table (userId,제품코드,번호,이미지,제품명,할인율,판매가,제품특징,배송,옵션,옵션상품목록,정가,장바구니상품명,수량)
            VALUES ('$userId','$제품코드','$번호','$이미지','$제품명','$할인율','$판매가','$제품특징','$배송','$옵션','$옵션상품목록','$정가','$장바구니상품명','$수량')";
        $result = mysqli_query($conn, $sql);
        
        if($result==true){
            echo 2;
        }
        else{
            echo -1;
        }
    }

    

?>