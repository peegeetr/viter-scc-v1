<?php
class PettyCash
{
    public $petty_cash_aid;
    public $petty_cash_date;
    public $petty_cash_voucher_no;
    public $petty_cash_payee;
    public $petty_cash_in;
    public $petty_cash_out;
    public $petty_cash_balance;
    public $petty_cash_created;
    public $petty_cash_datetime;

    public $connection;
    public $lastInsertedId;
    public $startDate;
    public $endDate;
    public $petty_cash_start;
    public $petty_cash_total;
    public $petty_cash_search;
    public $currentYear;
    public $tblPettyCash;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPettyCash = "sccv1_blotter_petty_cash";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPettyCash} ";
            $sql .= "( petty_cash_voucher_no, ";
            $sql .= "petty_cash_payee, ";
            $sql .= "petty_cash_in, ";
            $sql .= "petty_cash_out, ";
            $sql .= "petty_cash_balance, ";
            $sql .= "petty_cash_date, ";
            $sql .= "petty_cash_created, ";
            $sql .= "petty_cash_datetime ) values ( ";
            $sql .= ":petty_cash_voucher_no, ";
            $sql .= ":petty_cash_payee, ";
            $sql .= ":petty_cash_in, ";
            $sql .= ":petty_cash_out, ";
            $sql .= ":petty_cash_balance, ";
            $sql .= ":petty_cash_date, ";
            $sql .= ":petty_cash_created, ";
            $sql .= ":petty_cash_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_voucher_no" => $this->petty_cash_voucher_no,
                "petty_cash_payee" => $this->petty_cash_payee,
                "petty_cash_in" => $this->petty_cash_in,
                "petty_cash_out" => $this->petty_cash_out,
                "petty_cash_balance" => $this->petty_cash_balance,
                "petty_cash_date" => $this->petty_cash_date,
                "petty_cash_created" => $this->petty_cash_created,
                "petty_cash_datetime" => $this->petty_cash_datetime,
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
            $sql .= "petty_cash_aid, ";
            $sql .= "petty_cash_date, ";
            $sql .= "petty_cash_voucher_no, ";
            $sql .= "petty_cash_payee, ";
            $sql .= "petty_cash_in, ";
            $sql .= "petty_cash_out, ";
            $sql .= "petty_cash_balance ";
            $sql .= "from ";
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "order by petty_cash_date desc ";
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
            $sql .= "petty_cash_aid, ";
            $sql .= "petty_cash_date, ";
            $sql .= "petty_cash_voucher_no, ";
            $sql .= "petty_cash_payee, ";
            $sql .= "petty_cash_in, ";
            $sql .= "petty_cash_out, ";
            $sql .= "petty_cash_balance ";
            $sql .= "from ";
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "order by petty_cash_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->petty_cash_start - 1,
                "total" => $this->petty_cash_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter date base on range
    public function filterDateRange()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "where DATE(petty_cash_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by petty_cash_date desc ";
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
            $sql .= "{$this->tblPettyCash} ";
            $sql .= "where (petty_cash_voucher_no like :petty_cash_voucher_no ";
            $sql .= "or MONTHNAME(petty_cash_date) like :files_month_date ";
            $sql .= "or petty_cash_date like :petty_cash_date) ";
            $sql .= "order by petty_cash_date desc, ";
            $sql .= "petty_cash_voucher_no asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_voucher_no" => "%{$this->petty_cash_search}%",
                "files_month_date" => "%{$this->petty_cash_search}%",
                "petty_cash_date" => "%{$this->petty_cash_search}%",
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
            $sql = "update {$this->tblPettyCash} set ";
            $sql .= "petty_cash_voucher_no = :petty_cash_voucher_no, ";
            $sql .= "petty_cash_payee = :petty_cash_payee, ";
            $sql .= "petty_cash_date = :petty_cash_date, ";
            $sql .= "petty_cash_in = :petty_cash_in, ";
            $sql .= "petty_cash_out = :petty_cash_out, ";
            $sql .= "petty_cash_balance = :petty_cash_balance, ";
            $sql .= "petty_cash_datetime = :petty_cash_datetime ";
            $sql .= "where petty_cash_aid = :petty_cash_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_voucher_no" => $this->petty_cash_voucher_no,
                "petty_cash_payee" => $this->petty_cash_payee,
                "petty_cash_date" => $this->petty_cash_date,
                "petty_cash_in" => $this->petty_cash_in,
                "petty_cash_out" => $this->petty_cash_out,
                "petty_cash_balance" => $this->petty_cash_balance,
                "petty_cash_datetime" => $this->petty_cash_datetime,
                "petty_cash_aid" => $this->petty_cash_aid,
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
            $sql = "delete from {$this->tblPettyCash} ";
            $sql .= "where petty_cash_aid = :petty_cash_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "petty_cash_aid" => $this->petty_cash_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
