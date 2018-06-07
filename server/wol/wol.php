<?php

/*
 * wol $host
 * send magic packet for wol to provided mac address
 * returns an object containing the mac and status
 * status === 1 > script run without errors
 * up === 0 > script not run
 */
function wol($mac) {
    // $mac = 'aa:bb:cc:11:22:33';
    $macHex = str_replace(':', '', $mac);

    $status = "";
    if (!ctype_xdigit($macHex)) {
      $success = false;
    } else {
      exec("wakeonlan -i 192.168.0.255 $mac");
      $success = true;
    }
    $status->success = $success;
    $status->mac = $mac;

    return $status;
}
/*
 * Get the mac of the computer to wake up from query parameter
 * Script called: wol.php?mac=aa:aa:aa:aa:aa
 */
$mac = $_POST['mac'];

/*
 * Wake up computer
 */
$status = wol($mac);

/*
 * output result
 */
header('Content-Type: application/json');
echo json_encode($status);

?>
