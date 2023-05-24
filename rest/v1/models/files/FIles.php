<?php
class Files
{
    public $files_aid;
    public $files_name;
    public $files_link;
    public $files_date;
    public $files_created;
    public $files_datetime;

    public $connection;
    public $lastInsertedId;
    public $file_start;
    public $file_total;
    public $file_search;
    public $currentYear;
    public $tblFiles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblFiles = "sccv1_files";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblFiles} ";
            $sql .= "( files_name, ";
            $sql .= "files_link, ";
            $sql .= "files_date, ";
            $sql .= "files_created, ";
            $sql .= "files_datetime ) values ( ";
            $sql .= ":files_name, ";
            $sql .= ":files_link, ";
            $sql .= ":files_date, ";
            $sql .= ":files_created, ";
            $sql .= ":files_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "files_name" => $this->files_name,
                "files_link" => $this->files_link,
                "files_date" => $this->files_date,
                "files_created" => $this->files_created,
                "files_datetime" => $this->files_datetime,
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
            $sql .= "{$this->tblFiles} ";
            $sql .= "order by files_date desc ";
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
            $sql .= "{$this->tblFiles} ";
            $sql .= "order by files_date desc,";
            $sql .= "files_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->file_start - 1,
                "total" => $this->file_total,
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
            $sql .= "{$this->tblFiles} ";
            $sql .= "where (files_name like :files_name ";
            $sql .= "or MONTHNAME(files_date) like :files_month_date ";
            $sql .= "or files_date like :files_date) ";
            $sql .= "order by files_date desc, ";
            $sql .= "files_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "files_name" => "{$this->file_search}%",
                "files_month_date" => "{$this->file_search}%",
                "files_date" => "{$this->file_search}%",
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
            $sql .= "{$this->tblFiles} ";
            $sql .= "where files_aid  = :files_aid  ";
            $sql .= "order by files_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "files_aid " => $this->files_aid,
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
            $sql = "update {$this->tblFiles} set ";
            $sql .= "files_name = :files_name, ";
            $sql .= "files_link = :files_link, ";
            $sql .= "files_date = :files_date, ";
            $sql .= "files_datetime = :files_datetime ";
            $sql .= "where files_aid = :files_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "files_name" => $this->files_name,
                "files_link" => $this->files_link,
                "files_date" => $this->files_date,
                "files_datetime" => $this->files_datetime,
                "files_aid" => $this->files_aid,
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
            $sql = "delete from {$this->tblFiles} ";
            $sql .= "where files_aid = :files_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "files_aid" => $this->files_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
