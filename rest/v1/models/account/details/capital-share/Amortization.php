<?php
class Amortization
{
    public $capital_amortization_aid;
    public $capital_amortization_member_id;
    public $capital_amortization_amount;
    public $capital_amortization_is_active;
    public $capital_amortization_date;
    public $capital_amortization_created;
    public $capital_amortization_datetime;


    public $connection;
    public $lastInsertedId;
    public $capital_amortization_start;
    public $capital_amortization_total;
    public $capital_amortization_search;
    public $currentYear;
    public $tblAmortization;
    public $tblMembers;
    public $tblSubscribeCapital;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAmortization = "sccv1_capital_amortization";
        $this->tblMembers = "sccv1_members";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblAmortization} ";
            $sql .= "( capital_amortization_member_id, ";
            $sql .= "capital_amortization_amount, ";
            $sql .= "capital_amortization_is_active, ";
            $sql .= "capital_amortization_date, ";
            $sql .= "capital_amortization_created, ";
            $sql .= "capital_amortization_datetime ) values ( ";
            $sql .= ":capital_amortization_member_id, ";
            $sql .= ":capital_amortization_amount, ";
            $sql .= ":capital_amortization_is_active, ";
            $sql .= ":capital_amortization_date, ";
            $sql .= ":capital_amortization_created, ";
            $sql .= ":capital_amortization_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
                "capital_amortization_amount" => $this->capital_amortization_amount,
                "capital_amortization_is_active" => $this->capital_amortization_is_active,
                "capital_amortization_date" => $this->capital_amortization_date,
                "capital_amortization_created" => $this->capital_amortization_created,
                "capital_amortization_datetime" => $this->capital_amortization_datetime,
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
            $sql .= "{$this->tblAmortization} ";
            $sql .= "order by capital_amortization_date desc ";
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
            $sql .= "{$this->tblAmortization} ";
            $sql .= "where capital_amortization_member_id = :capital_amortization_member_id ";
            $sql .= "and (capital_amortization_amount like :capital_amortization_amount ";
            $sql .= "or MONTHNAME(capital_amortization_date) like :capital_share_month_date ";
            $sql .= "or capital_amortization_date like :capital_amortization_date) ";
            $sql .= "order by capital_amortization_date desc, ";
            $sql .= "capital_amortization_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
                "capital_amortization_date" => "%{$this->capital_amortization_search}%",
                "capital_share_month_date" => "%{$this->capital_amortization_search}%",
                "capital_amortization_amount" => "%{$this->capital_amortization_search}%",
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
            $sql .= "{$this->tblAmortization} ";
            $sql .= "where capital_amortization_member_id = :capital_amortization_member_id ";
            $sql .= "order by capital_amortization_is_active desc, ";
            $sql .= "capital_amortization_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
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
            $sql .= "{$this->tblAmortization} ";
            $sql .= "where capital_amortization_member_id = :capital_amortization_member_id ";
            $sql .= "order by capital_amortization_is_active desc, ";
            $sql .= "capital_amortization_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
                "start" => $this->capital_amortization_start - 1,
                "total" => $this->capital_amortization_total,
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
            $sql = "update {$this->tblAmortization} set ";
            $sql .= "capital_amortization_amount = :capital_amortization_amount, ";
            $sql .= "capital_amortization_date = :capital_amortization_date, ";
            $sql .= "capital_amortization_datetime = :capital_amortization_datetime ";
            $sql .= "where capital_amortization_aid  = :capital_amortization_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_amount" => $this->capital_amortization_amount,
                "capital_amortization_date" => $this->capital_amortization_date,
                "capital_amortization_datetime" => $this->capital_amortization_datetime,
                "capital_amortization_aid" => $this->capital_amortization_aid,
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
            $sql = "delete from {$this->tblAmortization} ";
            $sql .= "where capital_amortization_aid = :capital_amortization_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_aid" => $this->capital_amortization_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblAmortization} set ";
            $sql .= "capital_amortization_is_active = :capital_amortization_is_active, ";
            $sql .= "capital_amortization_datetime = :capital_amortization_datetime ";
            $sql .= "where capital_amortization_aid = :capital_amortization_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_is_active" => $this->capital_amortization_is_active,
                "capital_amortization_datetime" => $this->capital_amortization_datetime,
                "capital_amortization_aid" => $this->capital_amortization_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read all active by  member id
    public function readAllActiveById()
    {
        try {
            $sql = "select capital_amortization_amount, ";
            $sql .= "capital_amortization_is_active, ";
            $sql .= "capital_amortization_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblAmortization} ";
            $sql .= "where capital_amortization_member_id = :capital_amortization_member_id ";
            $sql .= "and capital_amortization_is_active = '1' ";
            $sql .= "order by capital_amortization_is_active desc, ";
            $sql .= "capital_amortization_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active edit validation
    public function readAllActiveNotById()
    {
        try {
            $sql = "select capital_amortization_amount, ";
            $sql .= "capital_amortization_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblAmortization} ";
            $sql .= "where capital_amortization_is_active = '1' ";
            $sql .= "and capital_amortization_member_id = :capital_amortization_member_id ";
            $sql .= "and capital_amortization_aid != :capital_amortization_aid ";
            $sql .= "order by capital_amortization_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_amortization_aid" => $this->capital_amortization_aid,
                "capital_amortization_member_id" => $this->capital_amortization_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
