<?php
class Dividend
{
    public $capital_share_aid;
    public $capital_share_member_id;
    public $capital_share_paid_up;
    public $capital_share_total;
    public $capital_share_or;
    public $capital_share_date;
    public $capital_share_is_initial_pay;
    public $capital_share_is_penalty;
    public $capital_share_created;
    public $capital_share_datetime;

    public $capital_share_year;
    public $members_member_fee;
    public $members_subscribe_capital_id;

    public $connection;
    public $lastInsertedId;
    public $capital_start;
    public $capital_total;
    public $capital_search;
    public $currentYear;
    public $tblDividend;
    public $tblMembers;
    public $tblNetSurplus;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblDividend = "sccv1_capital_share";
        $this->tblMembers = "sccv1_members";
        $this->tblNetSurplus = "sccv1_settings_netsurplus";
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount, ";
            $sql .= "SUM(dividend.capital_share_total) as total, ";
            $sql .= "YEAR(dividend.capital_share_date) as year ";
            $sql .= "from ";
            $sql .= "{$this->tblDividend} as dividend, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where dividend.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and dividend.capital_share_is_initial_pay = 0 ";
            $sql .= "and YEAR(dividend.capital_share_date) = netSuplus.net_surplus_year ";
            $sql .= "group by YEAR(dividend.capital_share_date) ";
            $sql .= "order by YEAR(dividend.capital_share_date) desc ";
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
            $sql = "select ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount, ";
            $sql .= "SUM(dividend.capital_share_total) as total, ";
            $sql .= "YEAR(dividend.capital_share_date) as year ";
            $sql .= "from ";
            $sql .= "{$this->tblDividend} as dividend, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where dividend.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and dividend.capital_share_is_initial_pay = 0 ";
            $sql .= "and YEAR(dividend.capital_share_date) = netSuplus.net_surplus_year ";
            $sql .= "group by YEAR(dividend.capital_share_date) ";
            $sql .= "order by YEAR(dividend.capital_share_date) desc ";
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

    // search not approved members
    public function filterById()
    {
        try {
            $sql = "select ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount, ";
            $sql .= "SUM(dividend.capital_share_total) as total, ";
            $sql .= "YEAR(dividend.capital_share_date) as year ";
            $sql .= "from ";
            $sql .= "{$this->tblDividend} as dividend, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where dividend.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and YEAR(dividend.capital_share_date) = :year ";
            $sql .= "and dividend.capital_share_is_initial_pay = 0 ";
            $sql .= "and YEAR(dividend.capital_share_date) = netSuplus.net_surplus_year ";
            $sql .= "group by YEAR(dividend.capital_share_date) ";
            $sql .= "order by YEAR(dividend.capital_share_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readMemberAllTotal()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(capital_share_total) as allMemTotal, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from ";
            $sql .= "{$this->tblDividend} ";
            $sql .= "where capital_share_is_initial_pay = 0 ";
            $sql .= "group by YEAR(capital_share_date) ";
            $sql .= "order by YEAR(capital_share_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
