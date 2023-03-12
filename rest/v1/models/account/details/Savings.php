<?php
class Savings
{
    public $savings_aid;
    public $savings_member_id;
    public $savings_amount;
    public $savings_balance;
    public $savings_total;
    public $savings_date;
    public $savings_created;
    public $savings_datetime; 

    public $connection;
    public $lastInsertedId; 
    public $savings_start;
    public $total;
    public $savings_search;
    public $currentYear;
    public $tblSavings; 

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSavings = "sccv1_savings"; 
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSavings} ";
            $sql .= "( savings_member_id, ";
            $sql .= "savings_amount, ";
            $sql .= "savings_balance, ";
            $sql .= "savings_total, ";
            $sql .= "savings_date, "; 
            $sql .= "savings_created, ";
            $sql .= "savings_datetime ) values ( ";
            $sql .= ":savings_member_id, ";
            $sql .= ":savings_amount, ";
            $sql .= ":savings_balance, ";
            $sql .= ":savings_total, ";
            $sql .= ":savings_date, "; 
            $sql .= ":savings_created, ";
            $sql .= ":savings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id,
                "savings_amount" => $this->savings_amount,
                "savings_balance" => $this->savings_balance,
                "savings_total" => $this->savings_total,
                "savings_date" => $this->savings_date, 
                "savings_created" => $this->savings_created,
                "savings_datetime" => $this->savings_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readAll()
    {
        try {
            $sql = "select * from "; 
            $sql .= "{$this->tblSavings} "; 
            $sql .= "order by savings_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    } 
    
 
    // search not approved members
    public function search()
    {
        try {
            $sql = "select * from "; 
            $sql .= "{$this->tblSavings} ";
            $sql .= "where savings_member_id = :savings_member_id ";
            $sql .= "and savings_amount like :savings_amount ";
            $sql .= "or savings_date like :savings_date ";
            $sql .= "order by savings_date desc, ";
            $sql .= "savings_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id,
                "savings_date" => "{$this->savings_search}%",
                "savings_amount" => "{$this->savings_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    } 

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from "; 
            $sql .= "{$this->tblSavings} ";
            $sql .= "where savings_member_id = :savings_member_id "; 
            $sql .= "order by savings_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id, 
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimitById()
    {
        try {
            $sql = "select * from "; 
            $sql .= "{$this->tblSavings} "; 
            $sql .= "where savings_member_id = :savings_member_id "; 
            $sql .= "order by savings_date desc,";
            $sql .= "savings_member_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id, 
                "start" => $this->savings_start - 1,
                "total" => $this->total,
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
            $sql = "update {$this->tblSavings} set ";
            $sql .= "savings_balance = :savings_balance, ";
            $sql .= "savings_amount = :savings_amount, ";
            $sql .= "savings_total = :savings_total, ";
            $sql .= "savings_date = :savings_date, ";
            $sql .= "savings_datetime = :savings_datetime ";
            $sql .= "where savings_aid  = :savings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_balance" => $this->savings_balance,
                "savings_amount" => $this->savings_amount,
                "savings_total" => $this->savings_total,
                "savings_date" => $this->savings_date, 
                "savings_datetime" => $this->savings_datetime,
                "savings_aid" => $this->savings_aid,
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
            $sql = "delete from {$this->tblSavings} ";
            $sql .= "where savings_aid = :savings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_aid" => $this->savings_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}
