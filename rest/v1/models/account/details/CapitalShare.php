<?php
class CapitalShare
{
    public $capital_share_aid;
    public $capital_share_member_id;
    public $capital_share_paid_up;
    public $capital_share_total_amount;
    public $capital_share_or;
    public $capital_share_date;
    public $capital_share_created;
    public $capital_share_datetime;

    public $connection;
    public $lastInsertedId;
    public $capital_start;
    public $capital_total;
    public $capital_search;
    public $currentYear;
    public $tblCapitalShare;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCapitalShare = "sccv1_capital_share";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCapitalShare} ";
            $sql .= "( capital_share_member_id, ";
            $sql .= "capital_share_paid_up, ";
            $sql .= "capital_share_total_amount	, ";
            $sql .= "capital_share_or, ";
            $sql .= "capital_share_date, ";
            $sql .= "capital_share_created, ";
            $sql .= "capital_share_datetime ) values ( ";
            $sql .= ":capital_share_member_id, ";
            $sql .= ":capital_share_paid_up, ";
            $sql .= ":capital_share_total_amount	, ";
            $sql .= ":capital_share_or, ";
            $sql .= ":capital_share_date, ";
            $sql .= ":capital_share_created, ";
            $sql .= ":capital_share_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_paid_up" => $this->capital_share_paid_up,
                "capital_share_total_amount" => $this->capital_share_total_amount,
                "capital_share_or" => $this->capital_share_or,
                "capital_share_date" => $this->capital_share_date,
                "capital_share_created" => $this->capital_share_created,
                "capital_share_datetime" => $this->capital_share_datetime,
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
            $sql .= "{$this->tblCapitalShare} ";
            $sql .= "order by capital_share_date desc ";
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
            $sql .= "{$this->tblCapitalShare} ";
            $sql .= "where capital_share_member_id = :capital_share_member_id ";
            $sql .= "and capital_share_paid_up like :capital_share_paid_up ";
            $sql .= "or capital_share_date like :capital_share_date ";
            $sql .= "order by capital_share_date desc, ";
            $sql .= "capital_share_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_date" => "{$this->capital_search}%",
                "capital_share_paid_up" => "{$this->capital_search}%",
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
            $sql .= "{$this->tblCapitalShare} ";
            $sql .= "where capital_share_member_id = :capital_share_member_id ";
            $sql .= "order by capital_share_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
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
            $sql .= "{$this->tblCapitalShare} ";
            $sql .= "where capital_share_member_id = :capital_share_member_id ";
            $sql .= "order by capital_share_date desc,";
            $sql .= "capital_share_member_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "start" => $this->capital_start - 1,
                "total" => $this->capital_total,
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
            $sql = "update {$this->tblCapitalShare} set ";
            $sql .= "capital_share_total_amount	= :capital_share_total_amount	, ";
            $sql .= "capital_share_paid_up = :capital_share_paid_up, ";
            $sql .= "capital_share_or = :capital_share_or, ";
            $sql .= "capital_share_date = :capital_share_date, ";
            $sql .= "capital_share_datetime = :capital_share_datetime ";
            $sql .= "where capital_share_aid  = :capital_share_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_total_amount	" => $this->capital_share_total_amount,
                "capital_share_paid_up" => $this->capital_share_paid_up,
                "capital_share_or" => $this->capital_share_or,
                "capital_share_date" => $this->capital_share_date,
                "capital_share_datetime" => $this->capital_share_datetime,
                "capital_share_aid" => $this->capital_share_aid,
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
            $sql = "delete from {$this->tblCapitalShare} ";
            $sql .= "where capital_share_aid = :capital_share_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_aid" => $this->capital_share_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
