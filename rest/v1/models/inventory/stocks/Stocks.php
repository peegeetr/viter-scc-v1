<?php
class Stocks
{
    public $stocks_aid;
    public $stocks_number;
    public $stocks_is_active;
    public $stocks_product_id;
    public $stocks_quantity;
    public $stocks_price;
    public $stocks_created;
    public $stocks_datetime;

    public $connection;
    public $lastInsertedId;
    public $stocks_start;
    public $stocks_total;
    public $stocks_search;
    public $currentYear;
    public $tblStocks;
    public $tblSuppliersProducts;
    public $tblSuppliers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblStocks = "sccv1_stocks";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblSuppliers = "sccv1_suppliers";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblStocks} ";
            $sql .= "( stocks_number, ";
            $sql .= "stocks_is_active, ";
            $sql .= "stocks_product_id, ";
            $sql .= "stocks_quantity, ";
            $sql .= "stocks_created, ";
            $sql .= "stocks_datetime ) values ( ";
            $sql .= ":stocks_number, ";
            $sql .= ":stocks_is_active, ";
            $sql .= ":stocks_product_id, ";
            $sql .= ":stocks_quantity, ";
            $sql .= ":stocks_created, ";
            $sql .= ":stocks_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_number" => $this->stocks_number,
                "stocks_is_active" => $this->stocks_is_active,
                "stocks_product_id" => $this->stocks_product_id,
                "stocks_quantity" => $this->stocks_quantity,
                "stocks_created" => $this->stocks_created,
                "stocks_datetime" => $this->stocks_datetime,
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
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_is_active, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "order by stocks.stocks_number asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_is_active, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "order by stocks.stocks_number asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->stocks_start - 1,
                "total" => $this->stocks_total,
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
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_is_active, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and (stocks.stocks_number like :stocks_number ";
            $sql .= "or supplierProduct.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by stocks_number asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_number" => "{$this->stocks_search}%",
                "suppliers_products_name" => "{$this->stocks_search}%",
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
            $sql .= "{$this->tblStocks} ";
            $sql .= "where stocks_aid = :stocks_aid  ";
            $sql .= "order by stocks_number desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_aid " => $this->stocks_aid,
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
            $sql = "update {$this->tblStocks} set ";
            $sql .= "stocks_product_id = :stocks_product_id, ";
            $sql .= "stocks_quantity = :stocks_quantity, ";
            $sql .= "stocks_datetime = :stocks_datetime ";
            $sql .= "where stocks_aid = :stocks_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_product_id" => $this->stocks_product_id,
                "stocks_quantity" => $this->stocks_quantity,
                "stocks_datetime" => $this->stocks_datetime,
                "stocks_aid" => $this->stocks_aid,
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
            $sql = "delete from {$this->tblStocks} ";
            $sql .= "where stocks_aid = :stocks_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_aid" => $this->stocks_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all 
    public function readLastStockId()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblStocks} ";
            $sql .= "order by stocks_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblStocks} set ";
            $sql .= "stocks_is_active = :stocks_is_active, ";
            $sql .= "stocks_datetime = :stocks_datetime ";
            $sql .= "where stocks_aid = :stocks_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_is_active" => $this->stocks_is_active,
                "stocks_datetime" => $this->stocks_datetime,
                "stocks_aid" => $this->stocks_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
