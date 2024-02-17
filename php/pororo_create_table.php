<?
    include_once('./pororo_header.php');

    $SQL = "CREATE TABLE pororo_table (
        userId              VARCHAR(16)    NOT NULL,
        userPw              VARCHAR(16)    NOT NULL,
        userName            VARCHAR(50)    NOT NULL,
        userAddress         VARCHAR(250)   NULL,
        userHp              VARCHAR(13)    NOT NULL,
        userEmail           VARCHAR(250)   NOT NULL,
        userBirth           VARCHAR(10)    NOT NULL,
        userRecommend       VARCHAR(16)    NOT NULL,
        userService         VARCHAR(250)   NULL,
        userSignInDate      timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";
    
    $result = mysqli_query($conn, $SQL);
    if($result==false) {
        echo "테이블 만들기 실패...";
    }
    else {
        echo "테이블 만들기 성공!!!";
    }

?>