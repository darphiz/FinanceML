<?php

header('Access-Control-Allow-Origin: *');
include(dirname(__FILE__) . '/' . "../../db_connects.php");


include(dirname(__FILE__) . '/' . "../../includes/institution.php");

require "../../api/talking/alert-customer.php";
//require "../../api/talking/custom-alert-customer.php";


$username = $_SESSION['AdminID'];
$id = $_SESSION['ID'];
//$id = $_GET['id'];

$balance = $_REQUEST['balance'];
$amount = $_REQUEST['amount'];
$customerid = $_REQUEST['customer_id'];
$email = $_REQUEST['email'];
$branch = $_REQUEST['branch'];
$name = $_REQUEST['name'];
$mobile = $_REQUEST['mobile'];
$accountno = $_REQUEST['accountno'];
$details = $_REQUEST['details'];
$ecommission = $_REQUEST['ecommission'];
$charges = $_REQUEST['charges'];

$accountbalance = $balance + $amount;



/**
 * Send a POST request without using PHP's curl functions.
 *
 * @param string $url The URL you are sending the POST request to.
 * @param array $postVars Associative array containing POST values.
 * @return string The output response.
 * @throws Exception If the request fails.
 */
function post($url, $postVars = array()){
    //Transform our POST array into a URL-encoded query string.
    $postStr = http_build_query($postVars);
    //Create an $options array that can be passed into stream_context_create.
    $options = array(
        'http' =>
            array(
                'method'  => 'POST', //We are using the POST HTTP method.
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postStr //Our URL-encoded query string.
            )
    );
    //Pass our $options array into stream_context_create.
    //This will return a stream context resource.
    $streamContext  = stream_context_create($options);
    //Use PHP's file_get_contents function to carry out the request.
    //We pass the $streamContext variable in as a third parameter.
    $result = file_get_contents($url, false, $streamContext);
    //If $result is FALSE, then the request has failed.
    if($result === false){
        //If the request failed, throw an Exception containing
        //the error.
        $error = error_get_last();
        throw new Exception('POST request failed: ' . $error['message']);
    }
    //If everything went OK, return the response.
    return $result;
}


$result = post('https://app.smartsmssolutions.com/io/api/client/v1/sms/', array(
    'token' => 'your-apix-token',
    'sender' => 'sender-id',
    'to' => '080xxxxxxxx',
    'message' => 'message-content',
    'type' => 'mesasge-type',
    'routing' => 'routing',
  ));


//   https://eviafrica.com/backend/login


function ConnectToServer($request)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $request);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}


function sendSmsWithSmart($request)
{
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://app.smartsmssolutions.com/io/api/client/v1/sms/',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array('token' => 'your-apix-token','sender' => 'sender-id','to' => '080xxxxxxxx','message' => 'message-content','type' => 'mesasge-type','routing' => 'routing','ref_id' => 'unique-ref-id','simserver_token' => 'simserver-token','dlr_timeout' => 'dlr-timeout','schedule' => 'time-in-future'),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    echo $response;
}




$update = "UPDATE customers SET balance='" . $accountbalance . "' WHERE customer_id='" . $customerid . "'";
$quer = mysqli_query($connection, $update);

