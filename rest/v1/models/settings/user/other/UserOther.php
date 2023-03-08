<?php
class UserOther
{
    public $user_other_aid;
    public $user_other_is_active;
    public $user_other_emp_id;
    public $user_other_role_id;
    public $user_other_key;
    public $user_other_password;
    public $user_other_created;
    public $user_other_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_other_start;
    public $user_other_total;
    public $user_other_search;
    public $employee_email;
    public $tblUserOther;
    public $tblRole;
    public $tblEmployee;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserOther = "ntpv1_settings_user_other";
        $this->tblRole = "ntpv1_settings_role";
        $this->tblEmployee = "ntpv1_employee";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserOther} ";
            $sql .= "( user_other_is_active, ";
            $sql .= "user_other_emp_id, ";
            $sql .= "user_other_role_id, ";
            $sql .= "user_other_key, ";
            $sql .= "user_other_created, ";
            $sql .= "user_other_datetime ) values ( ";
            $sql .= ":user_other_is_active, ";
            $sql .= ":user_other_emp_id, ";
            $sql .= ":user_other_role_id, ";
            $sql .= ":user_other_key, ";
            $sql .= ":user_other_created, ";
            $sql .= ":user_other_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->user_other_is_active,
                "user_other_emp_id" => $this->user_other_emp_id,
                "user_other_role_id" => $this->user_other_role_id,
                "user_other_key" => $this->user_other_key,
                "user_other_created" => $this->user_other_created,
                "user_other_datetime" => $this->user_other_datetime,
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
            $sql = "select user.user_other_emp_id, ";
            $sql .= "user.user_other_is_active, ";
            $sql .= "user.user_other_role_id, ";
            $sql .= "role.role_aid, ";
            $sql .= "role.role_name, ";
            $sql .= "role.role_is_active, ";
            $sql .= "employee.employee_fname, ";
            $sql .= "employee.employee_mname, ";
            $sql .= "employee.employee_lname, ";
            $sql .= "employee.employee_email, ";
            $sql .= "user.user_other_aid ";
            $sql .= "from {$this->tblUserOther} as user, ";
            $sql .= "{$this->tblRole} as role, ";
            $sql .= "{$this->tblEmployee} as employee ";
            $sql .= "where user.user_other_role_id = role.role_aid ";
            $sql .= "and user.user_other_emp_id = employee.employee_aid ";
            $sql .= "order by user.user_other_is_active desc, ";
            $sql .= "user.user_other_emp_id asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select user.user_other_emp_id, ";
            $sql .= "user.user_other_is_active, ";
            $sql .= "user.user_other_role_id, ";
            $sql .= "role.role_aid, ";
            $sql .= "role.role_name, ";
            $sql .= "role.role_is_active, ";
            $sql .= "employee.employee_fname, ";
            $sql .= "employee.employee_mname, ";
            $sql .= "employee.employee_lname, ";
            $sql .= "employee.employee_email, ";
            $sql .= "user.user_other_aid ";
            $sql .= "from {$this->tblUserOther} as user, ";
            $sql .= "{$this->tblRole} as role, ";
            $sql .= "{$this->tblEmployee} as employee ";
            $sql .= "where user.user_other_role_id = role.role_aid ";
            $sql .= "and user.user_other_emp_id = employee.employee_aid ";
            $sql .= "order by user.user_other_is_active desc, ";
            $sql .= "user.user_other_emp_id asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_other_start - 1,
                "total" => $this->user_other_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read login
    public function readLogin()
    {
        try {
            $sql = "select user.user_other_aid, ";
            $sql .= "user.user_other_is_active, ";
            $sql .= "user.user_other_password, ";
            $sql .= "role.*, ";
            $sql .= "employee.employee_aid, ";
            $sql .= "employee.employee_job_supervisor_id, ";
            $sql .= "employee.employee_job_leave_type_id, ";
            $sql .= "employee.employee_fname, ";
            $sql .= "employee.employee_email ";
            $sql .= "from {$this->tblUserOther} as user, ";
            $sql .= "{$this->tblRole} as role, ";
            $sql .= "{$this->tblEmployee} as employee ";
            $sql .= "where user.user_other_role_id = role.role_aid ";
            $sql .= "and user.user_other_emp_id = employee.employee_aid ";
            $sql .= "and employee.employee_email like :employee_email ";
            $sql .= "and user.user_other_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_email" => $this->employee_email,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function search()
    {
        try {
            $sql = "select * from {$this->tblUserOther} as user, ";
            $sql .= "{$this->tblRole} as role, ";
            $sql .= "{$this->tblEmployee} as employee ";
            $sql .= "where user.user_other_role_id = role.role_aid ";
            $sql .= "and user.user_other_emp_id = employee.employee_aid ";
            $sql .= "and ( employee.employee_fname like :employee_fname ";
            $sql .= "or employee.employee_lname like :employee_lname ";
            $sql .= ") ";
            $sql .= "order by user.user_other_is_active desc, ";
            $sql .= "user.user_other_role_id asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_fname" => "{$this->user_other_search}%",
                "employee_lname" => "{$this->user_other_search}%",
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
            $sql = "select * from {$this->tblUserOther} ";
            $sql .= "where user_other_aid = :user_other_aid ";
            $sql .= "order by user_other_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read key
    public function readKey()
    {
        try {
            $sql = "select user_other_key from {$this->tblUserOther} ";
            $sql .= "where user_other_key = :user_other_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_key" => $this->user_other_key,
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
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_role_id = :user_other_role_id, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_aid  = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_role_id" => $this->user_other_role_id,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // set password
    public function setPassword()
    {
        try {
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_password = :user_other_password, ";
            $sql .= "user_other_key = '', ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_key  = :user_other_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_password" => $this->user_other_password,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_key" => $this->user_other_key,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // reset password
    public function resetPassword()
    {
        try {
            $sql = "update {$this->tblUserOther} other, {$this->tblEmployee} employee set ";
            $sql .= "other.user_other_key = :user_other_key, ";
            $sql .= "other.user_other_datetime = :user_other_datetime ";
            $sql .= "where employee.employee_email  = :employee_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_key" => $this->user_other_key,
                "user_other_datetime" => $this->user_other_datetime,
                "employee_email" => $this->employee_email,
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
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_is_active = :user_other_is_active, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_aid = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->user_other_is_active,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_aid" => $this->user_other_aid,
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
            $sql = "delete from {$this->tblUserOther} ";
            $sql .= "where user_other_aid = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_aid" => $this->user_other_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // validator

    // email
    public function checkEmail()
    {
        try {
            $sql = "select user_other_emp_id from {$this->tblUserOther} ";
            $sql .= "where user_other_emp_id = :user_other_emp_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_emp_id" => "{$this->user_other_emp_id}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
