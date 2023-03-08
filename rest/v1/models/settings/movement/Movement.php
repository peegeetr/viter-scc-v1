<?php
class Movement
{
    public $movement_aid;
    public $movement_is_active;
    public $movement_name;
    public $movement_church;
    public $movement_created;
    public $movement_datetime;

    public $connection;
    public $lastInsertedId;
    public $movement_start;
    public $movement_total;
    public $movement_search;
    public $tblMovement;
    

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblMovement = "ntpv1_settings_movement";
       
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblMovement} ";
            $sql .= "( movement_name, ";
            $sql .= "movement_church, ";
            $sql .= "movement_is_active, ";
            $sql .= "movement_created, ";
            $sql .= "movement_datetime ) values ( ";
            $sql .= ":movement_name, ";
            $sql .= ":movement_church, ";
            $sql .= ":movement_is_active, ";
            $sql .= ":movement_created, ";
            $sql .= ":movement_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_name" => $this->movement_name,
                "movement_church" => $this->movement_church,
                "movement_is_active" => $this->movement_is_active,
                "movement_created" => $this->movement_created,
                "movement_datetime" => $this->movement_datetime,
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
            $sql = "select * from {$this->tblMovement} ";
            $sql .= "order by movement_is_active desc, ";
            $sql .= "movement_name asc ";
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
            $sql = "select * from {$this->tblMovement} ";
            $sql .= "where movement_aid = :movement_aid ";
            $sql .= "order by movement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_aid" => $this->movement_aid,
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
            $sql = "update {$this->tblMovement} set ";
            $sql .= "movement_name = :movement_name, ";
            $sql .= "movement_church = :movement_church, ";
            $sql .= "movement_datetime = :movement_datetime ";
            $sql .= "where movement_aid  = :movement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_name" => $this->movement_name,
                "movement_church" => $this->movement_church,
                "movement_datetime" => $this->movement_datetime,
                "movement_aid" => $this->movement_aid,
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
            $sql = "update {$this->tblMovement} set ";
            $sql .= "movement_is_active = :movement_is_active, ";
            $sql .= "movement_datetime = :movement_datetime ";
            $sql .= "where movement_aid = :movement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_is_active" => $this->movement_is_active,
                "movement_datetime" => $this->movement_datetime,
                "movement_aid" => $this->movement_aid,
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
            $sql = "delete from {$this->tblMovement} ";
            $sql .= "where movement_aid = :movement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_aid" => $this->movement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

  public function checkName()
    {
        try {
            $sql = "select movement_name from {$this->tblMovement} ";
            $sql .= "where movement_name = :movement_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "movement_name" => "{$this->movement_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }



    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblMovement} ";
            $sql .= "order by ";
            $sql .= "movement_is_active desc, ";
            $sql .= "movement_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->movement_start - 1,
                "total" => $this->movement_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * from {$this->tblMovement} ";
            $sql .= "where movement_name like :search ";
            $sql .= "order by movement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->movement_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   
}
