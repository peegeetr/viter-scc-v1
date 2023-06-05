<?php
class Suppliers
{
    public $suppliers_aid;
    public $suppliers_company_name;
    public $suppliers_company_address;
    public $suppliers_contact_person;
    public $suppliers_contact_num;
    public $suppliers_is_active;
    public $suppliers_created;
    public $suppliers_datetime;

    public $connection;
    public $lastInsertedId;
    public $suppliers_start;
    public $suppliers_total;
    public $suppliers_search;
    public $currentYear;
    public $tblSuppliers;
    public $tblSuppliersProducts;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSuppliers = "sccv1_suppliers";
        $this->tblSuppliersProducts = "sccv1_suppliers_products";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblSuppliers} ";
            $sql .= "( suppliers_company_name, ";
            $sql .= "suppliers_company_address, ";
            $sql .= "suppliers_contact_person, ";
            $sql .= "suppliers_contact_num, ";
            $sql .= "suppliers_is_active, ";
            $sql .= "suppliers_created, ";
            $sql .= "suppliers_datetime ) values ( ";
            $sql .= ":suppliers_company_name, ";
            $sql .= ":suppliers_company_address, ";
            $sql .= ":suppliers_contact_person, ";
            $sql .= ":suppliers_contact_num, ";
            $sql .= ":suppliers_is_active, ";
            $sql .= ":suppliers_created, ";
            $sql .= ":suppliers_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_company_name" => $this->suppliers_company_name,
                "suppliers_company_address" => $this->suppliers_company_address,
                "suppliers_contact_person" => $this->suppliers_contact_person,
                "suppliers_contact_num" => $this->suppliers_contact_num,
                "suppliers_is_active" => $this->suppliers_is_active,
                "suppliers_created" => $this->suppliers_created,
                "suppliers_datetime" => $this->suppliers_datetime,
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
            $sql .= "{$this->tblSuppliers} ";
            $sql .= "order by suppliers_is_active, ";
            $sql .= "suppliers_company_name asc ";
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
            $sql .= "{$this->tblSuppliers} ";
            $sql .= "order by suppliers_is_active, ";
            $sql .= "suppliers_company_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->suppliers_start - 1,
                "total" => $this->suppliers_total,
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
            $sql .= "{$this->tblSuppliers} ";
            $sql .= "where (suppliers_company_name like :suppliers_company_name ";
            $sql .= "or suppliers_contact_person like :suppliers_contact_person ";
            $sql .= "or suppliers_company_address like :suppliers_company_address) ";
            $sql .= "order by suppliers_company_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_company_name" => "%{$this->suppliers_search}%",
                "suppliers_contact_person" => "%{$this->suppliers_search}%",
                "suppliers_company_address" => "%{$this->suppliers_search}%",
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
            $sql .= "{$this->tblSuppliers} ";
            $sql .= "where suppliers_is_active = 1 ";
            $sql .= "and suppliers_aid = :suppliers_aid ";
            $sql .= "order by suppliers_company_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_aid" => $this->suppliers_aid,
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
            $sql = "update {$this->tblSuppliers} set ";
            $sql .= "suppliers_company_name = :suppliers_company_name, ";
            $sql .= "suppliers_company_address = :suppliers_company_address, ";
            $sql .= "suppliers_contact_person = :suppliers_contact_person, ";
            $sql .= "suppliers_contact_num = :suppliers_contact_num, ";
            $sql .= "suppliers_datetime = :suppliers_datetime ";
            $sql .= "where suppliers_aid = :suppliers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_company_name" => $this->suppliers_company_name,
                "suppliers_company_address" => $this->suppliers_company_address,
                "suppliers_contact_person" => $this->suppliers_contact_person,
                "suppliers_contact_num" => $this->suppliers_contact_num,
                "suppliers_datetime" => $this->suppliers_datetime,
                "suppliers_aid" => $this->suppliers_aid,
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
            $sql = "select suppliers_company_name from {$this->tblSuppliers} ";
            $sql .= "where suppliers_company_name = :suppliers_company_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_company_name" => "{$this->suppliers_company_name}",
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
            $sql = "update {$this->tblSuppliers} set ";
            $sql .= "suppliers_is_active = :suppliers_is_active, ";
            $sql .= "suppliers_datetime = :suppliers_datetime ";
            $sql .= "where suppliers_aid = :suppliers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_is_active" => $this->suppliers_is_active,
                "suppliers_datetime" => $this->suppliers_datetime,
                "suppliers_aid" => $this->suppliers_aid,
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
            $sql = "delete from {$this->tblSuppliers} ";
            $sql .= "where suppliers_aid = :suppliers_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_aid" => $this->suppliers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // read all in stock
    public function checkAssociation()
    {
        try {
            $sql = "select suppliers_products_suppliers_id from ";
            $sql .= "{$this->tblSuppliersProducts} ";
            $sql .= "where suppliers_products_suppliers_id = :suppliers_products_suppliers_id ";
            $sql .= "order by suppliers_products_suppliers_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "suppliers_products_suppliers_id" => $this->suppliers_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
