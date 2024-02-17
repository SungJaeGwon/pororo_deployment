<?
    include_once('./pororo_header.php');

    $idx      = $_POST['idx'];
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

    
    $sql = "UPDATE  pororo_notice_table  
            SET     wType='$wType', wName='$wName', wId='$wId', wSubject='$wSubject', wContent='$wContent'
            WHERE   idx='$idx'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>