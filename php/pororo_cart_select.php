<?
    // http://gwonsj94.co.kr/pororo/pororo_cart_table.php
    include_once('./pororo_header.php');

    $userId = $_POST['userId']; 

    $sql = "SELECT * FROM pororo_cart_table
            WHERE userId='$userId'";
    $result = mysqli_query($conn, $sql);

    if( mysqli_num_rows($result) > 0 ){
        $arr = array();
        while( $item = mysqli_fetch_array($result)  ){
            array_push($arr, array(
                '제품코드' => $item['제품코드'],
                '번호' => $item['번호'],
                '이미지' => $item['이미지'],
                '제품명' => $item['제품명'],
                '할인율' => $item['할인율'],
                '판매가' => $item['판매가'],
                '제품특징' => $item['제품특징'],
                '배송' => $item['배송'],
                '옵션' => $item['옵션'],
                '옵션상품목록' => $item['옵션상품목록'],
                '정가' => $item['정가'],
                '장바구니상품명' => $item['장바구니상품명'],
                '수량' => $item['수량']
            ));
        }
    }

    $json_data = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json_data;

?>