<?php
class Patronage
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
    public $orders_from;
    public $orders_to;
    public $orders_total;
    public $orders_search;
    public $currentYear;
    public $tblOrders;
    public $tblSales;
    public $tblNetSurplus;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOrders = "sccv1_orders";
        $this->tblSales = "sccv1_sales";
        $this->tblNetSurplus = "sccv1_settings_netsurplus";
    }
    // read Member All Total Patronage
    public function readMemberAllTotalPatronage()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount, ";
            $sql .= "SUM(orders.orders_product_amount) as totalPatronage ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales ";
            $sql .= "where orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "order by YEAR(orders.orders_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all not draft
    public function readById()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "SUM(sales.sales_discount) as discount, ";
            $sql .= "SUM(orders.orders_product_amount) as total ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and YEAR(orders.orders_date) = netSuplus.net_surplus_year ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "order by YEAR(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimitById()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "SUM(sales.sales_discount) as discount, ";
            $sql .= "SUM(orders.orders_product_amount) as total ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and YEAR(orders.orders_date) = netSuplus.net_surplus_year ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "order by YEAR(orders.orders_date) desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->orders_start - 1,
                "total" => $this->orders_total,
                "orders_member_id" => $this->orders_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search 
    public function filter()
    {
        try {
            $sql = "select YEAR(orders.orders_date) as year, ";
            $sql .= "netSuplus.net_surplus_year, ";
            $sql .= "SUM(sales.sales_discount) as discount, ";
            $sql .= "SUM(orders.orders_product_amount) as total ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblNetSurplus} as netSuplus ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and YEAR(orders.orders_date) = :year ";
            $sql .= "and YEAR(orders.orders_date) = netSuplus.net_surplus_year ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_paid = '1' ";
            $sql .= "and orders.orders_is_draft = '0' ";
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
}