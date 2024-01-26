<?php
class ReportTransactionView
{
    public $date;
    public $type;
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


    //  read all by month
    public function readSalesByMonth()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "category.product_category_name, ";
            $sql .= "supplier.suppliers_company_name, ";
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
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where MONTH(orders.orders_date) = :month ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->month,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //  read all by month and year
    public function readSalesByMonthAndYear()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "category.product_category_name, ";
            $sql .= "supplier.suppliers_company_name, ";
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
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where MONTH(orders.orders_date) = :month ";
            $sql .= "and YEAR(orders.orders_date) = :year ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "month" => $this->month,
                "year" => $this->year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //  read all by Date
    public function readSalesByDate()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "category.product_category_name, ";
            $sql .= "supplier.suppliers_company_name, ";
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
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where orders.orders_date = :date ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "date" => $this->date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //  read all by Date
    public function readSalesByYear()
    {
        try {
            $sql = "select suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_scc_price, ";
            $sql .= "orders.orders_aid, ";
            $sql .= "orders.orders_product_quantity, ";
            $sql .= "orders.orders_number, ";
            $sql .= "orders.orders_remarks, ";
            $sql .= "orders.orders_product_amount, ";
            $sql .= "orders.orders_product_srp, ";
            $sql .= "orders.orders_suplier_price, ";
            $sql .= "orders.orders_date, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "category.product_category_name, ";
            $sql .= "supplier.suppliers_company_name, ";
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
            $sql .= "{$this->tblCategory} as category, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts ";
            $sql .= "where YEAR(orders.orders_date) = :year ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "year" => $this->year,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
