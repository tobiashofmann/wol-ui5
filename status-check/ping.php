<?php
/*
 * Sample call: ping.php?host=192.168.0.1
 * Sample result: {"up":true,"host":"192.168.0.11"}
 */

/*
 * checkHostStatus $host
 * one ping, timeout 1 second
 * returns an object containing the host and status
 * up === 1 > host is up and running
 * up === 0 > host is considered down
 */
function checkHostStatus($host)
{
    exec(sprintf('ping -c 1 -W 1 %s', escapeshellarg($host)), $res, $rval);
    /* status object
     * $rval is 0 when up and 1 when not up. Wanted: true for up and false for down
     */
    $status->up = !$rval;
    $status->host = $host;
    return $status;
}

/*
 * Get host to check from query parameter
 * Script called: ping.php?host=192.168.0.1
 * Not using a default host or check if host is valid. In case of no host provided, returned result is: {"up":false,"host":null}
 */
$host = $_GET['host'];

/*
 * check if the host is up
 *  $host can also be an ip address
 */
$status = checkHostStatus($host);

/*
 * output result
 */
header('Content-Type: application/json');
echo json_encode($status);

?>

