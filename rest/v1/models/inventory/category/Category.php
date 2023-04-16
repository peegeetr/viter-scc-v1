<?php
class Category
{
    public $product_category_aid;
    public $product_category_name;
    public $product_category_product_id;
    public $product_category_is_active; 
    public $product_category_created;
    public $product_category_datetime;

    public $connection;
    public $lastInsertedId;
    public $product_category_start;
    public $product_category_total;
    public $product_category_search;
    public $currentYear;
    public $tblCategory;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblCategory = "sccv1_product_category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCategory} ";
            $sql .= "( product_category_name, ";
            $sql .= "product_category_product_id, ";
            $sql .= "product_category_is_active, "; 
            $sql .= "product_category_created, ";
            $sql .= "product_category_datetime ) values ( ";
            $sql .= ":product_category_name, ";
            $sql .= ":product_category_product_id, ";
            $sql .= ":product_category_is_active, "; 
            $sql .= ":product_category_created, ";
            $sql .= ":product_category_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_name" => $this->product_category_name,
                "product_category_product_id" => $this->product_category_product_id,
                "product_category_is_active" => $this->product_category_is_active, 
                "product_category_created" => $this->product_category_created,
                "product_category_datetime" => $this->product_category_datetime,
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
            $sql .= "{$this->tblCategory} "; 
            $sql .= "order by product_category_is_active, ";
            $sql .= "product_category_name asc "; 
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
            $sql .= "{$this->tblCategory} "; 
            $sql .= "order by product_category_is_active, ";
            $sql .= "product_category_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_category_start - 1,
                "total" => $this->product_category_total,
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
            $sql .= "{$this->tblCategory} ";
            $sql .= "where product_category_name like :product_category_name "; 
            $sql .= "order by product_category_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_name" => "{$this->product_category_search}%", 
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
            $sql .= "{$this->tblCategory} ";
            $sql .= "where product_category_is_active = 1 ";
            $sql .= "and product_category_aid = :product_category_aid ";
            $sql .= "order by product_category_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_aid" => $this->product_category_aid,
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
            $sql = "update {$this->tblCategory} set ";
            $sql .= "product_category_name = :product_category_name, ";
            $sql .= "product_category_product_id = :product_category_product_id, "; 
            $sql .= "product_category_datetime = :product_category_datetime ";
            $sql .= "where product_category_aid  = :product_category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_name" => $this->product_category_name,
                "product_category_product_id" => $this->product_category_product_id, 
                "product_category_datetime" => $this->product_category_datetime,
                "product_category_aid" => $this->product_category_aid,
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
            $sql = "select product_category_name from {$this->tblCategory} ";
            $sql .= "where product_category_name = :product_category_name "; 
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_name" => "{$this->product_category_name}", 
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
            $sql = "update {$this->tblCategory} set ";
            $sql .= "product_category_is_active = :product_category_is_active, ";
            $sql .= "product_category_datetime = :product_category_datetime ";
            $sql .= "where product_category_aid = :product_category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_is_active" => $this->product_category_is_active,
                "product_category_datetime" => $this->product_category_datetime,
                "product_category_aid" => $this->product_category_aid,
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
            $sql = "delete from {$this->tblCategory} ";
            $sql .= "where product_category_aid = :product_category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_category_aid" => $this->product_category_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
