<?
    include_once('./pororo_header.php');

    $wType    = $_POST['wType'];
    $wName    = $_POST['wName'];
    $wId      = $_POST['wId'];
  
    $wSubject = str_replace( "'", "&apos;", $_POST['wSubject'] );
    $wContent = str_replace( "'", "&apos;", $_POST['wContent'] );

    $wSubject = str_replace( "\"", "&quot;", $wSubject );
    $wContent = str_replace( "\"", "&quot;", $wContent );

    $wSubject = str_replace( "<", "&lt;", $wSubject );
    $wContent = str_replace( "<", "&lt;", $wContent );

    $wSubject = str_replace( ">", "&gt;", $wSubject );
    $wContent = str_replace( ">", "&gt;", $wContent );
    
    $wSubject = nl2br($wSubject);
    $wContent = nl2br($wContent);


    $sql = "INSERT INTO pororo_notice_table (wType, wName,  wId,  wSubject, wContent)
            VALUES ('$wType','$wName','$wId','$wSubject','$wContent')";
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>