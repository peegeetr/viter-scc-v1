<?php
class CapitalShare
{
    public $capital_share_aid;
    public $capital_share_member_id;
    public $capital_share_paid_up;
    public $capital_share_or;
    public $capital_share_date;
    public $capital_share_created;
    public $capital_share_datetime;

    public $members_member_fee;
    public $members_subscribe_capital_id;

    public $connection;
    public $lastInsertedId;
    public $capital_start;
    public $capital_total;
    public $capital_search;
    public $currentYear;
    public $tblCapitalShare;
    public $tblMembers;
    public $tblSubscribeCapital;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCapitalShare = "sccv1_capital_share";
        $this->tblMembers = "sccv1_members";
        $this->tblSubscribeCapital = "sccv1_settings_subscribe_capital";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCapitalShare} ";
            $sql .= "( capital_share_member_id, ";
            $sql .= "capital_share_paid_up, ";
            $sql .= "capital_share_or, ";
            $sql .= "capital_share_date, ";
            $sql .= "capital_share_created, ";
            $sql .= "capital_share_datetime ) values ( ";
            $sql .= ":capital_share_member_id, ";
            $sql .= ":capital_share_paid_up, ";
            $sql .= ":capital_share_or, ";
            $sql .= ":capital_share_date, ";
            $sql .= ":capital_share_created, ";
            $sql .= ":capital_share_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_paid_up" => $this->capital_share_paid_up,
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
            $sql .= "and (capital_share_paid_up like :capital_share_paid_up ";
            $sql .= "or MONTHNAME(capital_share_date) like :capital_share_month_date ";
            $sql .= "or capital_share_date like :capital_share_date) ";
            $sql .= "order by capital_share_date desc, ";
            $sql .= "capital_share_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_date" => "%{$this->capital_search}%",
                "capital_share_month_date" => "%{$this->capital_search}%",
                "capital_share_paid_up" => "%{$this->capital_search}%",
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
            $sql .= "capital_share_paid_up = :capital_share_paid_up, ";
            $sql .= "capital_share_or = :capital_share_or, ";
            $sql .= "capital_share_date = :capital_share_date, ";
            $sql .= "capital_share_datetime = :capital_share_datetime ";
            $sql .= "where capital_share_aid  = :capital_share_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
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

    // read by id
    public function readTotalCapitalById()
    {
        try {
            $sql = "select sum(capitalShare.capital_share_paid_up) as totalPaidUp, ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_member_fee, ";
            $sql .= "members.members_first_name ";
            $sql .= "from {$this->tblCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where capitalShare.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "group by capitalShare.capital_share_member_id ";
            $sql .= "order by capitalShare.capital_share_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateCapitalDetails()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_subscribe_capital_id = :members_subscribe_capital_id, ";
            $sql .= "members_member_fee = :members_member_fee, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_subscribe_capital_id" => $this->members_subscribe_capital_id,
                "members_member_fee" => $this->members_member_fee,
                "members_datetime" => $this->capital_share_datetime,
                "members_aid" => $this->capital_share_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function createMemberFee()
    {
        try {
            $sql = "insert into {$this->tblCapitalShare} ";
            $sql .= "( capital_share_member_id, ";
            $sql .= "capital_share_paid_up, ";
            $sql .= "capital_share_or, ";
            $sql .= "capital_share_date, ";
            $sql .= "capital_share_created, ";
            $sql .= "capital_share_datetime ) values ( ";
            $sql .= ":capital_share_member_id, ";
            $sql .= ":capital_share_paid_up, ";
            $sql .= ":capital_share_or, ";
            $sql .= ":capital_share_date, ";
            $sql .= ":capital_share_created, ";
            $sql .= ":capital_share_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_paid_up" => $this->members_member_fee,
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
    // update member fee
    public function updateMemberFee()
    {
        try {
            $sql = "update {$this->tblCapitalShare} set ";
            $sql .= "capital_share_paid_up = :capital_share_paid_up, ";
            $sql .= "capital_share_or = :capital_share_or, ";
            $sql .= "capital_share_date = :capital_share_date, ";
            $sql .= "capital_share_datetime = :capital_share_datetime ";
            $sql .= "where capital_share_aid  = :capital_share_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_paid_up" => $this->members_member_fee,
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

    // read by id
    public function readMemberFeeByMemberId()
    {
        try {
            $sql = "select members_member_fee ";
            $sql .= "from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_aid" => $this->capital_share_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
