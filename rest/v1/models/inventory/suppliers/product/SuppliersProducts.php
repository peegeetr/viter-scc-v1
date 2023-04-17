<?php
class SuppliersProducts
{
    public $suppliers_products_aid;
    public $suppliers_products_name;
    public $suppliers_products_price;
    public $suppliers_products_id;
    public $suppliers_products_created;
    public $suppliers_products_datetime;

    public $connection;
    public $lastInsertedId;
    public $suppliers_products_start;
    public $suppliers_products_total;
    public $suppliers_products_search;
    public $currentYear;
    public $tblSuppliersProducts;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSuppliersProducts} ";
            $sql .= "( suppliers_products_name, ";
            $sql .= "suppliers_products_price, ";
            $sql .= "suppliers_products_id, ";
            $sql .= "suppliers_products_created, ";
            $sql .= "suppliers_products_datetime ) values ( ";
            $sql .= ":suppliers_products_name, ";
            $sql .= ":suppliers_products_price, ";
            $sql .= ":suppliers_products_id, ";
            $sql .= ":suppliers_products_created, ";
            $sql .= ":suppliers_products_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => $this->suppliers_products_name,
                "suppliers_products_price" => $this->suppliers_products_price,
                "suppliers_products_id" => $this->suppliers_products_id,
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
            $sql = "select * from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "order by suppliers_products_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "order by suppliers_products_name asc ";
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
            $sql = "select * from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_name like :suppliers_products_name ";
            $sql .= "order by suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => "{$this->suppliers_products_search}%",
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
            $sql .= "where suppliers_products_aid  = :suppliers_products_aid  ";
            $sql .= "order by suppliers_products_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid " => $this->suppliers_products_aid,
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
            $sql .= "suppliers_products_id = :suppliers_products_id, ";
            $sql .= "suppliers_products_datetime = :suppliers_products_datetime ";
            $sql .= "where suppliers_products_aid = :suppliers_products_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_name" => $this->suppliers_products_name,
                "suppliers_products_price" => $this->suppliers_products_price,
                "suppliers_products_id" => $this->suppliers_products_id,
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
            $sql .= "where suppliers_products_aid  = :suppliers_products_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_aid " => $this->suppliers_products_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
