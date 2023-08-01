<?php
class ReportPatronage
{
    public $orders_aid;
    public $orders_number;
    public $orders_is_paid;
    public $orders_is_draft;
    public $orders_member_id;
    public $orders_product_id;
    public $orders_stocks_id;
    public $orders_product_quantity;
    public $orders_product_amount;
    public $orders_product_srp;
    public $orders_suplier_price;
    public $orders_date;
    public $orders_remarks;
    public $orders_created;
    public $orders_datetime;

    public $connection;
    public $lastInsertedId;
    public $orders_start;
    public $orders_total;
    public $orders_search;
    public $currentYear;

    public $tblOrders;
    public $tblSales;
    public $tblNetSurplus;
    public $tblMembers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOrders = "sccv1_orders";
        $this->tblSales = "sccv1_sales";
        $this->tblNetSurplus = "sccv1_settings_netsurplus";
        $this->tblMembers = "sccv1_members";
    }
    // filter by year
    public function readReportPatronageByYearAndMemberId()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_amount) as totalAmount, ";
            $sql .= "SUM(sales.sales_discount) as salesDiscount, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_total_income, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and YEAR(orders.orders_date) = :year ";
            $sql .= "and YEAR(orders.orders_date) = netSuplus.net_surplus_year ";
            $sql .= "and member.members_aid = orders.orders_member_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "group by orders.orders_member_id, ";
            $sql .= "YEAR(orders.orders_date) ";
            $sql .= "order by YEAR(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "year" => $this->orders_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter 
    public function readReportPatronageByYear()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_amount) as totalAmount, ";
            $sql .= "SUM(sales.sales_discount) as salesDiscount, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "netSuplus.net_surplus_total_income, ";
            $sql .= "netSuplus.net_surplus_dividend_rate, ";
            $sql .= "netSuplus.net_surplus_dividend, ";
            $sql .= "netSuplus.net_surplus_patronage_rate, ";
            $sql .= "netSuplus.net_surplus_patronage_refund, ";
            $sql .= "netSuplus.net_surplus_distribution_amount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where YEAR(orders.orders_date) = :year ";
            $sql .= "and YEAR(orders.orders_date) = netSuplus.net_surplus_year ";
            $sql .= "and member.members_aid = orders.orders_member_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "group by orders.orders_member_id, ";
            $sql .= "YEAR(orders.orders_date) ";
            $sql .= "order by YEAR(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->orders_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active and approved members
    public function readAllApproved()
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
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
