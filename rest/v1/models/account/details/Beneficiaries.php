<?php
class Beneficiaries
{
    public $beneficiaries_aid;
    public $beneficiaries_employee_id;
    public $beneficiaries_name;
    public $beneficiaries_relationship;
    public $beneficiaries_created;
    public $beneficiaries_datetime;

    public $connection;
    public $lastInsertedId;
    public $tblBeneficiaries;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblBeneficiaries = "sccv1_legal_beneficiaries";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblBeneficiaries} ";
            $sql .= "( beneficiaries_name, ";
            $sql .= "beneficiaries_employee_id, ";
            $sql .= "beneficiaries_relationship, ";
            $sql .= "beneficiaries_created, ";
            $sql .= "beneficiaries_datetime ) values ( ";
            $sql .= ":beneficiaries_name, ";
            $sql .= ":beneficiaries_employee_id, ";
            $sql .= ":beneficiaries_relationship, ";
            $sql .= ":beneficiaries_created, ";
            $sql .= ":beneficiaries_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "beneficiaries_name" => $this->beneficiaries_name,
                "beneficiaries_employee_id" => $this->beneficiaries_employee_id,
                "beneficiaries_relationship" => $this->beneficiaries_relationship,
                "beneficiaries_created" => $this->beneficiaries_created,
                "beneficiaries_datetime" => $this->beneficiaries_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblBeneficiaries} ";
            $sql .= "order by beneficiaries_aid  desc, ";
            $sql .= "beneficiaries_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by member id
    public function readById()
    {
        try {
            $sql = "select beneficiaries_employee_id, ";
            $sql .= "beneficiaries_aid, ";
            $sql .= "beneficiaries_name, ";
            $sql .= "beneficiaries_relationship ";
            $sql .= "from {$this->tblBeneficiaries} ";
            $sql .= "where beneficiaries_employee_id = :beneficiaries_employee_id ";
            $sql .= "order by beneficiaries_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "beneficiaries_employee_id" => $this->beneficiaries_employee_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblBeneficiaries} set ";
            $sql .= "beneficiaries_name = :beneficiaries_name, ";
            $sql .= "beneficiaries_relationship = :beneficiaries_relationship, ";
            $sql .= "beneficiaries_datetime = :beneficiaries_datetime ";
            $sql .= "where beneficiaries_aid = :beneficiaries_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "beneficiaries_name" => $this->beneficiaries_name,
                "beneficiaries_relationship" => $this->beneficiaries_relationship,
                "beneficiaries_datetime" => $this->beneficiaries_datetime,
                "beneficiaries_aid" => $this->beneficiaries_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblBeneficiaries} ";
            $sql .= "where beneficiaries_aid = :beneficiaries_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "beneficiaries_aid" => $this->beneficiaries_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // name
    public function checkName()
    {
        try {
            $sql = "select beneficiaries_name from {$this->tblBeneficiaries} ";
            $sql .= "where beneficiaries_name = :beneficiaries_name ";
            $sql .= "and beneficiaries_employee_id = :beneficiaries_employee_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "beneficiaries_name" => "{$this->beneficiaries_name}",
                "beneficiaries_employee_id" => "{$this->beneficiaries_employee_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
