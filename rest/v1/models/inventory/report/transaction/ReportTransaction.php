<?php
class ReportTransaction
{
    public $orders_date;
    public $date_start;
    public $date_end;
    public $month;
    public $year;

    public $connection;
    public $lastInsertedId;
    public $orders_start;
    public $orders_total;
    public $orders_search;
    public $currentYear;

    public $tblSales;
    public $tblOrders;
    public $tblMembers;
    public $tblSuppliers;
    public $tblCategory;
    public $tblSuppliersProducts;
    public $tblProductCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSales = "sccv1_sales";
        $this->tblOrders = "sccv1_orders";
        $this->tblMembers = "sccv1_members";
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblCategory = "sccv1_product_category";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblProductCategory = "sccv1_product_category";
    }


    // read all order
    public function readAllOrderByDate()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by DATE(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read limit all order
    public function readAllOrderByDateLimit()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by orders.orders_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
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

    // read all order by product
    public function readAllOrderByProduct()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount, ";
            $sql .= "orders.orders_suplier_price as supplierPrice, ";
            $sql .= "orders.orders_product_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by orders.orders_product_id, ";
            $sql .= "DATE(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all order by product
    public function readReportOrderByMonth()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where MONTH(orders.orders_date) = :month ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by MONTH(orders.orders_date), ";
            $sql .= "YEAR(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->month,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all order by product
    public function readReportOrderByDate()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":date_start and :date_end ";
            $sql .= "group by DATE(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date_start" => $this->date_start,
                "date_end" => $this->date_end,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all order by product
    public function readReportOrderByAllYear()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where YEAR(orders.orders_date) = :year ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by YEAR(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all order by product
    public function readReportOrderByYear()
    {
        try {
            $sql = "select orders.orders_date, ";
            $sql .= "MONTH(orders.orders_date) as month, ";
            $sql .= "YEAR(orders.orders_date) as year, ";
            $sql .= "SUM(orders.orders_product_quantity) as totalQty, ";
            $sql .= "SUM(orders.orders_product_amount) as totalSales, ";
            $sql .= "SUM(orders.orders_suplier_price) as totalSupAmount, ";
            $sql .= "SUM(sales.sales_discount) as totalDiscount ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where YEAR(orders.orders_date) = :year ";
            $sql .= "and MONTH(orders.orders_date) = :month ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "group by YEAR(orders.orders_date), ";
            $sql .= "MONTH(orders.orders_date) ";
            $sql .= "order by sales.sales_is_paid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->year,
                "month" => $this->month,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
