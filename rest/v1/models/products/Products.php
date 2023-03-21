<?php
class Product
{
    public $product_aid;
    public $product_item_name;
    public $product_date;
    public $product_quantity;
    public $product_sold_quantity;
    public $product_price;
    public $product_created;
    public $product_datetime;

    public $connection;
    public $lastInsertedId;
    public $product_start;
    public $product_total;
    public $product_search;
    public $currentYear;
    public $tblProduct;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv1_product";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_item_name, ";
            $sql .= "product_date, ";
            $sql .= "product_quantity, ";
            $sql .= "product_price, ";
            $sql .= "product_created, ";
            $sql .= "product_datetime ) values ( ";
            $sql .= ":product_item_name, ";
            $sql .= ":product_date, ";
            $sql .= ":product_quantity, ";
            $sql .= ":product_price, ";
            $sql .= ":product_created, ";
            $sql .= ":product_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_item_name" => $this->product_item_name,
                "product_date" => $this->product_date,
                "product_quantity" => $this->product_quantity,
                "product_price" => $this->product_price,
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
            $sql = "select * from ";
            $sql .= "{$this->tblProduct} ";
            $sql .= "order by product_date desc, ";
            $sql .= "product_item_name asc ";
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
            $sql .= "{$this->tblProduct} ";
            $sql .= "order by product_date desc, ";
            $sql .= "product_item_name asc ";
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
            $sql = "select * from ";
            $sql .= "{$this->tblProduct} ";
            $sql .= "where product_item_name like :product_item_name ";
            $sql .= "or product_date like :product_date ";
            $sql .= "order by product_date desc, ";
            $sql .= "product_item_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_item_name" => "{$this->product_search}%",
                "product_date" => "{$this->product_search}%",
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
            $sql .= "order by product_sold_quantity desc ";
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
            $sql .= "product_item_name = :product_item_name, ";
            $sql .= "product_date = :product_date, ";
            $sql .= "product_quantity = :product_quantity, ";
            $sql .= "product_price = :product_price, ";
            $sql .= "product_datetime = :product_datetime ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_item_name" => $this->product_item_name,
                "product_date" => $this->product_date,
                "product_quantity" => $this->product_quantity,
                "product_price" => $this->product_price,
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
}