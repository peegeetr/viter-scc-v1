<?php
class ReportStocks
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
    public $stocks_created;
    public $stocks_datetime;

    public $suppliers_products_category_id;
    public $suppliers_products_suppliers_id;

    public $connection;
    public $lastInsertedId;
    public $start_date;
    public $end_date;
    public $stocks_start;
    public $stocks_total;
    public $stocks_search;
    public $currentYear;
    public $tblStocks;
    public $tblSuppliersProducts;
    public $tblSuppliers;
    public $tblCategory;
    public $tblOrders;
    public $tblProductsHistory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblStocks = "sccv1_stocks";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblCategory = "sccv1_product_category";
        $this->tblOrders = "sccv1_orders";
        $this->tblProductsHistory = "sccv1_product_history";
    }

    // read all order
    public function readOrderGroupByProductId()
    {
        try {
            $sql = "select ";
            $sql .= "orders_aid, ";
            $sql .= "orders_product_id, ";
            $sql .= "orders_is_draft, ";
            $sql .= "orders_suplier_price, ";
            $sql .= "orders_product_srp, ";
            $sql .= "count(orders_product_id) as count, ";
            $sql .= "sum(orders_product_quantity) as orderQuantity, ";
            $sql .= "orders_product_quantity ";
            $sql .= "from {$this->tblOrders} ";
            $sql .= "where orders_is_draft = 0 ";
            $sql .= "group by orders_product_id, ";
            $sql .= "orders_suplier_price, ";
            $sql .= "orders_product_srp ";
            $sql .= "order by orders_is_paid, ";
            $sql .= "orders_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all supplier , category by id, all product 
    public function readReportStocksFilterByCategory()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where category.product_category_aid = :suppliers_products_category_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if supplier by id, category by id , all product 
    public function readReportStocksFilterBySupplierCategory()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where category.product_category_aid = :suppliers_products_category_id ";
            $sql .= "and supplierProduct.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if supplier by id,  all category, all product
    public function readReportStocksFilterBySupplier()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where supplierProduct.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if supplier by id, all category, product by id  
    public function readReportStocksFilterBySupplierProduct()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where supplierProduct.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and supplierProduct.suppliers_products_aid = :stocks_product_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "stocks_product_id" => $this->stocks_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all supplier, category by id, product by id  
    public function readReportStocksFilterByCategoryProduct()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where supplierProduct.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and supplierProduct.suppliers_products_aid = :stocks_product_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "stocks_product_id" => $this->stocks_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if supplier by id, category by id, product by id 
    public function readReportFilterStocksBySupplierCategoryProduct()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where supplierProduct.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and supplierProduct.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and supplierProduct.suppliers_products_aid = :stocks_product_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "stocks_product_id" => $this->stocks_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all supplier, all category, product by id 
    public function readReportStocksFilterByProduct()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where supplierProduct.suppliers_products_aid = :stocks_product_id ";
            $sql .= "and stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "stocks_product_id" => $this->stocks_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all supplier, all category, product by id 
    public function readReportStocksFilterAll()
    {
        try {
            $sql = "select stocks.stocks_number, ";
            $sql .= "stocks.stocks_quantity, ";
            $sql .= "stocks.stocks_or, ";
            $sql .= "stocks.stocks_aid, ";
            $sql .= "stocks.stocks_remarks, ";
            $sql .= "stocks.stocks_created, ";
            $sql .= "stocks.stocks_is_pending, ";
            $sql .= "stocks.stocks_product_id, ";
            $sql .= "count(stocks.stocks_product_id) as count, ";
            $sql .= "sum(stocks.stocks_quantity) as stocksQuntity, ";
            $sql .= "productHistory.product_history_aid, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name, ";
            $sql .= "suppliers.suppliers_company_name, ";
            $sql .= "suppliers.suppliers_aid, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_number, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplierProduct.suppliers_products_scc_price ";
            $sql .= "from ";
            $sql .= "{$this->tblStocks} as stocks, ";
            $sql .= "{$this->tblSuppliers} as suppliers, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblProductsHistory} as productHistory, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct ";
            $sql .= "where stocks.stocks_is_pending = 0 ";
            $sql .= "and category.product_category_aid = supplierProduct.suppliers_products_category_id ";
            $sql .= "and stocks.stocks_suplier_price_history_id = productHistory.product_history_aid ";
            $sql .= "and stocks.stocks_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and suppliers.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and DATE(stocks.stocks_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "group by stocks.stocks_product_id, ";
            $sql .= "productHistory.product_history_price, ";
            $sql .= "productHistory.product_history_scc_price ";
            $sql .= "order by stocks.stocks_is_pending desc, ";
            $sql .= "stocks.stocks_created desc, ";
            $sql .= "supplierProduct.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
