<?php
class Product
{
    public $product_aid;
    public $product_number;
    public $product_supplier_id;
    public $product_supplier_product_id;
    public $product_scc_price;
    public $product_sold_quantity;
    public $product_market_price;
    public $product_created;
    public $product_datetime;

    public $connection;
    public $lastInsertedId;
    public $product_start;
    public $product_total;
    public $product_search;
    public $currentYear;
    public $tblProduct;
    public $tblSuppliersProducts;
    public $tblSuppliers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv1_product";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
        $this->tblSuppliers = "sccv1_suppliers";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_number, ";
            $sql .= "product_supplier_id, ";
            $sql .= "product_supplier_product_id, ";
            $sql .= "product_scc_price, ";
            $sql .= "product_market_price, ";
            $sql .= "product_created, ";
            $sql .= "product_datetime ) values ( ";
            $sql .= ":product_number, ";
            $sql .= ":product_supplier_id, ";
            $sql .= ":product_supplier_product_id, ";
            $sql .= ":product_scc_price, ";
            $sql .= ":product_market_price, ";
            $sql .= ":product_created, ";
            $sql .= ":product_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_number" => $this->product_number,
                "product_supplier_id" => $this->product_supplier_id,
                "product_supplier_product_id" => $this->product_supplier_product_id,
                "product_scc_price" => $this->product_scc_price,
                "product_market_price" => $this->product_market_price,
                "product_created" => $this->product_created,
                "product_datetime" => $this->product_datetime,
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
            $sql = "select product.product_number, ";
            $sql .= "product.product_aid, ";
            $sql .= "product.product_market_price, ";
            $sql .= "product.product_scc_price, ";
            $sql .= "product.product_supplier_id, ";
            $sql .= "product.product_supplier_product_id, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplier.suppliers_company_name ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct, ";
            $sql .= "{$this->tblSuppliers} as supplier ";
            $sql .= "where product.product_supplier_product_id = supplier.suppliers_aid ";
            $sql .= "and product.product_supplier_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and supplier.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "order by product.product_number asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select product.product_number, ";
            $sql .= "product.product_aid, ";
            $sql .= "product.product_market_price, ";
            $sql .= "product.product_scc_price, ";
            $sql .= "product.product_supplier_id, ";
            $sql .= "product.product_supplier_product_id, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplier.suppliers_company_name ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct, ";
            $sql .= "{$this->tblSuppliers} as supplier ";
            $sql .= "where product.product_supplier_product_id = supplier.suppliers_aid ";
            $sql .= "and product.product_supplier_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and supplier.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "order by product.product_number asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_start - 1,
                "total" => $this->product_total,
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
            $sql = "select product.product_number, ";
            $sql .= "product.product_aid, ";
            $sql .= "product.product_market_price, ";
            $sql .= "product.product_scc_price, ";
            $sql .= "product.product_supplier_id, ";
            $sql .= "product.product_supplier_product_id, ";
            $sql .= "supplierProduct.suppliers_products_aid, ";
            $sql .= "supplierProduct.suppliers_products_name, ";
            $sql .= "supplierProduct.suppliers_products_price, ";
            $sql .= "supplier.suppliers_company_name ";
            $sql .= "from ";
            $sql .= "{$this->tblProduct} as product, ";
            $sql .= "{$this->tblSuppliersProducts} as supplierProduct, ";
            $sql .= "{$this->tblSuppliers} as supplier ";
            $sql .= "where product.product_supplier_product_id = supplier.suppliers_aid ";
            $sql .= "and product.product_supplier_product_id = supplierProduct.suppliers_products_aid ";
            $sql .= "and supplier.suppliers_aid = supplierProduct.suppliers_products_suppliers_id ";
            $sql .= "and (product.product_number like :product_number ";
            $sql .= "or supplierProduct.suppliers_products_name like :suppliers_products_name) ";
            $sql .= "order by product_number asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_number" => "{$this->product_search}%",
                "suppliers_products_name" => "{$this->product_search}%",
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
            $sql .= "{$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid  ";
            $sql .= "order by product_number desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid " => $this->product_aid,
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
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_supplier_product_id = :product_supplier_product_id, ";
            $sql .= "product_supplier_id = :product_supplier_id, ";
            $sql .= "product_scc_price = :product_scc_price, ";
            $sql .= "product_market_price = :product_market_price, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_supplier_product_id" => $this->product_supplier_product_id,
                "product_scc_price" => $this->product_scc_price,
                "product_market_price" => $this->product_market_price,
                "product_supplier_id" => $this->product_supplier_id,
                "product_datetime" => $this->product_datetime,
                "product_aid" => $this->product_aid,
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
            $sql = "delete from {$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
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
            $sql .= "{$this->tblProduct} ";
            $sql .= "order by product_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
