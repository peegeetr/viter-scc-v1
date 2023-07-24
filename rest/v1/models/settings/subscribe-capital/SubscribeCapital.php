<?php
class SubscribeCapital
{
    public $subscribe_capital_aid;
    public $subscribe_capital_date;
    public $subscribe_capital_amount;
    public $subscribe_capital_is_active;
    public $subscribe_capital_created;
    public $subscribe_capital_datetime;

    public $members_aid;
    public $connection;
    public $lastInsertedId;
    public $subscribe_capital_start;
    public $subscribe_capital_total;
    public $subscribe_capital_search;
    public $currentYear;
    public $tblSubscribeCapital;
    public $tblMembers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblMembers = "sccv1_members";
        $this->tblSubscribeCapital = "sccv1_settings_subscribe_capital";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSubscribeCapital} ";
            $sql .= "( subscribe_capital_amount, ";
            $sql .= "subscribe_capital_date, ";
            $sql .= "subscribe_capital_is_active, ";
            $sql .= "subscribe_capital_created, ";
            $sql .= "subscribe_capital_datetime ) values ( ";
            $sql .= ":subscribe_capital_amount, ";
            $sql .= ":subscribe_capital_date, ";
            $sql .= ":subscribe_capital_is_active, ";
            $sql .= ":subscribe_capital_created, ";
            $sql .= ":subscribe_capital_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_amount" => $this->subscribe_capital_amount,
                "subscribe_capital_date" => $this->subscribe_capital_date,
                "subscribe_capital_is_active" => $this->subscribe_capital_is_active,
                "subscribe_capital_created" => $this->subscribe_capital_created,
                "subscribe_capital_datetime" => $this->subscribe_capital_datetime,
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
            $sql = "select subscribe_capital_aid, ";
            $sql .= "subscribe_capital_date, ";
            $sql .= "subscribe_capital_amount, ";
            $sql .= "subscribe_capital_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} ";
            $sql .= "order by subscribe_capital_is_active desc, ";
            $sql .= "subscribe_capital_date desc, ";
            $sql .= "subscribe_capital_amount asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select subscribe_capital_aid, ";
            $sql .= "subscribe_capital_date, ";
            $sql .= "subscribe_capital_amount, ";
            $sql .= "subscribe_capital_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} ";
            $sql .= "order by subscribe_capital_is_active desc, ";
            $sql .= "subscribe_capital_date desc, ";
            $sql .= "subscribe_capital_amount asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->subscribe_capital_start - 1,
                "total" => $this->subscribe_capital_total,
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
            $sql = "select subscribe_capital_aid, ";
            $sql .= "subscribe_capital_date, ";
            $sql .= "subscribe_capital_amount, ";
            $sql .= "subscribe_capital_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} ";
            $sql .= "where (subscribe_capital_amount like :subscribe_capital_amount ";
            $sql .= "or MONTHNAME(subscribe_capital_date) like :month_name ";
            $sql .= "or subscribe_capital_date like :subscribe_capital_date) ";
            $sql .= "order by subscribe_capital_is_active desc, ";
            $sql .= "subscribe_capital_date desc, ";
            $sql .= "subscribe_capital_amount asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_amount" => "{$this->subscribe_capital_search}%",
                "month_name" => "{$this->subscribe_capital_search}%",
                "subscribe_capital_date" => "{$this->subscribe_capital_search}%",
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
            $sql = "update {$this->tblSubscribeCapital} set ";
            $sql .= "subscribe_capital_amount = :subscribe_capital_amount, ";
            $sql .= "subscribe_capital_date = :subscribe_capital_date, ";
            $sql .= "subscribe_capital_is_active = :subscribe_capital_is_active, ";
            $sql .= "subscribe_capital_datetime = :subscribe_capital_datetime ";
            $sql .= "where subscribe_capital_aid = :subscribe_capital_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_amount" => $this->subscribe_capital_amount,
                "subscribe_capital_date" => $this->subscribe_capital_date,
                "subscribe_capital_is_active" => $this->subscribe_capital_is_active,
                "subscribe_capital_datetime" => $this->subscribe_capital_datetime,
                "subscribe_capital_aid" => $this->subscribe_capital_aid,
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
            $sql = "delete from {$this->tblSubscribeCapital} ";
            $sql .= "where subscribe_capital_aid = :subscribe_capital_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_aid" => $this->subscribe_capital_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active create validation
    public function readAllActive()
    {
        try {
            $sql = "select subscribe_capital_amount, ";
            $sql .= "subscribe_capital_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} ";
            $sql .= "where subscribe_capital_is_active = 1 ";
            $sql .= "order by subscribe_capital_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active create validation
    public function readAllActiveById()
    {
        try {
            $sql = "select subscribeC.subscribe_capital_amount, ";
            $sql .= "subscribeC.subscribe_capital_is_active, ";
            $sql .= "member.members_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} as subscribeC, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where member.members_aid = :members_aid ";
            $sql .= "and member.members_subscribe_capital_id = subscribeC.subscribe_capital_aid ";
            $sql .= "order by subscribeC.subscribe_capital_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // check if capital is exist in member
    public function readMemberByCapitalId()
    {
        try {
            $sql = "select subscribeC.subscribe_capital_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} as subscribeC, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where member.members_subscribe_capital_id = subscribeC.subscribe_capital_aid ";
            $sql .= "group by subscribeC.subscribe_capital_aid ";
            $sql .= "order by subscribeC.subscribe_capital_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active create validation
    public function checkAssociation()
    {
        try {
            $sql = "select members_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_subscribe_capital_id = :subscribe_capital_aid ";
            $sql .= "order by members_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_aid" => $this->subscribe_capital_aid,
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
            $sql = "select subscribe_capital_amount, ";
            $sql .= "subscribe_capital_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblSubscribeCapital} ";
            $sql .= "where subscribe_capital_is_active = 1 ";
            $sql .= "and subscribe_capital_aid != :subscribe_capital_aid ";
            $sql .= "order by subscribe_capital_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "subscribe_capital_aid" => $this->subscribe_capital_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
