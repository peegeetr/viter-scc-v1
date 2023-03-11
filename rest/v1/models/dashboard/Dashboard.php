<?php
class Announcement
{
    public $announcement_aid;
    public $announcement_name;
    public $announcement_description;
    public $announcement_is_active;
    public $announcement_date;
    public $announcement_created;
    public $announcement_datetime; 

    public $connection;
    public $lastInsertedId; 
    public $announcement_start;
    public $announcement_total;
    public $announcement_search;
    public $currentYear;
    public $tblAnnouncement; 

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAnnouncement = "sccv1_announcement"; 
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblAnnouncement} ";
            $sql .= "( announcement_name, ";
            $sql .= "announcement_description, ";
            $sql .= "announcement_is_active, ";
            $sql .= "announcement_date, "; 
            $sql .= "announcement_created, ";
            $sql .= "announcement_datetime ) values ( ";
            $sql .= ":announcement_name, ";
            $sql .= ":announcement_description, ";
            $sql .= ":announcement_is_active, ";
            $sql .= ":announcement_date, "; 
            $sql .= ":announcement_created, ";
            $sql .= ":announcement_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_name" => $this->announcement_name,
                "announcement_description" => $this->announcement_description,
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_date" => $this->announcement_date, 
                "announcement_created" => $this->announcement_created,
                "announcement_datetime" => $this->announcement_datetime,
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
            $sql .= "{$this->tblAnnouncement} ";
            // $sql .= "where announcement_is_active = 1 ";
            $sql .= "order by announcement_date desc ";
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
            $sql .= "{$this->tblAnnouncement} ";
            // $sql .= "where announcement_is_active = 1 ";
            $sql .= "order by announcement_date desc,";
            $sql .= "announcement_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->announcement_start - 1,
                "total" => $this->announcement_total,
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
            $sql .= "{$this->tblAnnouncement} ";
            $sql .= "where announcement_name like :announcement_name ";
            $sql .= "or announcement_date like :announcement_date ";
            $sql .= "order by announcement_date desc, ";
            $sql .= "announcement_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_name" => "{$this->announcement_search}%",
                "announcement_date" => "{$this->announcement_search}%",
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
            $sql .= "{$this->tblAnnouncement} ";
            $sql .= "where announcement_is_active = 1 ";
            $sql .= "and announcement_aid = :announcement_aid ";
            $sql .= "order by announcement_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_aid" => $this->announcement_aid,
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
            $sql = "update {$this->tblAnnouncement} set ";
            $sql .= "announcement_name = :announcement_name, ";
            $sql .= "announcement_description = :announcement_description, ";
            $sql .= "announcement_date = :announcement_date, ";
            $sql .= "announcement_datetime = :announcement_datetime ";
            $sql .= "where announcement_aid  = :announcement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_name" => $this->announcement_name,
                "announcement_description" => $this->announcement_description,
                "announcement_date" => $this->announcement_date, 
                "announcement_datetime" => $this->announcement_datetime,
                "announcement_aid" => $this->announcement_aid,
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
            $sql = "select announcement_name from {$this->tblAnnouncement} ";
            $sql .= "where announcement_name = :announcement_name ";
            $sql .= "and announcement_date = :announcement_date ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_name" => "{$this->announcement_name}",
                "announcement_date" => "{$this->announcement_date}",
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
            $sql = "update {$this->tblAnnouncement} set ";
            $sql .= "announcement_is_active = :announcement_is_active, ";
            $sql .= "announcement_datetime = :announcement_datetime ";
            $sql .= "where announcement_aid = :announcement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_is_active" => $this->announcement_is_active,
                "announcement_datetime" => $this->announcement_datetime,
                "announcement_aid" => $this->announcement_aid,
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
            $sql = "delete from {$this->tblAnnouncement} ";
            $sql .= "where announcement_aid = :announcement_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "announcement_aid" => $this->announcement_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}
