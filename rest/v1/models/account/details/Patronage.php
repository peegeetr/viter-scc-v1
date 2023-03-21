<?php
class Patronage
{
    public $patronage_aid;
    public $patronage_member_id;
    public $patronage_product_id;
    public $patronage_product_quantity;
    public $patronage_product_amount;
    public $patronage_date;
    public $patronage_or;
    public $patronage_created;
    public $patronage_datetime;

    public $connection;
    public $lastInsertedId;
    public $patronage_start;
    public $total;
    public $patronage_search;
    public $currentYear;
    public $tblPatronage;
    public $tblProduct;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPatronage = "sccv1_members_patronage";
        $this->tblProduct = "sccv1_product";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPatronage} ";
            $sql .= "( patronage_member_id, ";
            $sql .= "patronage_product_id, ";
            $sql .= "patronage_product_quantity, ";
            $sql .= "patronage_product_amount, ";
            $sql .= "patronage_date, ";
            $sql .= "patronage_or, ";
            $sql .= "patronage_created, ";
            $sql .= "patronage_datetime ) values ( ";
            $sql .= ":patronage_member_id, ";
            $sql .= ":patronage_product_id, ";
            $sql .= ":patronage_product_quantity, ";
            $sql .= ":patronage_product_amount, ";
            $sql .= ":patronage_date, ";
            $sql .= ":patronage_or, ";
            $sql .= ":patronage_created, ";
            $sql .= ":patronage_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_member_id" => $this->patronage_member_id,
                "patronage_product_id" => $this->patronage_product_id,
                "patronage_product_quantity" => $this->patronage_product_quantity,
                "patronage_product_amount" => $this->patronage_product_amount,
                "patronage_date" => $this->patronage_date,
                "patronage_or" => $this->patronage_or,
                "patronage_created" => $this->patronage_created,
                "patronage_datetime" => $this->patronage_datetime,
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
            $sql .= "{$this->tblPatronage} ";
            $sql .= "order by patronage_date desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all pending
    public function readAllByProduct()
    {
        try {
            $sql = "select product_aid, ";
            $sql .= "product_item_name, ";
            $sql .= "product_quantity, ";
            $sql .= "product_sold_quantity, ";
            $sql .= "{$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->patronage_product_id,
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
            $sql .= "{$this->tblPatronage} ";
            $sql .= "where patronage_member_id = :patronage_member_id ";
            $sql .= "and patronage_product_id like :patronage_product_id ";
            $sql .= "or patronage_date like :patronage_date ";
            $sql .= "order by patronage_date desc, ";
            $sql .= "patronage_member_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_member_id" => $this->patronage_member_id,
                "patronage_date" => "{$this->patronage_search}%",
                "patronage_product_id" => "{$this->patronage_search}%",
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
            $sql = "select patronage.patronage_aid, ";
            $sql .= "patronage.patronage_member_id, ";
            $sql .= "patronage.patronage_product_id, ";
            $sql .= "patronage.patronage_product_quantity, ";
            $sql .= "patronage.patronage_product_amount, ";
            $sql .= "patronage.patronage_date, ";
            $sql .= "patronage.patronage_or, ";
            $sql .= "product.product_sold_quantity, ";
            $sql .= "product.product_item_name, ";
            $sql .= "product.product_price ";
            $sql .= "from {$this->tblPatronage} as patronage, ";
            $sql .= "{$this->tblProduct} as product ";
            $sql .= "where patronage.patronage_member_id = :patronage_member_id ";
            $sql .= "and patronage.patronage_product_id = product.product_aid  ";
            $sql .= "order by patronage_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_member_id" => $this->patronage_member_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimitById()
    {
        try {
            $sql = "select patronage.patronage_aid, ";
            $sql .= "patronage.patronage_member_id, ";
            $sql .= "patronage.patronage_product_id, ";
            $sql .= "patronage.patronage_product_quantity, ";
            $sql .= "patronage.patronage_product_amount, ";
            $sql .= "patronage.patronage_date, ";
            $sql .= "patronage.patronage_or, ";
            $sql .= "product.product_sold_quantity, ";
            $sql .= "product.product_item_name, ";
            $sql .= "product.product_price ";
            $sql .= "from {$this->tblPatronage} as patronage, ";
            $sql .= "{$this->tblProduct} as product ";
            $sql .= "where patronage.patronage_member_id = :patronage_member_id ";
            $sql .= "and patronage.patronage_product_id = product.product_aid  ";
            $sql .= "order by patronage_date desc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_member_id" => $this->patronage_member_id,
                "start" => $this->patronage_start - 1,
                "total" => $this->total,
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
            $sql = "update {$this->tblPatronage} set ";
            $sql .= "patronage_product_quantity = :patronage_product_quantity, ";
            $sql .= "patronage_product_id = :patronage_product_id, ";
            $sql .= "patronage_product_amount = :patronage_product_amount, ";
            $sql .= "patronage_date = :patronage_date, ";
            $sql .= "patronage_or = :patronage_or, ";
            $sql .= "patronage_datetime = :patronage_datetime ";
            $sql .= "where patronage_aid = :patronage_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_product_quantity" => $this->patronage_product_quantity,
                "patronage_product_id" => $this->patronage_product_id,
                "patronage_product_amount" => $this->patronage_product_amount,
                "patronage_date" => $this->patronage_date,
                "patronage_or" => $this->patronage_or,
                "patronage_datetime" => $this->patronage_datetime,
                "patronage_aid" => $this->patronage_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function updateQunatity($sold)
    {
        try {
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_sold_quantity = :product_sold_quantity, ";
            $sql .= "where patronage_aid = :patronage_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_sold_quantity" => $this->$sold,
                "patronage_aid" => $this->patronage_product_id,
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
            $sql = "delete from {$this->tblPatronage} ";
            $sql .= "where patronage_aid = :patronage_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "patronage_aid" => $this->patronage_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
