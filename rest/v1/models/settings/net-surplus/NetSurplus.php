<?php
class NetSurplus
{
    public $net_surplus_aid;
    public $net_surplus_year;
    public $net_surplus_allocation;
    public $net_surplus_before_amount;
    public $net_surplus_distribution_amount;
    public $net_surplus_operating_expenses;
    public $net_surplus_total_income;
    public $net_surplus_general_reserve;
    public $net_surplus_general_reserve_rate;
    public $net_surplus_educ_training;
    public $net_surplus_educ_training_rate;
    public $net_surplus_community_dev;
    public $net_surplus_community_dev_rate;
    public $net_surplus_optional_fund;
    public $net_surplus_optional_fund_rate;
    public $net_surplus_dividend;
    public $net_surplus_dividend_rate;
    public $net_surplus_patronage_refund;
    public $net_surplus_patronage_rate;
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
            $sql .= "( net_surplus_total_income, ";
            $sql .= "net_surplus_year, ";
            $sql .= "net_surplus_allocation, ";
            $sql .= "net_surplus_before_amount, ";
            $sql .= "net_surplus_distribution_amount, ";
            $sql .= "net_surplus_operating_expenses, ";
            $sql .= "net_surplus_general_reserve, ";
            $sql .= "net_surplus_general_reserve_rate, ";
            $sql .= "net_surplus_educ_training, ";
            $sql .= "net_surplus_educ_training_rate, ";
            $sql .= "net_surplus_community_dev, ";
            $sql .= "net_surplus_community_dev_rate, ";
            $sql .= "net_surplus_optional_fund, ";
            $sql .= "net_surplus_optional_fund_rate, ";
            $sql .= "net_surplus_dividend, ";
            $sql .= "net_surplus_dividend_rate, ";
            $sql .= "net_surplus_patronage_refund, ";
            $sql .= "net_surplus_patronage_rate, ";
            $sql .= "net_surplus_created, ";
            $sql .= "net_surplus_datetime ) values ( ";
            $sql .= ":net_surplus_total_income, ";
            $sql .= ":net_surplus_year, ";
            $sql .= ":net_surplus_allocation, ";
            $sql .= ":net_surplus_before_amount, ";
            $sql .= ":net_surplus_distribution_amount, ";
            $sql .= ":net_surplus_operating_expenses, ";
            $sql .= ":net_surplus_general_reserve, ";
            $sql .= ":net_surplus_general_reserve_rate, ";
            $sql .= ":net_surplus_educ_training, ";
            $sql .= ":net_surplus_educ_training_rate, ";
            $sql .= ":net_surplus_community_dev, ";
            $sql .= ":net_surplus_community_dev_rate, ";
            $sql .= ":net_surplus_optional_fund, ";
            $sql .= ":net_surplus_optional_fund_rate, ";
            $sql .= ":net_surplus_dividend, ";
            $sql .= ":net_surplus_dividend_rate, ";
            $sql .= ":net_surplus_patronage_refund, ";
            $sql .= ":net_surplus_patronage_rate, ";
            $sql .= ":net_surplus_created, ";
            $sql .= ":net_surplus_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_total_income" => $this->net_surplus_total_income,
                "net_surplus_year" => $this->net_surplus_year,
                "net_surplus_allocation" => $this->net_surplus_allocation,
                "net_surplus_before_amount" => $this->net_surplus_before_amount,
                "net_surplus_distribution_amount" => $this->net_surplus_distribution_amount,
                "net_surplus_operating_expenses" => $this->net_surplus_operating_expenses,
                "net_surplus_general_reserve" => $this->net_surplus_general_reserve,
                "net_surplus_general_reserve_rate" => $this->net_surplus_general_reserve_rate,
                "net_surplus_educ_training" => $this->net_surplus_educ_training,
                "net_surplus_educ_training_rate" => $this->net_surplus_educ_training_rate,
                "net_surplus_community_dev" => $this->net_surplus_community_dev,
                "net_surplus_community_dev_rate" => $this->net_surplus_community_dev_rate,
                "net_surplus_optional_fund" => $this->net_surplus_optional_fund,
                "net_surplus_optional_fund_rate" => $this->net_surplus_optional_fund_rate,
                "net_surplus_dividend" => $this->net_surplus_dividend,
                "net_surplus_dividend_rate" => $this->net_surplus_dividend_rate,
                "net_surplus_patronage_refund" => $this->net_surplus_patronage_refund,
                "net_surplus_patronage_rate" => $this->net_surplus_patronage_rate,
                "net_surplus_created" => $this->net_surplus_created,
                "net_surplus_datetime" => $this->net_surplus_datetime,
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
            $sql = "select * from ";
            $sql .= "{$this->tblNetSurplus} ";
            $sql .= "order by net_surplus_year desc ";
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
            $sql .= "order by net_surplus_year desc ";
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
            $sql .= "where net_surplus_distribution_amount like :net_surplus_distribution_amount ";
            $sql .= "or net_surplus_year like :net_surplus_year ";
            $sql .= "order by net_surplus_year desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_distribution_amount" => "%{$this->net_surplus_search}%",
                "net_surplus_year" => "%{$this->net_surplus_search}%",
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
            $sql .= "order by net_surplus_year desc ";
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
            $sql .= "net_surplus_year = :net_surplus_year, ";
            $sql .= "net_surplus_allocation = :net_surplus_allocation, ";
            $sql .= "net_surplus_before_amount = :net_surplus_before_amount, ";
            $sql .= "net_surplus_distribution_amount = :net_surplus_distribution_amount, ";
            $sql .= "net_surplus_operating_expenses = :net_surplus_operating_expenses, ";
            $sql .= "net_surplus_total_income = :net_surplus_total_income, ";
            $sql .= "net_surplus_general_reserve = :net_surplus_general_reserve, ";
            $sql .= "net_surplus_general_reserve_rate = :net_surplus_general_reserve_rate, ";
            $sql .= "net_surplus_educ_training = :net_surplus_educ_training, ";
            $sql .= "net_surplus_educ_training_rate = :net_surplus_educ_training_rate, ";
            $sql .= "net_surplus_community_dev = :net_surplus_community_dev, ";
            $sql .= "net_surplus_community_dev_rate = :net_surplus_community_dev_rate, ";
            $sql .= "net_surplus_optional_fund = :net_surplus_optional_fund, ";
            $sql .= "net_surplus_optional_fund_rate = :net_surplus_optional_fund_rate, ";
            $sql .= "net_surplus_dividend = :net_surplus_dividend, ";
            $sql .= "net_surplus_dividend_rate = :net_surplus_dividend_rate, ";
            $sql .= "net_surplus_patronage_refund = :net_surplus_patronage_refund, ";
            $sql .= "net_surplus_patronage_rate = :net_surplus_patronage_rate, ";
            $sql .= "net_surplus_datetime = :net_surplus_datetime ";
            $sql .= "where net_surplus_aid = :net_surplus_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "net_surplus_year" => $this->net_surplus_year,
                "net_surplus_allocation" => $this->net_surplus_allocation,
                "net_surplus_before_amount" => $this->net_surplus_before_amount,
                "net_surplus_distribution_amount" => $this->net_surplus_distribution_amount,
                "net_surplus_operating_expenses" => $this->net_surplus_operating_expenses,
                "net_surplus_total_income" => $this->net_surplus_total_income,
                "net_surplus_general_reserve" => $this->net_surplus_general_reserve,
                "net_surplus_general_reserve_rate" => $this->net_surplus_general_reserve_rate,
                "net_surplus_educ_training" => $this->net_surplus_educ_training,
                "net_surplus_educ_training_rate" => $this->net_surplus_educ_training_rate,
                "net_surplus_community_dev" => $this->net_surplus_community_dev,
                "net_surplus_community_dev_rate" => $this->net_surplus_community_dev_rate,
                "net_surplus_optional_fund" => $this->net_surplus_optional_fund,
                "net_surplus_optional_fund_rate" => $this->net_surplus_optional_fund_rate,
                "net_surplus_dividend" => $this->net_surplus_dividend,
                "net_surplus_dividend_rate" => $this->net_surplus_dividend_rate,
                "net_surplus_patronage_refund" => $this->net_surplus_patronage_refund,
                "net_surplus_patronage_rate" => $this->net_surplus_patronage_rate,
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
