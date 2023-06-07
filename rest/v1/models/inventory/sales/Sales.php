<?php
class Sales
{
    public $sales_aid;
    public $sales_number;
    public $sales_is_paid;
    public $sales_member_id;
    public $sales_order_id;
    public $sales_receive_amount;
    public $sales_member_change;
    public $sales_date;
    public $sales_or;
    public $sales_discount;
    public $sales_created;
    public $sales_datetime;

    public $sold_product;
    public $remaining_quantity;

    public $connection;
    public $lastInsertedId;
    public $sales_start;
    public $sales_month;
    public $sales_year;
    public $sales_total;
    public $sales_search;
    public $currentYear;
    public $tblSales;
    public $tblOrders;
    public $tblMembers;
    public $tblSuppliersProducts;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSales = "sccv1_sales";
        $this->tblOrders = "sccv1_orders";
        $this->tblMembers = "sccv1_members";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSales} ";
            $sql .= "( sales_member_id, ";
            $sql .= "sales_order_id, ";
            $sql .= "sales_is_paid, ";
            $sql .= "sales_number, ";
            $sql .= "sales_receive_amount, ";
            $sql .= "sales_date, ";
            $sql .= "sales_or, ";
            $sql .= "sales_discount, ";
            $sql .= "sales_created, ";
            $sql .= "sales_datetime ) values ( ";
            $sql .= ":sales_member_id, ";
            $sql .= ":sales_order_id, ";
            $sql .= ":sales_is_paid, ";
            $sql .= ":sales_number, ";
            $sql .= ":sales_receive_amount, ";
            $sql .= ":sales_date, ";
            $sql .= ":sales_or, ";
            $sql .= ":sales_discount, ";
            $sql .= ":sales_created, ";
            $sql .= ":sales_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "sales_order_id" => $this->sales_order_id,
                "sales_is_paid" => $this->sales_is_paid,
                "sales_number" => $this->sales_number,
                "sales_receive_amount" => $this->sales_receive_amount,
                "sales_date" => $this->sales_date,
                "sales_or" => $this->sales_or,
                "sales_discount" => $this->sales_discount,
                "sales_created" => $this->sales_created,
                "sales_datetime" => $this->sales_datetime,
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
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_member_change, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_member_change, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->sales_start - 1,
                "total" => $this->sales_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search 
    public function search()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_member_change, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and (orders.orders_number like :orders_number ";
            $sql .= "or sales.sales_number like :sales_number ";
            $sql .= "or member.members_last_name like :members_last_name ";
            $sql .= "or member.members_first_name like :members_first_name ";
            $sql .= "or MONTHNAME(orders.orders_date) like :orders_month_date ";
            $sql .= "or MONTHNAME(sales.sales_date) like :sales_month_date ";
            $sql .= "or orders.orders_date like :orders_date ";
            $sql .= "or sales.sales_date like :sales_date ";
            $sql .= "or suppliersProducts.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "%{$this->sales_search}%",
                "orders_month_date" => "%{$this->sales_search}%",
                "sales_month_date" => "%{$this->sales_search}%",
                "orders_date" => "%{$this->sales_search}%",
                "sales_date" => "%{$this->sales_search}%",
                "orders_number" => "%{$this->sales_search}%",
                "members_last_name" => "%{$this->sales_search}%",
                "members_first_name" => "%{$this->sales_search}%",
                "sales_number" => "%{$this->sales_search}%",
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
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = :orders_member_id ";
            $sql .= "and sales.sales_member_id = :sales_member_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->sales_member_id,
                "sales_member_id" => $this->sales_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimitById()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = :orders_member_id ";
            $sql .= "and sales.sales_member_id = :sales_member_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->sales_member_id,
                "sales_member_id" => $this->sales_member_id,
                "start" => $this->sales_start - 1,
                "total" => $this->sales_total,
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
            $sql = "update {$this->tblSales} set ";
            $sql .= "sales_receive_amount = :sales_receive_amount, ";
            $sql .= "sales_member_change = :sales_member_change, ";
            $sql .= "sales_date = :sales_date, ";
            $sql .= "sales_or = :sales_or, ";
            $sql .= "sales_discount = :sales_discount, ";
            $sql .= "sales_is_paid = :sales_is_paid, ";
            $sql .= "sales_datetime = :sales_datetime ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_receive_amount" => $this->sales_receive_amount,
                "sales_member_change" => $this->sales_member_change,
                "sales_date" => $this->sales_date,
                "sales_or" => $this->sales_or,
                "sales_discount" => $this->sales_discount,
                "sales_is_paid" => $this->sales_is_paid,
                "sales_datetime" => $this->sales_datetime,
                "sales_aid" => $this->sales_aid,
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
            $sql = "delete from {$this->tblSales} ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_aid" => $this->sales_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active // paid
    public function active()
    {
        try {
            $sql = "update {$this->tblSales} set ";
            $sql .= "sales_is_paid = :sales_is_paid, ";
            $sql .= "sales_receive_amount =  '', ";
            $sql .= "sales_or = '', ";
            $sql .= "sales_date = '', ";
            $sql .= "sales_discount = '', ";
            $sql .= "sales_member_change = '', ";
            $sql .= "sales_datetime = :sales_datetime ";
            $sql .= "where sales_aid = :sales_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_is_paid" => $this->sales_is_paid,
                "sales_datetime" => $this->sales_datetime,
                "sales_aid" => $this->sales_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function isPaidOrder()
    {
        try {
            $sql = "update {$this->tblOrders} set ";
            $sql .= "orders_is_paid = :orders_is_paid, ";
            $sql .= "orders_datetime = :orders_datetime ";
            $sql .= "where orders_aid = :orders_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_is_paid" => $this->sales_is_paid,
                "orders_datetime" => $this->sales_datetime,
                "orders_aid" => $this->sales_order_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all 
    public function readLastSalesId()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblSales} ";
            $sql .= "order by sales_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readAllPendingPaidByMonth()
    {
        try {
            $sql = "select orders.orders_product_amount, ";
            $sql .= "orders.orders_is_paid, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = '0' ";
            $sql .= "and MONTHNAME(orders.orders_date) = :month ";
            $sql .= "and YEAR(orders.orders_date) = :year ";
            $sql .= "order by member.members_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->sales_month,
                "year" => $this->sales_year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readReportTopSellerByMonth()
    {
        try {
            $sql = "select sum(orders.orders_product_amount) as totalAmount, ";
            $sql .= "sum(sales.sales_discount) as totalDiscount, ";
            $sql .= "member.members_picture, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_is_paid = '1' ";
            $sql .= "and MONTHNAME(sales.sales_date) = :month ";
            $sql .= "and YEAR(sales.sales_date) = :year ";
            $sql .= "group by member.members_aid ";
            $sql .= "order by sum(orders.orders_product_amount) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->sales_month,
                "year" => $this->sales_year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readReportTopSellerByMonthLimit()
    {
        try {
            $sql = "select sum(orders.orders_product_amount) as totalAmount, ";
            $sql .= "sum(sales.sales_discount) as totalDiscount, ";
            $sql .= "member.members_picture, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_is_paid = '1' ";
            $sql .= "and MONTHNAME(sales.sales_date) = :month ";
            $sql .= "and YEAR(sales.sales_date) = :year ";
            $sql .= "group by member.members_aid ";
            $sql .= "order by sum(orders.orders_product_amount) desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->sales_month,
                "year" => $this->sales_year,
                "start" => $this->sales_start - 1,
                "total" => $this->sales_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
