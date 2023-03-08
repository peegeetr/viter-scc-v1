<?php
class Network
{
    public $network_aid;
    public $network_is_active;
    public $network_name;
    public $network_church;
    public $network_created;
    public $network_datetime;

    public $connection;
    public $lastInsertedId;
    public $network_start;
    public $network_total;
    public $network_search;
    public $tblNetwork;
    

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblNetwork = "ntpv1_settings_network";
       
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblNetwork} ";
            $sql .= "( network_name, ";
            $sql .= "network_church, ";
            $sql .= "network_is_active, ";
            $sql .= "network_created, ";
            $sql .= "network_datetime ) values ( ";
            $sql .= ":network_name, ";
            $sql .= ":network_church, ";
            $sql .= ":network_is_active, ";
            $sql .= ":network_created, ";
            $sql .= ":network_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_name" => $this->network_name,
                "network_church" => $this->network_church,
                "network_is_active" => $this->network_is_active,
                "network_created" => $this->network_created,
                "network_datetime" => $this->network_datetime,
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
            $sql = "select * from {$this->tblNetwork} ";
            $sql .= "order by network_is_active desc, ";
            $sql .= "network_name asc ";
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
            $sql = "select * from {$this->tblNetwork} ";
            $sql .= "where network_aid = :network_aid ";
            $sql .= "order by network_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_aid" => $this->network_aid,
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
            $sql = "update {$this->tblNetwork} set ";
            $sql .= "network_name = :network_name, ";
            $sql .= "network_church = :network_church, ";
            $sql .= "network_datetime = :network_datetime ";
            $sql .= "where network_aid  = :network_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_name" => $this->network_name,
                "network_church" => $this->network_church,
                "network_datetime" => $this->network_datetime,
                "network_aid" => $this->network_aid,
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
            $sql = "update {$this->tblNetwork} set ";
            $sql .= "network_is_active = :network_is_active, ";
            $sql .= "network_datetime = :network_datetime ";
            $sql .= "where network_aid = :network_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_is_active" => $this->network_is_active,
                "network_datetime" => $this->network_datetime,
                "network_aid" => $this->network_aid,
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
            $sql = "delete from {$this->tblNetwork} ";
            $sql .= "where network_aid = :network_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_aid" => $this->network_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

  public function checkName()
    {
        try {
            $sql = "select network_name from {$this->tblNetwork} ";
            $sql .= "where network_name = :network_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "network_name" => "{$this->network_name}",
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
            $sql .= "from {$this->tblNetwork} ";
            $sql .= "order by ";
            $sql .= "network_is_active desc, ";
            $sql .= "network_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->network_start - 1,
                "total" => $this->network_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * from {$this->tblNetwork} ";
            $sql .= "where network_name like :search ";
            $sql .= "order by network_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "{$this->network_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   
}
