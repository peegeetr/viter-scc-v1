<?php
class Orders
{
    public $orders_aid;
    public $orders_number;
    public $orders_member_id;
    public $orders_product_id;
    public $orders_product_quantity;
    public $orders_product_amount;
    public $orders_date;
    public $orders_or;
    public $orders_created;
    public $orders_datetime;

    public $sold_product;
    public $remaining_quantity;

    public $connection;
    public $lastInsertedId;
    public $orders_start;
    public $orders_total;
    public $orders_search;
    public $currentYear;
    public $tblOrders;
    public $tblSuppliersProducts;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOrders = "sccv1_orders";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblOrders} ";
            $sql .= "( orders_member_id, ";
            $sql .= "orders_product_id, ";
            $sql .= "orders_number, ";
            $sql .= "orders_product_quantity, ";
            $sql .= "orders_product_amount, ";
            $sql .= "orders_date, ";
            $sql .= "orders_or, ";
            $sql .= "orders_created, ";
            $sql .= "orders_datetime ) values ( ";
            $sql .= ":orders_member_id, ";
            $sql .= ":orders_product_id, ";
            $sql .= ":orders_number, ";
            $sql .= ":orders_product_quantity, ";
            $sql .= ":orders_product_amount, ";
            $sql .= ":orders_date, ";
            $sql .= ":orders_or, ";
            $sql .= ":orders_created, ";
            $sql .= ":orders_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "orders_product_id" => $this->orders_product_id,
                "orders_number" => $this->orders_number,
                "orders_product_quantity" => $this->orders_product_quantity,
                "orders_product_amount" => $this->orders_product_amount,
                "orders_date" => $this->orders_date,
                "orders_or" => $this->orders_or,
                "orders_created" => $this->orders_created,
                "orders_datetime" => $this->orders_datetime,
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
            $sql = "select suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_or, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid  ";
            $sql .= "order by orders.orders_date desc ";
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
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_or, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid  ";
            $sql .= "order by orders.orders_date desc ";
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
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_product_id, ";
            $sql .= "orders.orders_or, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_date, ";
            $sql .= "orders.orders_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid  ";
            $sql .= "and (orders.orders_number like :orders_number ";
            $sql .= "or MONTHNAME(orders.orders_date) like :orders_date ";
            $sql .= "or suppliersProducts.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "{$this->orders_search}%",
                "orders_date" => "{$this->orders_search}%",
                "orders_number" => "{$this->orders_search}%",
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
            $sql = "select * ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = orders.orders_product_id ";
            $sql .= "and (MONTHNAME(orders.orders_date) like :orders_date ";
            $sql .= "or suppliersProducts.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by orders.orders_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->orders_member_id,
                "orders_date" => "{$this->orders_search}%",
                "suppliers_products_name" => "{$this->orders_search}%",
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
            $sql = "select * ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = orders.orders_product_id ";
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

    public function readLimitById()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = orders.orders_product_id ";
            $sql .= "order by orders.orders_date desc ";
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
            $sql .= "orders_product_id = :orders_product_id, ";
            $sql .= "orders_product_amount = :orders_product_amount, ";
            $sql .= "orders_date = :orders_date, ";
            $sql .= "orders_or = :orders_or, ";
            $sql .= "orders_datetime = :orders_datetime ";
            $sql .= "where orders_aid = :orders_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_product_quantity" => $this->orders_product_quantity,
                "orders_product_id" => $this->orders_product_id,
                "orders_product_amount" => $this->orders_product_amount,
                "orders_date" => $this->orders_date,
                "orders_or" => $this->orders_or,
                "orders_datetime" => $this->orders_datetime,
                "orders_aid" => $this->orders_aid,
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
}
