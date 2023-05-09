<?php
class Savings
{
    public $savings_aid;
    public $savings_member_id;
    public $savings_deposite;
    public $savings_withdrawal;
    public $savings_interest;
    public $savings_date;
    public $savings_or;
    public $savings_category;
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
            $sql .= "savings_deposite, ";
            $sql .= "savings_withdrawal, ";
            $sql .= "savings_interest, ";
            $sql .= "savings_date, ";
            $sql .= "savings_or, ";
            $sql .= "savings_category, ";
            $sql .= "savings_created, ";
            $sql .= "savings_datetime ) values ( ";
            $sql .= ":savings_member_id, ";
            $sql .= ":savings_deposite, ";
            $sql .= ":savings_withdrawal, ";
            $sql .= ":savings_interest, ";
            $sql .= ":savings_date, ";
            $sql .= ":savings_or, ";
            $sql .= ":savings_category, ";
            $sql .= ":savings_created, ";
            $sql .= ":savings_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id,
                "savings_deposite" => $this->savings_deposite,
                "savings_withdrawal" => $this->savings_withdrawal,
                "savings_interest" => $this->savings_interest,
                "savings_date" => $this->savings_date,
                "savings_or" => $this->savings_or,
                "savings_category" => $this->savings_category,
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
            $sql .= "and (savings_deposite like :savings_deposite ";
            $sql .= "or savings_withdrawal like :savings_withdrawal ";
            $sql .= "or MONTHNAME(savings_date) like :savings_month_date ";
            $sql .= "or savings_date like :savings_date) ";
            $sql .= "order by savings_date desc, ";
            $sql .= "savings_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_member_id" => $this->savings_member_id,
                "savings_month_date" => "{$this->savings_search}%",
                "savings_date" => "{$this->savings_search}%",
                "savings_deposite" => "{$this->savings_search}%",
                "savings_withdrawal" => "{$this->savings_search}%",
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
            $sql .= "savings_withdrawal = :savings_withdrawal, ";
            $sql .= "savings_deposite = :savings_deposite, ";
            $sql .= "savings_interest = :savings_interest, ";
            $sql .= "savings_date = :savings_date, ";
            $sql .= "savings_or = :savings_or, ";
            $sql .= "savings_category = :savings_category, ";
            $sql .= "savings_datetime = :savings_datetime ";
            $sql .= "where savings_aid  = :savings_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "savings_withdrawal" => $this->savings_withdrawal,
                "savings_deposite" => $this->savings_deposite,
                "savings_interest" => $this->savings_interest,
                "savings_date" => $this->savings_date,
                "savings_or" => $this->savings_or,
                "savings_category" => $this->savings_category,
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
