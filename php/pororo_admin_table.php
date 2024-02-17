<?
    // http://gwonsj94.co.kr/pororo/pororo_admin_table.php
    // http://gksmf519.dothome.co.kr/pororo/pororo_admin_table.php
    include_once('./pororo_header.php');

    $SQL = "CREATE TABLE pororo_admin_table (
        idx            INT           NOT NULL AUTO_INCREMENT,
        adminId        VARCHAR(16)   NOT NULL,
        adminPw        VARCHAR(16)   NOT NULL,   
        adminName      VARCHAR(50)   NOT NULL,
        adminEmail     VARCHAR(250)  NULL,
        adminHp        VARCHAR(13)   NULL,
        adminAddress   VARCHAR(500)  NULL,
        adminBirth     VARCHAR(10)    NOT NULL,
        adminGaib      timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(idx)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";
    
    $result = mysqli_query($conn, $SQL);
    if($result==false) {
        echo "테이블 만들기 실패...";
    }
    else {
        echo "테이블 만들기 성공!!!";
    }

?>