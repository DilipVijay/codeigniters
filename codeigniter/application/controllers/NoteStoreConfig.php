<?php
/**
 * @description for the database configuration
 */
class NoteStoreConfig
{
    /**
     * @method configs()
     * PDO Object is created
     * @return the PDO Object
     */
    public function configs()
    {
        $servername = "localhost";
        $username = "root";
        $password = "admin";
        $dbname = "account";
// Create connection
try {
    $conn = new PDO("mysql:host=$servername;dbname=account", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //  echo "Connected successfully"; 
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }
	return $conn;
    }
}
