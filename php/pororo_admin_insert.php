<?
    include_once('./pororo_header.php');

    $adminId = $_POST['adminId'];
    $adminPw = $_POST['adminPw'];
    $adminName   = $_POST['adminName'];
    $adminHp = $_POST['adminHp'];
    $adminAddress    = $_POST['adminAddress'];
    $adminEmail  = $_POST['adminEmail'];
    $adminBirth  = $_POST['adminBirth'];

    $sql = "INSERT INTO pororo_admin_table (adminId, adminPw, adminName ,adminHp, adminAddress, adminEmail, adminBirth) 
            VALUES ('$adminId','$adminPw','$adminName','$adminHp','$adminAddress', '$adminEmail','$adminBirth')";

    $result = mysqli_query($conn, $sql);

    if( $result===true ){
        echo 1;
    }
    else {
        echo 0;
    }
?>