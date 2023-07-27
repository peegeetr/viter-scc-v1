<?php
class Stocks
{
    public $stocks_aid;
    public $stocks_number;
    public $stocks_is_pending;
    public $stocks_product_id;
    public $stocks_or;
    public $stocks_suplier_price_history_id;
    public $stocks_remarks;
    public $stocks_date;
    public $stocks_quantity;
    public $stocks_barcode_id;
    public $stocks_created;
    public $stocks_datetime;


    public $connection;
    public $lastInsertedId;
    public $stocks_start;
    public $stocks_total;
    public $stocks_search;
    public $currentYear;

    public $tblStocks;
    public $tblOrders;
    public $tblSuppliersProducts;
    public $tblSuppliers;
    public $tblProductsHistory;
    public $tblBarcode;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblStocks = "sccv1_stocks";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblOrders = "sccv1_orders";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblProductsHistory = "sccv1_product_history";
        $this->tblBarcode = "sccv1_product_barcode";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblStocks} ";
            $sql .= "( stocks_number, ";
            $sql .= "stocks_is_pending, ";
            $sql .= "stocks_product_id, ";
            $sql .= "stocks_barcode_id, ";
            $sql .= "stocks_date, ";
            $sql .= "stocks_suplier_price_history_id, ";
            $sql .= "stocks_quantity, ";
            $sql .= "stocks_remarks, ";
            $sql .= "stocks_created, ";
            $sql .= "stocks_datetime ) values ( ";
            $sql .= ":stocks_number, ";
            $sql .= ":stocks_is_pending, ";
            $sql .= ":stocks_product_id, ";
            $sql .= ":stocks_barcode_id, ";
            $sql .= ":stocks_date, ";
            $sql .= ":stocks_suplier_price_history_id, ";
            $sql .= ":stocks_quantity, ";
            $sql .= ":stocks_remarks, ";
            $sql .= ":stocks_created, ";
            $sql .= ":stocks_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_number" => $this->stocks_number,
                "stocks_is_pending" => $this->stocks_is_pending,
                "stocks_product_id" => $this->stocks_product_id,
                "stocks_barcode_id" => $this->stocks_barcode_id,
                "stocks_date" => $this->stocks_date,
                "stocks_suplier_price_history_id" => $this->stocks_suplier_price_history_id,
                "stocks_quantity" => $this->stocks_quantity,
                "stocks_remarks" => $this->stocks_remarks,
                "stocks_created" => $this->stocks_created,
                "stocks_datetime" => $this->stocks_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // create
    public function createBarcode()
    {
        try {
            $sql = "insert into {$this->tblBarcode} ";
            $sql .= "( product_barcode_id, ";
            $sql .= "product_barcode_product_id, ";
            $sql .= "product_barcode_stocks_id, ";
            $sql .= "product_barcode_created, ";
            $sql .= "product_barcode_datetime ) values ( ";
            $sql .= ":product_barcode_id, ";
            $sql .= ":product_barcode_product_id, ";
            $sql .= ":product_barcode_stocks_id, ";
            $sql .= ":product_barcode_created, ";
            $sql .= ":product_barcode_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_barcode_id" => $this->stocks_barcode_id,
                "product_barcode_product_id" => $this->stocks_product_id,
                "product_barcode_stocks_id" => $this->lastInsertedId,
                "product_barcode_created" => $this->stocks_created,
                "product_barcode_datetime" => $this->stocks_datetime,
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
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_date, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "stocks.stocks_barcode_id, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
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
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_date, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "stocks.stocks_barcode_id, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
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
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_date, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "stocks.stocks_barcode_id, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and (stocks.stocks_number like :stocks_number ";
            $sql .= "or supplierProduct.suppliers_products_number like :suppliers_products_number ";
            $sql .= "or suppliers.suppliers_company_name like :suppliers_company_name ";
            $sql .= "or MONTHNAME(stocks.stocks_date) like :stocks_date ";
            $sql .= "or supplierProduct.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_number" => "%{$this->stocks_search}%",
                "suppliers_products_number" => "%{$this->stocks_search}%",
                "suppliers_products_name" => "%{$this->stocks_search}%",
                "suppliers_company_name" => "%{$this->stocks_search}%",
                "stocks_date" => "%{$this->stocks_search}%",
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
            $sql .= "where stocks_aid = :stocks_aid ";
            $sql .= "order by stocks_number desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_aid" => $this->stocks_aid,
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
            $sql .= "stocks_barcode_id = :stocks_barcode_id, ";
            $sql .= "stocks_datetime = :stocks_datetime ";
            $sql .= "where stocks_aid = :stocks_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_barcode_id" => $this->stocks_barcode_id,
                "stocks_datetime" => $this->stocks_datetime,
                "stocks_aid" => $this->stocks_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // update Barcode
    public function updateBarcode()
    {
        try {
            $sql = "update {$this->tblBarcode} set ";
            $sql .= "product_barcode_id = :product_barcode_id, ";
            $sql .= "product_barcode_datetime = :product_barcode_datetime ";
            $sql .= "where product_barcode_stocks_id = :product_barcode_stocks_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_barcode_id" => $this->stocks_barcode_id,
                "product_barcode_datetime" => $this->stocks_datetime,
                "product_barcode_stocks_id" => $this->stocks_aid,
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

    // delete
    public function deleteBarcode()
    {
        try {
            $sql = "delete from {$this->tblBarcode} ";
            $sql .= "where product_barcode_stocks_id = :product_barcode_stocks_id ";
            $sql .= "order by product_barcode_stocks_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_barcode_stocks_id" => $this->stocks_aid,
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


    // check barcode in barcode table
    public function checkBarcode()
    {
        try {
            $sql = "select product_barcode_id from ";
            $sql .= "{$this->tblBarcode} ";
            $sql .= "where product_barcode_id = :product_barcode_id ";
            $sql .= "order by product_barcode_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_barcode_id" => $this->stocks_barcode_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // check barcode in barcode table
    public function readAllBarcode()
    {
        try {
            $sql = "select product_barcode_stocks_id, ";
            $sql .= "product_barcode_id, ";
            $sql .= "product_barcode_aid ";
            $sql .= "from ";
            $sql .= "{$this->tblBarcode} ";
            $sql .= "where product_barcode_stocks_id = :product_barcode_stocks_id ";
            $sql .= "order by product_barcode_stocks_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_barcode_stocks_id" => $this->stocks_aid,
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
            $sql = "update {$this->tblStocks} set ";
            $sql .= "stocks_is_pending = :stocks_is_pending, ";
            $sql .= "stocks_or = :stocks_or, ";
            $sql .= "stocks_datetime = :stocks_datetime ";
            $sql .= "where stocks_aid = :stocks_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_is_pending" => $this->stocks_is_pending,
                "stocks_or" => $this->stocks_or,
                "stocks_datetime" => $this->stocks_datetime,
                "stocks_aid" => $this->stocks_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // Read by product id
    public function readAllGroupByProductNumber()
    {
        try {
            $sql = "select ";
            $sql .= "stocks_quantity, ";
            $sql .= "stocks_aid, ";
            $sql .= "stocks_product_id, ";
            $sql .= "sum(stocks_quantity) as stockQuantity, ";
            $sql .= "count(stocks_product_id) as count ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} ";
            $sql .= "where stocks_is_pending = '0' ";
            $sql .= "group by stocks_product_id ";
            $sql .= "order by stocks_number asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function checkAssociation()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblOrders} ";
            $sql .= "where orders_stocks_id = :orders_stocks_id ";
            $sql .= "order by orders_aid desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_stocks_id" => $this->stocks_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
