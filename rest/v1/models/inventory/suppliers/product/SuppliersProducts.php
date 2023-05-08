<?php
class SuppliersProducts
{
    public $suppliers_products_aid;
    public $suppliers_products_name;
    public $suppliers_products_number;
    public $suppliers_products_price;
    public $suppliers_products_scc_price;
    public $suppliers_products_market_price;
    public $suppliers_products_category_id;
    public $suppliers_products_suppliers_id;
    public $suppliers_products_created;
    public $suppliers_products_datetime;

    public $connection;
    public $lastInsertedId;
    public $suppliers_products_start;
    public $suppliers_products_total;
    public $suppliers_products_search;
    public $currentYear;
    public $tblSuppliersProducts;
    public $tblSuppliers;
    public $tblCategory;
    public $tblStocks;
    public $tblOrders;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblCategory = "sccv1_product_category";
        $this->tblStocks = "sccv1_stocks";
        $this->tblOrders = "sccv1_orders";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSuppliersProducts} ";
            $sql .= "( suppliers_products_name, ";
            $sql .= "suppliers_products_number, ";
            $sql .= "suppliers_products_price, ";
            $sql .= "suppliers_products_category_id, ";
            $sql .= "suppliers_products_suppliers_id, ";
            $sql .= "suppliers_products_created, ";
            $sql .= "suppliers_products_datetime ) values ( ";
            $sql .= ":suppliers_products_name, ";
            $sql .= ":suppliers_products_number, ";
            $sql .= ":suppliers_products_price, ";
            $sql .= ":suppliers_products_category_id, ";
            $sql .= ":suppliers_products_suppliers_id, ";
            $sql .= ":suppliers_products_created, ";
            $sql .= ":suppliers_products_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => $this->suppliers_products_name,
                "suppliers_products_number" => $this->suppliers_products_number,
                "suppliers_products_price" => $this->suppliers_products_price,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_created" => $this->suppliers_products_created,
                "suppliers_products_datetime" => $this->suppliers_products_datetime,
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
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
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
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->suppliers_products_start - 1,
                "total" => $this->suppliers_products_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search not approved members
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and (suppliersProducts.suppliers_products_name like :suppliers_products_name ";
            $sql .= "or suppliersProducts.suppliers_products_number like :suppliers_products_number) ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "{$this->suppliers_products_search}%",
                "suppliers_products_number" => "{$this->suppliers_products_search}%",
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
            $sql = "select * from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $sql .= "order by suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid" => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read by id
    public function readBySupplierId()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "supplier.suppliers_company_name, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and supplier.suppliers_aid = :suppliers_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = supplier.suppliers_aid ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_aid" => $this->suppliers_products_suppliers_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read by id
    public function readBySupplierIdLimit()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "supplier.suppliers_company_name, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and supplier.suppliers_aid = :suppliers_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = supplier.suppliers_aid ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_aid" => $this->suppliers_products_suppliers_id,
                "start" => $this->suppliers_products_start - 1,
                "total" => $this->suppliers_products_total,
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
            $sql = "update {$this->tblSuppliersProducts} set ";
            $sql .= "suppliers_products_name = :suppliers_products_name, ";
            $sql .= "suppliers_products_price = :suppliers_products_price, ";
            $sql .= "suppliers_products_category_id = :suppliers_products_category_id, ";
            $sql .= "suppliers_products_suppliers_id = :suppliers_products_suppliers_id, ";
            $sql .= "suppliers_products_datetime = :suppliers_products_datetime ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => $this->suppliers_products_name,
                "suppliers_products_price" => $this->suppliers_products_price,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_datetime" => $this->suppliers_products_datetime,
                "suppliers_products_aid" => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateSccPrice()
    {
        try {
            $sql = "update {$this->tblSuppliersProducts} set ";
            $sql .= "suppliers_products_scc_price = :suppliers_products_scc_price, ";
            $sql .= "suppliers_products_market_price = :suppliers_products_market_price, ";
            $sql .= "suppliers_products_datetime = :suppliers_products_datetime ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_scc_price" => $this->suppliers_products_scc_price,
                "suppliers_products_market_price" => $this->suppliers_products_market_price,
                "suppliers_products_datetime" => $this->suppliers_products_datetime,
                "suppliers_products_aid" => $this->suppliers_products_aid,
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
            $sql = "select suppliers_products_name from {$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_name = :suppliers_products_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "{$this->suppliers_products_name}",
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
            $sql = "delete from {$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid" => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all 
    public function readLastProductId()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "order by suppliers_products_aid desc ";
            $query = $this->connection->query($sql);
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
                "stocks_product_id" => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all Association In Order
    public function checkAssociationInOrder()
    {
        try {
            $sql = "select orders_product_id from ";
            $sql .= "{$this->tblOrders} ";
            $sql .= "where orders_product_id = :orders_product_id ";
            $sql .= "order by orders_product_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_product_id" => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readByCategoryid()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "suppliersProducts.suppliers_products_market_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
