<?php
class FileUpload
{
    public $file_upload_aid ;
    public $file_upload_name;
    public $file_upload_link; 
    public $file_upload_date;
    public $file_upload_created;
    public $file_upload_datetime; 

    public $connection;
    public $lastInsertedId; 
    public $file_start;
    public $file_total;
    public $file_search;
    public $currentYear;
    public $tblFileUpload; 

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblFileUpload = "sccv1_file_upload"; 
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblFileUpload} ";
            $sql .= "( file_upload_name, ";
            $sql .= "file_upload_link, "; 
            $sql .= "file_upload_date, "; 
            $sql .= "file_upload_created, ";
            $sql .= "file_upload_datetime ) values ( ";
            $sql .= ":file_upload_name, ";
            $sql .= ":file_upload_link, "; 
            $sql .= ":file_upload_date, "; 
            $sql .= ":file_upload_created, ";
            $sql .= ":file_upload_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "file_upload_name" => $this->file_upload_name,
                "file_upload_link" => $this->file_upload_link, 
                "file_upload_date" => $this->file_upload_date, 
                "file_upload_created" => $this->file_upload_created,
                "file_upload_datetime" => $this->file_upload_datetime,
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
            $sql .= "{$this->tblFileUpload} "; 
            $sql .= "order by file_upload_date desc ";
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
            $sql .= "{$this->tblFileUpload} "; 
            $sql .= "order by file_upload_date desc,";
            $sql .= "file_upload_name asc ";
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
            $sql .= "{$this->tblFileUpload} ";
            $sql .= "where file_upload_name like :file_upload_name ";
            $sql .= "or file_upload_date like :file_upload_date ";
            $sql .= "order by file_upload_date desc, ";
            $sql .= "file_upload_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "file_upload_name" => "{$this->file_search}%",
                "file_upload_date" => "{$this->file_search}%",
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
            $sql .= "{$this->tblFileUpload} ";
            $sql .= "where file_upload_aid  = :file_upload_aid  ";
            $sql .= "order by file_upload_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "file_upload_aid " => $this->file_upload_aid ,
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
            $sql = "update {$this->tblFileUpload} set ";
            $sql .= "file_upload_name = :file_upload_name, ";
            $sql .= "file_upload_link = :file_upload_link, ";
            $sql .= "file_upload_date = :file_upload_date, ";
            $sql .= "file_upload_datetime = :file_upload_datetime ";
            $sql .= "where file_upload_aid = :file_upload_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "file_upload_name" => $this->file_upload_name,
                "file_upload_link" => $this->file_upload_link,
                "file_upload_date" => $this->file_upload_date, 
                "file_upload_datetime" => $this->file_upload_datetime,
                "file_upload_aid" => $this->file_upload_aid,
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
            $sql = "delete from {$this->tblFileUpload} ";
            $sql .= "where file_upload_aid = :file_upload_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "file_upload_aid" => $this->file_upload_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}
