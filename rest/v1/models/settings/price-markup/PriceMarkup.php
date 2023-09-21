<?php
class PriceMarkup
{
    public $price_markup_aid;
    public $price_markup_is_active;
    public $price_markup_retail;
    public $price_markup_member;
    public $price_markup_whole_sale;
    public $price_markup_created_at;
    public $price_markup_updated_at;

    public $connection;
    public $lastInsertedId;
    public $tblPriceMarkup;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblPriceMarkup = "sccv1_settings_price_markup";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblPriceMarkup} ";
            $sql .= "( price_markup_retail, ";
            $sql .= "price_markup_member, ";
            $sql .= "price_markup_whole_sale, ";
            $sql .= "price_markup_is_active, ";
            $sql .= "price_markup_created_at, ";
            $sql .= "price_markup_updated_at ) values ( ";
            $sql .= ":price_markup_retail, ";
            $sql .= ":price_markup_member, ";
            $sql .= ":price_markup_whole_sale, ";
            $sql .= ":price_markup_is_active, ";
            $sql .= ":price_markup_created_at, ";
            $sql .= ":price_markup_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "price_markup_retail" => $this->price_markup_retail,
                "price_markup_member" => $this->price_markup_member,
                "price_markup_whole_sale" => $this->price_markup_whole_sale,
                "price_markup_is_active" => $this->price_markup_is_active,
                "price_markup_created_at" => $this->price_markup_created_at,
                "price_markup_updated_at" => $this->price_markup_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "price_markup_aid, ";
            $sql .= "price_markup_is_active, ";
            $sql .= "price_markup_retail, ";
            $sql .= "price_markup_member, ";
            $sql .= "price_markup_whole_sale, ";
            $sql .= "price_markup_created_at ";
            $sql .= "from {$this->tblPriceMarkup} ";
            $sql .= "order by price_markup_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select ";
            $sql .= "price_markup_aid, ";
            $sql .= "price_markup_is_active, ";
            $sql .= "price_markup_retail, ";
            $sql .= "price_markup_member, ";
            $sql .= "price_markup_whole_sale, ";
            $sql .= "price_markup_created_at ";
            $sql .= "from {$this->tblPriceMarkup} ";
            $sql .= "where price_markup_aid = :price_markup_aid ";
            $sql .= "order by price_markup_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "price_markup_aid" => $this->price_markup_aid,
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
            $sql = "update {$this->tblPriceMarkup} set ";
            $sql .= "price_markup_retail = :price_markup_retail, ";
            $sql .= "price_markup_member = :price_markup_member, ";
            $sql .= "price_markup_whole_sale = :price_markup_whole_sale, ";
            $sql .= "price_markup_updated_at = :price_markup_updated_at ";
            $sql .= "where price_markup_aid  = :price_markup_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "price_markup_retail" => $this->price_markup_retail,
                "price_markup_member" => $this->price_markup_member,
                "price_markup_whole_sale" => $this->price_markup_whole_sale,
                "price_markup_updated_at" => $this->price_markup_updated_at,
                "price_markup_aid" => $this->price_markup_aid,
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
            $sql = "update {$this->tblPriceMarkup} set ";
            $sql .= "price_markup_is_active = :price_markup_is_active, ";
            $sql .= "price_markup_updated_at = :price_markup_updated_at ";
            $sql .= "where price_markup_aid = :price_markup_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "price_markup_is_active" => $this->price_markup_is_active,
                "price_markup_updated_at" => $this->price_markup_updated_at,
                "price_markup_aid" => $this->price_markup_aid,
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
            $sql = "delete from {$this->tblPriceMarkup} ";
            $sql .= "where price_markup_aid = :price_markup_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "price_markup_aid" => $this->price_markup_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // Active
    public function checkActive()
    {
        try {
            $sql = "select ";
            $sql .= "price_markup_is_active, ";
            $sql .= "price_markup_retail, ";
            $sql .= "price_markup_member, ";
            $sql .= "price_markup_whole_sale ";
            $sql .= "from {$this->tblPriceMarkup} ";
            $sql .= "where price_markup_is_active = 1 ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
