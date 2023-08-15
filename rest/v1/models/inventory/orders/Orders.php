<?php
class Orders
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

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblOrders} ";
            $sql .= "( orders_member_id, ";
            $sql .= "orders_product_id, ";
            $sql .= "orders_is_paid, ";
            $sql .= "orders_is_draft, ";
            $sql .= "orders_number, ";
            $sql .= "orders_product_quantity, ";
            $sql .= "orders_product_amount, ";
            $sql .= "orders_product_srp, ";
            $sql .= "orders_date, ";
            $sql .= "orders_stocks_id, ";
            $sql .= "orders_suplier_price, ";
            $sql .= "orders_remarks, ";
            $sql .= "orders_created, ";
            $sql .= "orders_datetime ) values ( ";
            $sql .= ":orders_member_id, ";
            $sql .= ":orders_product_id, ";
            $sql .= ":orders_is_paid, ";
            $sql .= ":orders_is_draft, ";
            $sql .= ":orders_number, ";
            $sql .= ":orders_product_quantity, ";
            $sql .= ":orders_product_amount, ";
            $sql .= ":orders_product_srp, ";
            $sql .= ":orders_date, ";
            $sql .= ":orders_stocks_id, ";
            $sql .= ":orders_suplier_price, ";
            $sql .= ":orders_remarks, ";
            $sql .= ":orders_created, ";
            $sql .= ":orders_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "orders_product_id" => $this->orders_product_id,
                "orders_is_paid" => $this->orders_is_paid,
                "orders_is_draft" => $this->orders_is_draft,
                "orders_number" => $this->orders_number,
                "orders_product_quantity" => $this->orders_product_quantity,
                "orders_product_amount" => $this->orders_product_amount,
                "orders_product_srp" => $this->orders_product_srp,
                "orders_suplier_price" => $this->orders_suplier_price,
                "orders_date" => $this->orders_date,
                "orders_stocks_id" => $this->orders_stocks_id,
                "orders_remarks" => $this->orders_remarks,
                "orders_created" => $this->orders_created,
                "orders_datetime" => $this->orders_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create Sales
    public function createSales()
    {
        try {
            $sql = "insert into {$this->tblSales} ";
            $sql .= "( sales_member_id, ";
            $sql .= "sales_order_id, ";
            $sql .= "sales_is_paid, ";
            $sql .= "sales_number, ";
            $sql .= "sales_receive_amount, ";
            $sql .= "sales_member_change, ";
            $sql .= "sales_or, ";
            $sql .= "sales_date, ";
            $sql .= "sales_discount, ";
            $sql .= "sales_created, ";
            $sql .= "sales_datetime ) values ( ";
            $sql .= ":sales_member_id, ";
            $sql .= ":sales_order_id, ";
            $sql .= ":sales_is_paid, ";
            $sql .= ":sales_number, ";
            $sql .= ":sales_receive_amount, ";
            $sql .= ":sales_member_change, ";
            $sql .= ":sales_or, ";
            $sql .= ":sales_date, ";
            $sql .= ":sales_discount, ";
            $sql .= ":sales_created, ";
            $sql .= ":sales_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->orders_member_id,
                "sales_order_id" => $this->lastInsertedId,
                "sales_is_paid" => $this->orders_is_paid,
                "sales_number" => $this->sales_number,
                "sales_receive_amount" => $this->sales_receive_amount,
                "sales_member_change" => $this->sales_member_change,
                "sales_or" => $this->sales_or,
                "sales_date" => $this->sales_date,
                "sales_discount" => $this->sales_discount,
                "sales_created" => $this->orders_created,
                "sales_datetime" => $this->orders_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all not draft
    public function readAll()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
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
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "stock.stocks_aid, ";
            $sql .= "stock.stocks_barcode_id, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_discount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblStocks} as stock, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and stock.stocks_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and productHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and productHistory.product_history_scc_price = suppliersProducts.suppliers_products_scc_price ";
            $sql .= "and stock.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
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
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "stock.stocks_aid, ";
            $sql .= "stock.stocks_barcode_id, ";
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_discount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblStocks} as stock, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and stock.stocks_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and productHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and productHistory.product_history_scc_price = suppliersProducts.suppliers_products_scc_price ";
            $sql .= "and stock.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->orders_start - 1,
                "total" => $this->orders_total,
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
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_is_paid, ";
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
            $sql .= "sales.sales_aid, ";
            $sql .= "sales.sales_discount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and (orders.orders_number like :orders_number ";
            $sql .= "or MONTHNAME(orders.orders_date) like :orders_month_date ";
            $sql .= "or orders.orders_date like :orders_date ";
            $sql .= "or concat(member.members_last_name, ', ', member.members_first_name) like :name ";
            $sql .= "or member.members_last_name like :members_last_name ";
            $sql .= "or member.members_first_name like :members_first_name ";
            $sql .= "or suppliersProducts.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "%{$this->orders_search}%",
                "orders_month_date" => "%{$this->orders_search}%",
                "orders_date" => "%{$this->orders_search}%",
                "orders_number" => "%{$this->orders_search}%",
                "members_last_name" => "%{$this->orders_search}%",
                "members_first_name" => "%{$this->orders_search}%",
                "name" => "%{$this->orders_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read all pending
    public function readAllByProduct()
    {
        try {
            $sql = "select suppliers_products_aid, ";
            $sql .= "suppliers_products_name, ";
            $sql .= "suppliers_products_scc_price, ";
            $sql .= "suppliers_products_number from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid" => $this->orders_product_id,
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
            $sql .= "and DATE(sales.sales_date) >= :orders_from ";
            $sql .= "and DATE(sales.sales_date) <= :orders_to ";
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
    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblOrders} set ";
            $sql .= "orders_product_quantity = :orders_product_quantity, ";
            $sql .= "orders_member_id = :orders_member_id, ";
            $sql .= "orders_product_amount = :orders_product_amount, ";
            $sql .= "orders_date = :orders_date, ";
            $sql .= "orders_remarks = :orders_remarks, ";
            $sql .= "orders_is_paid = :orders_is_paid, ";
            $sql .= "orders_datetime = :orders_datetime ";
            $sql .= "where orders_aid = :orders_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_product_quantity" => $this->orders_product_quantity,
                "orders_member_id" => $this->orders_member_id,
                "orders_product_amount" => $this->orders_product_amount,
                "orders_date" => $this->orders_date,
                "orders_remarks" => $this->orders_remarks,
                "orders_is_paid" => $this->orders_is_paid,
                "orders_datetime" => $this->orders_datetime,
                "orders_aid" => $this->orders_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // update
    public function updateSales()
    {
        try {
            $sql = "update {$this->tblSales} set ";
            $sql .= "sales_member_id = :sales_member_id, ";
            $sql .= "sales_datetime = :sales_datetime ";
            $sql .= "where sales_order_id = :sales_order_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->orders_member_id,
                "sales_order_id" => $this->orders_aid,
                "sales_datetime" => $this->orders_datetime,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all 
    public function readLastOrderId()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblOrders} ";
            $sql .= "order by orders_aid desc ";
            $query = $this->connection->query($sql);
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

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblOrders} ";
            $sql .= "where orders_aid = :orders_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_aid" => $this->orders_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function deleteSales()
    {
        try {
            $sql = "delete from {$this->tblSales} ";
            $sql .= "where sales_order_id = :sales_order_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_order_id" => $this->orders_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readAllGroupByProductNumber()
    {
        try {
            $sql = "select ";
            $sql .= "orders_aid, ";
            $sql .= "orders_product_id, ";
            $sql .= "orders_is_draft, ";
            $sql .= "count(orders_product_id) as count, ";
            $sql .= "sum(orders_product_quantity) as orderQuantity, ";
            $sql .= "orders_product_quantity ";
            $sql .= "from {$this->tblOrders} ";
            $sql .= "where orders_is_draft = 0 ";
            $sql .= "group by orders_product_id ";
            $sql .= "order by orders_is_paid, ";
            $sql .= "orders_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readAllInvoice()
    {
        try {
            $sql = "select member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_email, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "count(orders.orders_number) as countProduct ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_paid = '0' ";
            $sql .= "group by orders.orders_member_id ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readAllInvoiceLimit()
    {
        try {
            $sql = "select member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_email, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "count(orders.orders_number) as countProduct ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid  ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_paid = '0' ";
            $sql .= "group by orders.orders_member_id ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->orders_start - 1,
                "total" => $this->orders_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search 
    public function searchAllMemberInvoice()
    {
        try {
            $sql = "select member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_email, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_member_id, ";
            $sql .= "count(orders.orders_number) as countProduct ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid  ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_paid = '0' ";
            $sql .= "and (member.members_last_name like :members_last_name ";
            $sql .= "or member.members_first_name like :members_first_name) ";
            $sql .= "group by orders.orders_member_id ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_last_name" => "%{$this->orders_search}%",
                "members_first_name" => "%{$this->orders_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending order by member id
    public function readAllPendingByMemberId()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_date, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_is_paid = '0' ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "order by orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
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

    // read all pending
    public function readAllPendingOrder()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_number, ";
            $sql .= "sales.sales_number ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_paid = 0 ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "order by orders.orders_is_paid, ";
            $sql .= "orders.orders_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // check Search Product 
    public function searchProduct()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "supplier.suppliers_aid, ";
            $sql .= "supplier.suppliers_company_name, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "stock.stocks_aid, ";
            $sql .= "stock.stocks_barcode_id, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblStocks} as stock, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = supplier.suppliers_aid ";
            $sql .= "and stock.stocks_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and stock.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and (suppliersProducts.suppliers_products_name like :suppliers_products_name ";
            $sql .= "or stock.stocks_barcode_id like :stocks_barcode_id ";
            $sql .= "or category.product_category_name like :product_category_name) ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "%{$this->orders_search}%",
                "product_category_name" => "{$this->orders_search}%",
                "stocks_barcode_id" => $this->orders_search,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
