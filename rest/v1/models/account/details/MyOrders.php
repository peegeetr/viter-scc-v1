<?php
class MyOrders
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

    public $sales_number;
    public $sold_product;
    public $remaining_quantity;
    public $sales_receive_amount;
    public $sales_member_change;
    public $sales_or;
    public $sales_date;
    public $sales_discount;

    public $connection;
    public $lastInsertedId;
    public $orders_start;
    public $orders_from;
    public $orders_to;
    public $orders_total;
    public $orders_search;
    public $currentYear;
    public $tblOrders;
    public $tblSuppliersProducts;
    public $tblSuppliers;
    public $tblMembers;
    public $tblSales;
    public $tblStocks;
    public $tblProductsHistory;
    public $tblCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOrders = "sccv1_orders";
        $this->tblSales = "sccv1_sales";
        $this->tblMembers = "sccv1_members";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblStocks = "sccv1_stocks";
        $this->tblCategory = "sccv1_product_category";
        $this->tblProductsHistory = "sccv1_product_history";
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblOrders} set ";
            $sql .= "orders_is_draft = :orders_is_draft, ";
            $sql .= "orders_datetime = :orders_datetime ";
            $sql .= "where orders_aid = :orders_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_is_draft" => $this->orders_is_draft,
                "orders_datetime" => $this->orders_datetime,
                "orders_aid" => $this->orders_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // filter not approved members
    public function filterById()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
            $sql .= "orders.orders_is_draft, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "orders.orders_created, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and DATE(orders.orders_date) >= :orders_from ";
            $sql .= "and DATE(orders.orders_date) <= :orders_to ";
            $sql .= "order by orders.orders_is_draft desc, ";
            $sql .= "orders.orders_is_paid asc, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "orders_from" => $this->orders_from,
                "orders_to" => $this->orders_to,
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
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
            $sql .= "orders.orders_is_draft, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "orders.orders_created, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "order by orders.orders_is_draft desc, ";
            $sql .= "orders.orders_is_paid asc, ";
            $sql .= "orders.orders_date desc ";
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
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
            $sql .= "orders.orders_is_draft, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "orders.orders_created, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "order by orders.orders_is_draft desc, ";
            $sql .= "orders.orders_is_paid asc, ";
            $sql .= "orders.orders_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "start" => $this->orders_start - 1,
                "total" => $this->orders_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search not approved members 
    public function searchById()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
            $sql .= "orders.orders_is_draft, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "orders.orders_created, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_order_id, ";
            $sql .= "sales.sales_number, ";
            $sql .= "sales.sales_is_paid, ";
            $sql .= "sales.sales_receive_amount, ";
            $sql .= "sales.sales_or, ";
            $sql .= "sales.sales_date, ";
            $sql .= "sales.sales_discount, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and (MONTHNAME(orders.orders_date) like :orders_month_date ";
            $sql .= "or orders.orders_date like :orders_date ";
            $sql .= "or sales.sales_number like :sales_number ";
            $sql .= "or orders.orders_number like :orders_number ";
            $sql .= "or suppliersProducts.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by orders.orders_is_draft desc, ";
            $sql .= "orders.orders_is_paid asc, ";
            $sql .= "sales.sales_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "orders_month_date" => "%{$this->orders_search}%",
                "orders_date" => "%{$this->orders_search}%",
                "sales_number" => "%{$this->orders_search}%",
                "orders_number" => "%{$this->orders_search}%",
                "suppliers_products_name" => "%{$this->orders_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    }
 