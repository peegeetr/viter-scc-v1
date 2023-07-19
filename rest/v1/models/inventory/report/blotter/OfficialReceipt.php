<?php
class OfficialRecipt
{
    public $or_invoice_aid;
    public $or_invoice_is_official_receipt;
    public $or_invoice_is_sales_invoice;
    public $or_invoice_date;
    public $or_invoice_or_no;
    public $or_invoice_payee;
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
    public $tblOfficialRecipt;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOfficialRecipt = "sccv1_blotter_or_invoice";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblOfficialRecipt} ";
            $sql .= "( or_invoice_payee, ";
            $sql .= "or_invoice_is_official_receipt, ";
            $sql .= "or_invoice_is_sales_invoice, ";
            $sql .= "or_invoice_or_no, ";
            $sql .= "or_invoice_date, ";
            $sql .= "or_invoice_amount, ";
            $sql .= "or_invoice_remarks, ";
            $sql .= "or_invoice_created, ";
            $sql .= "or_invoice_datetime ) values ( ";
            $sql .= ":or_invoice_payee, ";
            $sql .= ":or_invoice_is_official_receipt, ";
            $sql .= ":or_invoice_is_sales_invoice, ";
            $sql .= ":or_invoice_or_no, ";
            $sql .= ":or_invoice_date, ";
            $sql .= ":or_invoice_amount, ";
            $sql .= ":or_invoice_remarks, ";
            $sql .= ":or_invoice_created, ";
            $sql .= ":or_invoice_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_payee" => $this->or_invoice_payee,
                "or_invoice_is_official_receipt" => $this->or_invoice_is_official_receipt,
                "or_invoice_is_sales_invoice" => $this->or_invoice_is_sales_invoice,
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
            $sql = "select * from ";
            $sql .= "{$this->tblOfficialRecipt} ";
            $sql .= "where or_invoice_is_official_receipt = '1' ";
            $sql .= "order by or_invoice_date desc ";
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
            $sql .= "{$this->tblOfficialRecipt} ";
            $sql .= "where or_invoice_is_official_receipt = '1' ";
            $sql .= "order by or_invoice_date desc ";
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

    // filter date base on range
    public function filterDateRange()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblOfficialRecipt} ";
            $sql .= "where or_invoice_is_official_receipt = '1' ";
            $sql .= "and DATE(or_invoice_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by or_invoice_date desc ";
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
            $sql .= "{$this->tblOfficialRecipt} ";
            $sql .= "where or_invoice_is_official_receipt = '1' ";
            $sql .= "and (or_invoice_payee like :or_invoice_payee ";
            $sql .= "or MONTHNAME(or_invoice_date) like :files_month_date ";
            $sql .= "or or_invoice_date like :or_invoice_date) ";
            $sql .= "order by or_invoice_date desc, ";
            $sql .= "or_invoice_payee asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_payee" => "%{$this->or_invoice_search}%",
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
            $sql = "update {$this->tblOfficialRecipt} set ";
            $sql .= "or_invoice_date = :or_invoice_date, ";
            $sql .= "or_invoice_or_no = :or_invoice_or_no, ";
            $sql .= "or_invoice_payee = :or_invoice_payee, ";
            $sql .= "or_invoice_amount = :or_invoice_amount, ";
            $sql .= "or_invoice_remarks = :or_invoice_remarks, ";
            $sql .= "or_invoice_datetime = :or_invoice_datetime ";
            $sql .= "where or_invoice_aid = :or_invoice_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "or_invoice_date" => $this->or_invoice_date,
                "or_invoice_or_no" => $this->or_invoice_or_no,
                "or_invoice_payee" => $this->or_invoice_payee,
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
            $sql = "delete from {$this->tblOfficialRecipt} ";
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
