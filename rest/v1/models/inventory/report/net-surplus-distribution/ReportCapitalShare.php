<?php
class ReportCapitalShare
{
    public $capital_share_aid;
    public $capital_share_member_id;
    public $capital_share_paid_up;
    public $capital_share_total;
    public $capital_share_or;
    public $capital_share_date;
    public $capital_share_is_initial_pay;
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
    public $tblReportCapitalShare;
    public $tblMembers;
    public $tblSubscribeCapital;
    public $tblNetSurplus;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReportCapitalShare = "sccv1_capital_share";
        $this->tblMembers = "sccv1_members";
        $this->tblSubscribeCapital = "sccv1_settings_subscribe_capital";
        $this->tblNetSurplus = "sccv1_settings_netsurplus";
    }


    // read all member Capital
    public function readReportCapitalByMemberId()
    {
        try {
            $sql = "select ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name, ";
            $sql .= "members.members_aid, ";
            $sql .= "SUM(capital_share_total) as total, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where capitalShare.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :year ";
            $sql .= "and members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "group by ";
            $sql .= "capitalShare.capital_share_member_id, ";
            $sql .= "YEAR(capital_share_date) ";
            $sql .= "order by members.members_last_name asc ";
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

    // read member by id Capital
    public function readReportCapital()
    {
        try {
            $sql = "select ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name, ";
            $sql .= "members.members_aid, ";
            $sql .= "SUM(capital_share_total) as total, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :year ";
            $sql .= "group by ";
            $sql .= "capitalShare.capital_share_member_id, ";
            $sql .= "YEAR(capital_share_date) ";
            $sql .= "order by members.members_last_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all member Capital Dividend
    public function readReportCapitalDividend()
    {
        try {
            $sql = "select ";
            $sql .= "sum(capitalShare.capital_share_total) as total, ";
            $sql .= "YEAR(capitalShare.capital_share_date) as year, ";
            $sql .= "members.members_aid, ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :year ";
            $sql .= "group by ";
            $sql .= "capitalShare.capital_share_member_id, ";
            $sql .= "YEAR(capital_share_date) ";
            $sql .= "order by members.members_last_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read member by id Capital Dividend
    public function readReportCapitalDividendByMemberId()
    {
        try {
            $sql = "select ";
            $sql .= "sum(capitalShare.capital_share_total) as total, ";
            $sql .= "YEAR(capitalShare.capital_share_date) as year, ";
            $sql .= "members.members_aid, ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where capitalShare.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :capital_share_date ";
            $sql .= "and members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "group by members.members_aid ";
            $sql .= "order by capitalShare.capital_share_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->capital_share_member_id,
                "capital_share_date" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read By Member Id And Year
    public function readByMemberIdAndYear()
    {
        try {
            $sql = "select ";
            $sql .= "capital_share_is_penalty, ";
            $sql .= "SUM(capital_share_total) as totalCapital, ";
            $sql .= "SUM(capital_share_paid_up) as paidUp, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from {$this->tblReportCapitalShare} ";
            $sql .= "where capital_share_member_id = :capital_share_member_id ";
            $sql .= "and YEAR(capital_share_date) = :year ";
            $sql .= "group by capital_share_member_id, ";
            $sql .= "capital_share_is_penalty ";
            $sql .= "order by YEAR(capital_share_date) desc ";
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

    // read All Total Capital By Year
    public function readAllTotalCapitalByYear()
    {
        try {
            $sql = "select ";
            $sql .= "SUM(capital_share_total) as totalCapital, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from {$this->tblReportCapitalShare} ";
            $sql .= "where YEAR(capital_share_date) = :year ";
            $sql .= "group by YEAR(capital_share_date) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read By Member Id And Year
    public function readAllByYear()
    {
        try {
            $sql = "select ";
            $sql .= "capital_share_is_penalty, ";
            $sql .= "SUM(capital_share_total) as totalCapital, ";
            $sql .= "SUM(capital_share_paid_up) as paidUp, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from {$this->tblReportCapitalShare} ";
            $sql .= "where YEAR(capital_share_date) = :year ";
            $sql .= "group by capital_share_member_id, ";
            $sql .= "capital_share_is_penalty ";
            $sql .= "order by YEAR(capital_share_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read report net surplus by year
    public function readReportNetSurplusByYear()
    {
        try {
            $sql = "select ";
            $sql .= "net_surplus_aid, ";
            $sql .= "net_surplus_year, ";
            $sql .= "net_surplus_dividend_rate, ";
            $sql .= "net_surplus_dividend ";
            $sql .= "from {$this->tblNetSurplus} ";
            $sql .= "where net_surplus_year = :year ";
            $sql .= "order by net_surplus_year desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all Member Fee
    public function readAllMemberFee()
    {
        try {
            $sql = "select ";
            $sql .= "members_aid, ";
            $sql .= "members_member_fee ";
            $sql .= "from {$this->tblMembers} ";
            $sql .= "where (members_member_fee != '' ";
            $sql .= "or members_member_fee != 0) ";
            $query = $this->connection->query($sql);
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
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount, ";
            $sql .= "sum(capitalShare.capital_share_total) as total, ";
            $sql .= "YEAR(capitalShare.capital_share_date) as year, ";
            $sql .= "capital_share_member_id, ";
            $sql .= "SUM(capital_share_total) as allMemTotal, ";
            $sql .= "YEAR(capital_share_date) as year ";
            $sql .= "from ";
            $sql .= "{$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where capitalShare.capital_share_is_initial_pay = 0 ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :year ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = netSuplus.net_surplus_year ";
            $sql .= "and member.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "group by YEAR(capitalShare.capital_share_date) ";
            $sql .= "order by YEAR(capitalShare.capital_share_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->capital_share_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
