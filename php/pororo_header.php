<?
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'gksmf519';
    $DB_USER_PW = 'ming0303!';
    $DB_NAME = 'gksmf519';

    $conn = mysqli_connect( $DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME );
    mysqli_set_charset( $conn, 'utf8' );

?>