<?php
class ProductsHistory
{
    public $product_history_aid;
    public $product_history_product_id;
    public $product_history_is_active;
    public $product_history_price;
    public $product_history_scc_price;
    public $product_history_date;
    public $product_history_created;
    public $product_history_datetime;

    public $connection;
    public $lastInsertedId;
    public $product_history_start;
    public $product_history_total;
    public $product_history_search;
    public $currentYear;
    public $tblProductsHistory;
    public $tblSuppliers;
    public $tblOrders;
    public $tblStocks;
    public $tblSuppliersProducts;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProductsHistory = "sccv1_product_history";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblOrders = "sccv1_orders";
        $this->tblStocks = "sccv1_stocks";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProductsHistory} ";
            $sql .= "( product_history_product_id, ";
            $sql .= "product_history_is_active, ";
            $sql .= "product_history_date, ";
            $sql .= "product_history_price, ";
            $sql .= "product_history_scc_price, ";
            $sql .= "product_history_created, ";
            $sql .= "product_history_datetime ) values ( ";
            $sql .= ":product_history_product_id, ";
            $sql .= ":product_history_is_active, ";
            $sql .= ":product_history_date, ";
            $sql .= ":product_history_price, ";
            $sql .= ":product_history_scc_price, ";
            $sql .= ":product_history_created, ";
            $sql .= ":product_history_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_product_id" => $this->product_history_product_id,
                "product_history_is_active" => $this->product_history_is_active,
                "product_history_date" => $this->product_history_date,
                "product_history_price" => $this->product_history_price,
                "product_history_scc_price" => $this->product_history_scc_price,
                "product_history_created" => $this->product_history_created,
                "product_history_datetime" => $this->product_history_datetime,
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
            $sql = "select ";
            $sql .= "suppliersProducts.product_history_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.product_history_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "productsHistory.product_history_aid, ";
            $sql .= "productsHistory.product_history_product_id, ";
            $sql .= "productsHistory.product_history_scc_price, ";
            $sql .= "productsHistory.product_history_price ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} as productsHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where productsHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "order by suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.product_history_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.product_history_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "productsHistory.product_history_aid, ";
            $sql .= "productsHistory.product_history_product_id, ";
            $sql .= "productsHistory.product_history_scc_price, ";
            $sql .= "productsHistory.product_history_price ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} as productsHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where productsHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "order by suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_history_start - 1,
                "total" => $this->product_history_total,
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
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "productsHistory.product_history_aid, ";
            $sql .= "productsHistory.product_history_product_id, ";
            $sql .= "productsHistory.product_history_is_active, ";
            $sql .= "productsHistory.product_history_price, ";
            $sql .= "productsHistory.product_history_scc_price, ";
            $sql .= "productsHistory.product_history_date ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} as productsHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where productsHistory.product_history_product_id = :product_history_product_id ";
            $sql .= "and productsHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "order by productsHistory.product_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read by id
    public function readByIdLimit()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "productsHistory.product_history_aid, ";
            $sql .= "productsHistory.product_history_product_id, ";
            $sql .= "productsHistory.product_history_is_active, ";
            $sql .= "productsHistory.product_history_price, ";
            $sql .= "productsHistory.product_history_scc_price, ";
            $sql .= "productsHistory.product_history_date ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} as productsHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where productsHistory.product_history_product_id = :product_history_product_id ";
            $sql .= "and productsHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "order by productsHistory.product_history_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_product_id" => $this->product_history_product_id,
                "start" => $this->product_history_start - 1,
                "total" => $this->product_history_total,
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
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "productsHistory.product_history_aid, ";
            $sql .= "productsHistory.product_history_product_id, ";
            $sql .= "productsHistory.product_history_is_active, ";
            $sql .= "productsHistory.product_history_price, ";
            $sql .= "productsHistory.product_history_scc_price, ";
            $sql .= "productsHistory.product_history_date ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} as productsHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where productsHistory.product_history_product_id = :product_history_product_id ";
            $sql .= "and productsHistory.product_history_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and (productsHistory.product_history_price like :product_history_price ";
            $sql .= "or productsHistory.product_history_date like :product_history_date ";
            $sql .= "or MONTHNAME(productsHistory.product_history_date) like :month) ";
            $sql .= "order by productsHistory.product_history_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_product_id" => $this->product_history_product_id,
                "product_history_price" => "%{$this->product_history_search}%",
                "month" => "%{$this->product_history_search}%",
                "product_history_date" => "%{$this->product_history_search}%",
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
            $sql = "update {$this->tblProductsHistory} set ";
            $sql .= "product_history_date = :product_history_date, ";
            $sql .= "product_history_price = :product_history_price, ";
            $sql .= "product_history_scc_price = :product_history_scc_price, ";
            $sql .= "product_history_datetime = :product_history_datetime ";
            $sql .= "where product_history_aid = :product_history_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_date" => $this->product_history_date,
                "product_history_price" => $this->product_history_price,
                "product_history_scc_price" => $this->product_history_scc_price,
                "product_history_datetime" => $this->product_history_datetime,
                "product_history_aid" => $this->product_history_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateSupplierPrice()
    {
        try {
            $sql = "update {$this->tblSuppliersProducts} set ";
            $sql .= "suppliers_products_price = :suppliers_products_price, ";
            $sql .= "suppliers_products_scc_price = :suppliers_products_scc_price, ";
            $sql .= "suppliers_products_datetime = :suppliers_products_datetime ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_price" => $this->product_history_price,
                "suppliers_products_scc_price" => $this->product_history_scc_price,
                "suppliers_products_datetime" => $this->product_history_datetime,
                "suppliers_products_aid" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all Association In Order
    public function isAssociationInOrderPending()
    {
        try {
            $sql = "select orders_product_id from ";
            $sql .= "{$this->tblOrders} ";
            $sql .= "where orders_product_id = :orders_product_id ";
            $sql .= "and orders_is_paid = 0 ";
            $sql .= "and orders_is_draft = 0 ";
            $sql .= "order by orders_product_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all Association In Order
    public function isAssociationInOrder()
    {
        try {
            $sql = "select orders_product_id from ";
            $sql .= "{$this->tblOrders} ";
            $sql .= "where orders_product_id = :orders_product_id ";
            $sql .= "order by orders_product_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all in stock
    public function checkAssociation()
    {
        try {
            $sql = "select stocks_product_id from ";
            $sql .= "{$this->tblStocks} ";
            $sql .= "where stocks_product_id = :stocks_product_id ";
            $sql .= "order by stocks_product_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select product_history_date from {$this->tblProductsHistory} ";
            $sql .= "where product_history_date = :product_history_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_date" => "{$this->product_history_date}",
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
            $sql = "update {$this->tblProductsHistory} set ";
            $sql .= "product_history_is_active = :product_history_is_active, ";
            $sql .= "product_history_datetime = :product_history_datetime ";
            $sql .= "where product_history_aid = :product_history_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_is_active" => $this->product_history_is_active,
                "product_history_datetime" => $this->product_history_datetime,
                "product_history_aid" => $this->product_history_aid,
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
            $sql = "delete from {$this->tblProductsHistory} ";
            $sql .= "where product_history_aid = :product_history_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_aid" => $this->product_history_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active edit validation
    public function readAllActiveNotById()
    {
        try {
            $sql = "select product_history_price, ";
            $sql .= "product_history_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} ";
            $sql .= "where product_history_is_active = '1' ";
            $sql .= "and product_history_product_id = :product_history_product_id ";
            $sql .= "and product_history_aid != :product_history_aid ";
            $sql .= "order by product_history_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_aid" => $this->product_history_aid,
                "product_history_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all active by  member id
    public function readAllActiveById()
    {
        try {
            $sql = "select product_history_price, ";
            $sql .= "product_history_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} ";
            $sql .= "where product_history_is_active = '1' ";
            $sql .= "and product_history_product_id = :product_history_product_id ";
            $sql .= "order by product_history_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_product_id" => $this->product_history_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read product history exist
    public function productHistoryExist()
    {
        try {
            $sql = "select product_history_price, ";
            $sql .= "product_history_scc_price, ";
            $sql .= "product_history_is_active ";
            $sql .= "from ";
            $sql .= "{$this->tblProductsHistory} ";
            $sql .= "where DATE(product_history_date) = DATE(:product_history_date) ";
            $sql .= "and product_history_price = :product_history_price ";
            $sql .= "and product_history_scc_price = :product_history_scc_price ";
            $sql .= "order by product_history_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_history_date" => $this->product_history_date,
                "product_history_price" => $this->product_history_price,
                "product_history_scc_price" => $this->product_history_scc_price,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