if ($quer) {

    /////get customer profile for notification

    $sql011 = "SELECT * FROM customers where customer_id='$customerid' AND Institution_id='$instid'";
    $rs011 = mysqli_query($connection, $sql011);
    $row011 = mysqli_fetch_array($rs011);

    $accountname = $row011['name'];
    $accountdeposit_smsnotification = $row011['deposit_smsnotification'];
    $accountdeposit_emailnotification = $row011['deposit_emailnotification'];
    $mobile = $row011['mobile'];
    $acbalance = $row011['balance'];
    $charge = $row011['charge'];


    $sql01 = "SELECT * FROM administrator where UserName='$username' AND Institution_id='$instid'";
    $rs01 = mysqli_query($connection, $sql01);
    $row01 = mysqli_fetch_array($rs01);
    $branch = $row01['Branch_id'];
    $bal2 = $row01['balance'];
    $ecommission = $row01['commission'];
    $teller_id = $row01['ID'];
    $newbal = $bal2 + $amount;

    $select2 = "UPDATE administrator SET balance='$newbal' WHERE UserName='$username' AND Institution_id='$instid'";
    $rs2 = mysqli_query($connection, $select2);
    $dates = date("d/M/Y");
    $medium = "Cash";
    $times = date("g:i a");

    $select33 = "INSERT INTO transactions (trans_id, teller_id, tellername,customer_id,customername,account_no,amount,balance,branch_id,Institution_id,date,time,credits,debits,medium,details,remarks) VALUES (NULL, '$teller_id', '$username', '$customerid', '$name', '$accountno', '$amount', '$accountbalance', '$branch', '$instid', '$dates', '$times', 'Credit', ' ', '$medium', '$details', ' ')";
    $rs33 = mysqli_query($connection, $select33);

    // reduce the unit
    // if($amount >= 1000){
    // $runit = floor($amount/1000);
    // }else{
    // $runit = 1;
    // }

    $runit = 1;

    $units = $clientunits - $runit;
    $unitsql = "UPDATE institutions SET units ='$units' WHERE id='$instid'";
    $dunits = mysqli_query($connection, $unitsql);


    if ($status == 3) {
        if ($acbalance > 1000) {
            if ($charges == 0) {
                $tellercommission = 250 + $ecommission;
                $cooperativecommission = 750 + $commission;
                $customercharged = 1;
                $cu1 = "UPDATE administrator SET commission='$tellercommission' WHERE UserName='$username' AND Institution_id='$instid'";
                $cru1 = mysqli_query($cu1);
                $cu2 = "UPDATE institutions SET commission='$cooperativecommission' WHERE id='$instid'";
                $cru2 = mysqli_query($cu2);
                $cu3 = "UPDATE customers SET charges='" . $customercharged . "' WHERE customer_id='" . $customerid . "'";
                $cru3 = mysqli_query($ru3);
            }
        }
    }

    /////////////////////////Institution settings
    if ($accountdeposit_smsnotification == "1") {

        $ac = substr($accountno, 0, 3);

        $mobile = "+234" . substr($mobile, 1, 11);


        $info = "Credit Alert: Amt: " . $currency . $amount . " has been credited into your account no " . $ac . "*** in " . $smsid . ", " . $dates . ". Your Balance is: " . $currency . $accountbalance . ".00";

        $getunitquery = "select units from institutions where id='$instid'";
        $execgetquery = mysqli_query($connection, $getunitquery);
        $rowgtqunit = mysqli_fetch_array($execgetquery);
        $cl_units = $rowgtqunit["units"];

        // $runit = 0.5;
        // $units = $cl_units-$runit;
        // die($units);
        // $unitsql="UPDATE institutions SET units ='$units' WHERE id='$instid'";
        // $dunits=mysqli_query($connection,$unitsql);

        if ($sms_api_id == 0) {
            messager($mobile, $info);
        } else {

            $sqlapi = "SELECT * FROM sms_api_configuration where id='" . $sms_api_id . "'";
            $rsapi = mysqli_query($connection, $sqlapi);

            $rowapi = mysqli_fetch_array($rsapi);
            $apiusername = $rowapi['username'];
            $apipassword = $rowapi['password'];
            $api = $rowapi['api'];
            $platform = $rowapi['platform'];


            $api_sendcredit = $api . "/smsapi.php?username=" . $apiusername . "&password=" . $apipassword . "&sender=" . $smsid . "&recipient=" . $mobile . "&m
essage=" . urlencode($info) . "";
            $responses = ConnectToServer($api_sendcredit);
        }
    }

    if ($accountdeposit_emailnotification == "1") {

        $to = $email;
        $subject = 'Credit Alert!';
        $from = 'alert@smartteller.net';


        // To send HTML mail, the Content-type header must be set
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";


        // Create email headers
        $headers .= 'From: ' . $from . "\r\n" .
            'Reply-To: ' . $from . "\r\n" .
            'X-Mailer: PHP/' . phpversion();


        // Compose a simple HTML email message
        $message = '<html><body>';
        $message .= '<style type="text/css">

			h4{
                        font-family:Calibri, Tahoma, Geneva, sans-serif;;
            }
            table{
                        font-family:Calibri, Tahoma, Geneva, sans-serif;;
                        font-size: 13px;
						width:100%;
                        color: #666666;
                        text-align:justify;
            }
            td{
                        text-align:justify;
            }
            a{
                        font-family:Calibri, Tahoma, Geneva, sans-serif;;
                        color:#FF6600;
                        text-decoration:none;
            }
De

</style>
<table cellspacing="0" cellpadding="0" width="689" border="0">
  <tbody>
    <tr>
      <td colspan="10">
        Dear &nbsp;<strong>' . $accountname . ',</strong>
      </td>
    </tr>
    <tr>
      <td colspan="10"></td>
    </tr>
    <tr>
      <td colspan="10">
        <h4>
          <u>' . $clientname . ' Notification Service</u>
        </h4>
      </td>
    </tr>
    <tr>
      <td colspan="10"></td>
    </tr>
    <tr>
      <td colspan="10">
        We wish to inform you that a Credit transaction
        occurred on your account with us.
      </td>
    </tr>
    <tr>
      <td colspan="10">
        &nbsp;
      </td>
    </tr>
    <tr>
      <td colspan="10">
        The details of this transaction are shown below:
      </td>
    </tr>
    <tr>
      <td colspan="10"></td>
    </tr>
    <tr>
      <td colspan="10">
        <h4>
          <u>Transaction Notification</u>
        </h4>
      </td>
    </tr>
    <tr>
<td>
<table width="720px" border="0">
<tr>
	<td width="130">
        Account Number
      </td>
      <td width="10">
        :
      </td>
      <td colspan="8" width="549">
        ***' . $accountno . '
      </td>
    </tr>
    <tr>
      <td width="130" height="19">
        Description
      </td>
      <td>
        :
      </td>
      <td colspan="8">
        ' . $medium . ' DEPOSIT        
      </td>
    </tr>
    <tr>
      <td width="130">
        Amount
      </td>
      <td>
        :
      </td>
      <td colspan="8">
        ' . $amount . '.00
      </td>
    </tr>
    <tr>
      <td width="130">
        Value Date
      </td>
      <td>
        :
      </td>
      <td colspan="8">
        ' . $dates . '
      </td>
    </tr>
    <tr>
      <td width="130">
        Remarks
      </td>
      <td>
        :
      </td>
      <td colspan="8">
        ' . $details . '
      </td>
    </tr>
    <tr>
      <td colspan="10">
        <br />
      </td>
    </tr>
    <tr>
      <td colspan="7">
        The balances on this account as at&nbsp; ' . $times . '
        &nbsp;are as follows;
      </td>
    </tr>
    <tr>
      <td colspan="10"></td>
    </tr>
    <tr>
      <td width="130">
        Current Balance
      </td>
      <td>
        <div align="center">
          :
        </div>
      </td>
      <td colspan="8">
        ' . $currency . $accountbalance . '
      </td>
    </tr>
    <tr>
      <td colspan="10">
        &nbsp;
      </td>
    </tr>
</td>
</tr>
</table>
</td>
</tr>
  </tbody>
</table>
';
        $message .= '</body></html>';



        mail($to, $subject, $message, $headers);
    }

    header("Location: creditcustomer.php?customer_id=" . $customerid . "&account=100");
} else {
    header("Location: creditcustomer.php?customer_id=" . $customerid . "&account=102");
}
