<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include_once "NoteStoreConfig.php";
/**
 * @description all the crud operation on the label and store it in database
 */
class Label
{
    /**
     *@description used for the add the label and store it in database
     * @method addLabel()
     * @return jsondata containing all the label
     */
    public function addLabel()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];
        $label = $_POST['label'];

        /**
         * insert the label into database based on the emailid
         */
        if ($email != "") {
            $stm = $conn->prepare("INSERT INTO label(email,label) VALUES('$email','$label')");
            $stm->execute();
            $stm = $conn->prepare("select * from label where email = '$email' order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
        }

    }
//
    /**
     * @method fetchLabel()
     *@desc  to return all the label
     * @var email to store the email 
     * @return jsondata containing all the label
     */
    public function fetchLabel()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $email = $_POST['email'];

        if ($email != "") {
            $stm = $conn->prepare("select * from label where email = '$email' order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);
        }

    }
    /**
     * @method delete()
     * @desc for the delete the label
     * @var id to store the id
     * @return jsondata containing all the label
     */
    public function delete()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];
        if ($id != "") {
            $stm = $conn->prepare("delete from label where id = '$id' ");
            $stm->execute();

            $stm = $conn->prepare("select * from label order by id desc");
            $stm->execute();
            $row = $stm->fetchAll(PDO::FETCH_ASSOC);
            $res = json_encode($row);
            print($res);

        }
    }
    /**
     * @method editLabel()
     * @desc edit the label and store it in database
     * @return jsondata contain all the label
     */
    public function editLabel()
    {

        $id = $_POST['id'];
        $labeldata = $_POST['label'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        if ($id != "") {

            $stm = $conn->prepare("UPDATE label set label = '$labeldata' where id = '$id' ");
            $stm->execute();

            $stm = $conn->prepare("SELECT * FROM label  order by id desc ");
            $stm->execute();

            $row = $stm->fetchAll(PDO::FETCH_ASSOC);

            $jsondata = json_encode($row);
            print($jsondata);

        }
    }
    /**
     * @method labelForNote()
     * @desc label for the note
     * @var email to store the email 
     * @return jsondata contain all the label
     */
    public function labelForNote()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();
        $email = $_POST['email'];

        $stm = $conn->prepare("SELECT * FROM label where email = '$email' order by id desc ");
        $stm->execute();
        $row = $stm->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($row);
        print($json);
    }
    /** 
     * @method addLabelCard()
     * @desc for the label for each card
     * @var id store id
     * @var label store the labelname
     * @return void
     */
    public function addLabelCard()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];
        $labelname = $_POST['labelname'];

        try {
            $stmt = $conn->prepare("UPDATE note SET label = '$labelname' where id = '$id' ");
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    /**
     * @method deleteLabel()
     * to delete the label for the card
     * @var id store id
     * @return jsondata contain all the label
     */
    public function deleteLabel()
    {
        $conf = new NoteStoreConfig();
        $conn = $conf->configs();

        $id = $_POST['id'];

        try {
            $stmt = $conn->prepare("UPDATE note SET label = '' where id = '$id' ");
            $stmt->execute();

            $stmt = $conn->prepare(" select * from note ");
            $stmt->execute();


            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $jsondata = json_encode($row);
            print($jsondata);


        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    /**
     * to get all the label for each of the card
     * @var label to store the label
     * @return jsondata contain all the label
     */
    public function getLabel()
    {
        $label = $_POST['label'];

        $conf = new NoteStoreConfig();
        $conn = $conf->configs();
        $stmt = $conn->prepare(" select * from note where label = '$label' ");
        $stmt->execute();

        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $jsondata = json_encode($row);
        print($jsondata);
    }

}
