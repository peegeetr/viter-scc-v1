<?php
class OfficialReceipt
{
    public $or_invoice_aid;
    public $or_invoice_type;
    public $or_invoice_date;
    public $or_invoice_or_no;
    public $or_invoice_payee_id;
    public $or_invoice_amount;
    public $or_invoice_remarks;
    public $or_invoice_created;
    public $or_invoice_datetime;

    public $connection;
    public $lastInsertedId;
    public $or_invoice_start;
    public $or_invoice_total;
    public $or_invoice_search;
    public $currentYear;
    public $startDate;
    public $endDate;
    public $tblOfficialReceipt;
    public $tblMembers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOfficialReceipt = "sccv1_blotter_or_invoice";
        $this->tblMembers = "sccv1_members";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblOfficialReceipt} ";
            $sql .= "( or_invoice_payee_id, ";
            $sql .= "or_invoice_type, ";
            $sql .= "or_invoice_or_no, ";
            $sql .= "or_invoice_date, ";
            $sql .= "or_invoice_amount, ";
            $sql .= "or_invoice_remarks, ";
            $sql .= "or_invoice_created, ";
            $sql .= "or_invoice_datetime ) values ( ";
            $sql .= ":or_invoice_payee_id, ";
            $sql .= ":or_invoice_type, ";
            $sql .= ":or_invoice_or_no, ";
            $sql .= ":or_invoice_date, ";
            $sql .= ":or_invoice_amount, ";
            $sql .= ":or_invoice_remarks, ";
            $sql .= ":or_invoice_created, ";
            $sql .= ":or_invoice_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_payee_id" => $this->or_invoice_payee_id,
                "or_invoice_type" => $this->or_invoice_type,
                "or_invoice_or_no" => $this->or_invoice_or_no,
                "or_invoice_date" => $this->or_invoice_date,
                "or_invoice_amount" => $this->or_invoice_amount,
                "or_invoice_remarks" => $this->or_invoice_remarks,
                "or_invoice_created" => $this->or_invoice_created,
                "or_invoice_datetime" => $this->or_invoice_datetime,
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
            $sql = "select ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "officialReceipt.or_invoice_aid, ";
            $sql .= "officialReceipt.or_invoice_date, ";
            $sql .= "officialReceipt.or_invoice_or_no, ";
            $sql .= "officialReceipt.or_invoice_payee_id, ";
            $sql .= "officialReceipt.or_invoice_amount, ";
            $sql .= "officialReceipt.or_invoice_remarks ";
            $sql .= "from ";
            $sql .= "{$this->tblOfficialReceipt} as officialReceipt, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where officialReceipt.or_invoice_type = 'or' ";
            $sql .= "and officialReceipt.or_invoice_payee_id = member.members_aid ";
            $sql .= "order by officialReceipt.or_invoice_date desc, ";
            $sql .= "member.members_last_name, member.members_first_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "officialReceipt.or_invoice_aid, ";
            $sql .= "officialReceipt.or_invoice_date, ";
            $sql .= "officialReceipt.or_invoice_or_no, ";
            $sql .= "officialReceipt.or_invoice_payee_id, ";
            $sql .= "officialReceipt.or_invoice_amount, ";
            $sql .= "officialReceipt.or_invoice_remarks ";
            $sql .= "from ";
            $sql .= "{$this->tblOfficialReceipt} as officialReceipt, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where officialReceipt.or_invoice_type = 'or' ";
            $sql .= "and officialReceipt.or_invoice_payee_id = member.members_aid ";
            $sql .= "order by officialReceipt.or_invoice_date desc, ";
            $sql .= "member.members_last_name, member.members_first_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->or_invoice_start - 1,
                "total" => $this->or_invoice_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read All Member
    public function readAllMember()
    {
        try {
            $sql = "select ";
            $sql .= "members_aid, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name ";
            $sql .= "from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 1 ";
            $sql .= "and members_is_active = 1 ";
            $sql .= "order by members_last_name desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // filter date base on range
    public function filterDateRange()
    {
        try {
            $sql = "select ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "officialReceipt.or_invoice_aid, ";
            $sql .= "officialReceipt.or_invoice_date, ";
            $sql .= "officialReceipt.or_invoice_or_no, ";
            $sql .= "officialReceipt.or_invoice_payee_id, ";
            $sql .= "officialReceipt.or_invoice_amount, ";
            $sql .= "officialReceipt.or_invoice_remarks ";
            $sql .= "from ";
            $sql .= "{$this->tblOfficialReceipt} as officialReceipt, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where officialReceipt.or_invoice_type = 'or' ";
            $sql .= "and officialReceipt.or_invoice_payee_id = member.members_aid ";
            $sql .= "and DATE(or_invoice_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by officialReceipt.or_invoice_date desc, ";
            $sql .= "member.members_last_name, member.members_first_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start_date" => $this->startDate,
                "end_date" => $this->endDate,
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
            $sql .= "{$this->tblOfficialReceipt} ";
            $sql .= "where officialReceipt.or_invoice_type = 'or' ";
            $sql .= "and (or_invoice_payee_id like :or_invoice_payee_id ";
            $sql .= "or MONTHNAME(or_invoice_date) like :files_month_date ";
            $sql .= "or or_invoice_date like :or_invoice_date) ";
            $sql .= "order by or_invoice_date desc, ";
            $sql .= "or_invoice_payee_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_payee_id" => "%{$this->or_invoice_search}%",
                "files_month_date" => "%{$this->or_invoice_search}%",
                "or_invoice_date" => "%{$this->or_invoice_search}%",
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
            $sql = "update {$this->tblOfficialReceipt} set ";
            $sql .= "or_invoice_date = :or_invoice_date, ";
            $sql .= "or_invoice_or_no = :or_invoice_or_no, ";
            $sql .= "or_invoice_payee_id = :or_invoice_payee_id, ";
            $sql .= "or_invoice_amount = :or_invoice_amount, ";
            $sql .= "or_invoice_remarks = :or_invoice_remarks, ";
            $sql .= "or_invoice_datetime = :or_invoice_datetime ";
            $sql .= "where or_invoice_aid = :or_invoice_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_date" => $this->or_invoice_date,
                "or_invoice_or_no" => $this->or_invoice_or_no,
                "or_invoice_payee_id" => $this->or_invoice_payee_id,
                "or_invoice_amount" => $this->or_invoice_amount,
                "or_invoice_remarks" => $this->or_invoice_remarks,
                "or_invoice_datetime" => $this->or_invoice_datetime,
                "or_invoice_aid" => $this->or_invoice_aid,
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
            $sql = "delete from {$this->tblOfficialReceipt} ";
            $sql .= "where or_invoice_aid = :or_invoice_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_aid" => $this->or_invoice_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
