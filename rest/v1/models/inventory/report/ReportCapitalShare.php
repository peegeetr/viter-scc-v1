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

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblReportCapitalShare = "sccv1_capital_share";
        $this->tblMembers = "sccv1_members";
        $this->tblSubscribeCapital = "sccv1_settings_subscribe_capital";
    }

    // read by id
    public function readReportCapitalByMemberId()
    {
        try {
            $sql = "select capitalShare.*, ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where capitalShare.capital_share_member_id = :capital_share_member_id ";
            $sql .= "and YEAR(capitalShare.capital_share_date) = :capital_share_date ";
            $sql .= "and members.members_aid = capitalShare.capital_share_member_id ";
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

    // read by id
    public function readReportCapital()
    {
        try {
            $sql = "select capitalShare.*, ";
            $sql .= "members.members_last_name, ";
            $sql .= "members.members_first_name ";
            $sql .= "from {$this->tblReportCapitalShare} as capitalShare, ";
            $sql .= "{$this->tblMembers} as members ";
            $sql .= "where members.members_aid = capitalShare.capital_share_member_id ";
            $sql .= "order by capitalShare.capital_share_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
