<?php
class ReportSales
{
    public $sales_aid;
    public $sales_number;
    public $sales_is_paid;
    public $sales_member_id;
    public $sales_order_id;
    public $sales_receive_amount;
    public $sales_member_change;
    public $sales_date;
    public $sales_or;
    public $sales_discount;
    public $sales_created;
    public $sales_datetime;

    public $sold_product;
    public $remaining_quantity;
    public $suppliers_products_suppliers_id;
    public $suppliers_products_category_id;
    public $orders_product_id;

    public $connection;
    public $lastInsertedId;
    public $start_date;
    public $end_date;
    public $sales_start;
    public $sales_month;
    public $sales_year;
    public $sales_total;
    public $sales_search;
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



    // REPORT FILTER SALES
    // REPORT FILTER SALES
    // if all member, all supplier , category by id, all product 
    public function readReportSalesFilterByCategory()
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
            $sql .= "where suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
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
    // if all member, supplier by id, by id category, all product
    public function readReportSalesFilterBySupplierCategory()
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
            $sql .= "where suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id  ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
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
    // if all member, supplier by id, all category, all product 
    public function readReportSalesFilterBySupplier()
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
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id  ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
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
    // if all member, supplier by id, all category, product by id  
    public function readReportSalesFilterBySupplierProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_aid = :suppliers_products_aid ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id  ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_aid" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if  all member, all supplier, category by id, product by id  
    public function readReportSalesFilterByCategoryProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_aid = :suppliers_products_aid ";
            $sql .= "and suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "suppliers_products_aid" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all member, supplier by id, category by id, product by id 
    public function readReportFilterSalesBySupplierCategoryProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_aid = :suppliers_products_aid ";
            $sql .= "and suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "suppliers_products_aid" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if all member, all supplier, all category, product by id 
    public function readReportSalesFilterByProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_aid = :suppliers_products_aid ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // REPORT FILTER SALES
    // if member by id, all supplier, all category, all product 
    public function readReportSalesFilterByMember()
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
            $sql .= "where member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if member by id, supplier by id, all category, all product
    public function readReportSalesFilterByMemberSupplier()
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
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
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
    // if member by id, supplier by id, category by id, all product
    public function readReportSalesFilterByMemberSupplierCategory()
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
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
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
    // if member by id, supplier by id, category by id, product by id
    public function readReportSalesFilterByMemberSupplierCategoryProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = :orders_product_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "orders_product_id" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if member by Id, supplier by Id, all category , product by Id
    public function readReportSalesFilterByMemberSupplierProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = :orders_product_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "orders_product_id" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if member by Id, all supplier, category by Id , product by Id
    public function readReportSalesFilterByMemberCategoryProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_aid = :orders_product_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
                "orders_product_id" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if member by Id, all supplier, all category , product by Id
    public function readReportSalesFilterByMemberProduct()
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
            $sql .= "where suppliersProducts.suppliers_products_aid = :orders_product_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
                "orders_product_id" => $this->orders_product_id,
                "start_date" => $this->start_date,
                "end_date" => $this->end_date,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // REPORT FILTER SALES
    // if member by Id, all supplier, category by Id , all product
    public function readReportSalesFilterByMemberCategory()
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
            $sql .= "where suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and member.members_aid = :sales_member_id ";
            $sql .= "and orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "sales_member_id" => $this->sales_member_id,
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
    // if all member, all supplier, all category, all product 
    public function readReportSalesFilterAll()
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
            $sql .= "where orders.orders_product_id = suppliersProducts.suppliers_products_aid ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and supplier.suppliers_aid = suppliersProducts.suppliers_products_suppliers_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and sales.sales_member_id = member.members_aid ";
            $sql .= "and orders.orders_is_draft = 0 ";
            $sql .= "and DATE(orders.orders_date) between ";
            $sql .= ":start_date and :end_date ";
            $sql .= "order by sales.sales_is_paid asc, ";
            $sql .= "DATE(orders.orders_date) desc ";
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


    // read all active and approved members
    public function readAllApproved()
    {
        try {
            $sql = "select ";
            $sql .= "members_aid, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name ";
            $sql .= "from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 1 ";
            $sql .= "and members_is_active = 1 ";
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readSupplierCategoryBySupplierId()
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
            $sql .= "and suppliersProducts.suppliers_products_category_id = :suppliers_products_category_id ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = supplier.suppliers_aid ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
                "suppliers_products_category_id" => $this->suppliers_products_category_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readSupplierCategoryByCategoryId()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
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

    // read by id
    public function readCategoryBySupplierId()
    {
        try {
            $sql = "select ";
            $sql .= "suppliersProducts.suppliers_products_aid, ";
            $sql .= "suppliersProducts.suppliers_products_number, ";
            $sql .= "suppliersProducts.suppliers_products_name, ";
            $sql .= "suppliersProducts.suppliers_products_price, ";
            $sql .= "suppliersProducts.suppliers_products_category_id, ";
            $sql .= "supplier.suppliers_company_name, ";
            $sql .= "category.product_category_aid, ";
            $sql .= "category.product_category_name ";
            $sql .= "from ";
            $sql .= "{$this->tblSuppliersProducts} as suppliersProducts, ";
            $sql .= "{$this->tblSuppliers} as supplier, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where suppliersProducts.suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "and category.product_category_aid = suppliersProducts.suppliers_products_category_id ";
            $sql .= "and suppliersProducts.suppliers_products_suppliers_id = supplier.suppliers_aid ";
            $sql .= "group by suppliersProducts.suppliers_products_category_id ";
            $sql .= "order by suppliersProducts.suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_products_suppliers_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
