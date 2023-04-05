<?php
class NetSurplus
{
    public $net_surplus_aid;
    public $net_surplus_id;
    public $net_surplus_amount;
    public $net_surplus_total_capital;
    public $net_surplus_total_profit;
    public $net_surplus_dividend;
    public $net_surplus_patronage_refund;
    public $net_surplus_created;
    public $net_surplus_datetime;

    public $connection;
    public $lastInsertedId;
    public $net_surplus_start;
    public $net_surplus_total;
    public $net_surplus_search;
    public $currentYear;
    public $tblNetSurplus;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblNetSurplus = "sccv1_settings_netsurplus";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblNetSurplus} ";
            $sql .= "( net_surplus_amount, ";
            $sql .= "net_surplus_id, ";
            $sql .= "net_surplus_total_capital, ";
            $sql .= "net_surplus_total_profit, ";
            $sql .= "net_surplus_dividend, ";
            $sql .= "net_surplus_patronage_refund, ";
            $sql .= "net_surplus_created, ";
            $sql .= "net_surplus_datetime ) values ( ";
            $sql .= ":net_surplus_amount, ";
            $sql .= ":net_surplus_id, ";
            $sql .= ":net_surplus_total_capital, ";
            $sql .= ":net_surplus_total_profit, ";
            $sql .= ":net_surplus_dividend, ";
            $sql .= ":net_surplus_patronage_refund, ";
            $sql .= ":net_surplus_created, ";
            $sql .= ":net_surplus_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_id" => $this->net_surplus_id,
                "net_surplus_amount" => $this->net_surplus_amount,
                "net_surplus_total_capital" => $this->net_surplus_total_capital,
                "net_surplus_total_profit" => $this->net_surplus_total_profit,
                "net_surplus_dividend" => $this->net_surplus_dividend,
                "net_surplus_patronage_refund" => $this->net_surplus_patronage_refund,
                "net_surplus_created" => $this->net_surplus_created,
                "net_surplus_datetime" => $this->net_surplus_datetime,
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
            $sql .= "{$this->tblNetSurplus} ";
            $sql .= "order by net_surplus_id desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblNetSurplus} ";
            $sql .= "order by net_surplus_id desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->net_surplus_start - 1,
                "total" => $this->net_surplus_total,
            ]);
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
            $sql .= "{$this->tblNetSurplus} ";
            $sql .= "where net_surplus_amount like :net_surplus_amount ";
            $sql .= "or net_surplus_id like :net_surplus_id ";
            $sql .= "order by net_surplus_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_amount" => "{$this->net_surplus_search}%",
                "net_surplus_id" => "{$this->net_surplus_search}%",
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
            $sql .= "{$this->tblNetSurplus} ";
            $sql .= "where net_surplus_aid = :net_surplus_aid  ";
            $sql .= "order by net_surplus_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_aid " => $this->net_surplus_aid,
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
            $sql = "update {$this->tblNetSurplus} set ";
            $sql .= "net_surplus_amount = :net_surplus_amount, ";
            $sql .= "net_surplus_total_capital = :net_surplus_total_capital, ";
            $sql .= "net_surplus_total_profit = :net_surplus_total_profit, ";
            $sql .= "net_surplus_dividend = :net_surplus_dividend, ";
            $sql .= "net_surplus_patronage_refund = :net_surplus_patronage_refund, ";
            $sql .= "net_surplus_datetime = :net_surplus_datetime ";
            $sql .= "where net_surplus_aid = :net_surplus_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_amount" => $this->net_surplus_amount,
                "net_surplus_total_capital" => $this->net_surplus_total_capital,
                "net_surplus_total_profit" => $this->net_surplus_total_profit,
                "net_surplus_dividend" => $this->net_surplus_dividend,
                "net_surplus_patronage_refund" => $this->net_surplus_patronage_refund,
                "net_surplus_datetime" => $this->net_surplus_datetime,
                "net_surplus_aid" => $this->net_surplus_aid,
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
            $sql = "delete from {$this->tblNetSurplus} ";
            $sql .= "where net_surplus_aid = :net_surplus_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_aid" => $this->net_surplus_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
