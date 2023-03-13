<?php
class UserOther
{
    public $user_other_aid;
    public $user_other_is_active;
    public $user_other_member_id;
    public $user_other_email;
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
    public $tblUserOther;
    public $tblRole;
    public $tblMembers;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserOther = "sccv1_settings_user_other";
        $this->tblRole = "sccv1_settings_role";
        $this->tblMembers = "sccv1_members";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserOther} ";
            $sql .= "( user_other_is_active, ";
            $sql .= "user_other_member_id, ";
            $sql .= "user_other_email, ";
            $sql .= "user_other_role_id, ";
            $sql .= "user_other_key, ";
            $sql .= "user_other_created, ";
            $sql .= "user_other_datetime ) values ( ";
            $sql .= ":user_other_is_active, ";
            $sql .= ":user_other_member_id, ";
            $sql .= ":user_other_email, ";
            $sql .= ":user_other_role_id, ";
            $sql .= ":user_other_key, ";
            $sql .= ":user_other_created, ";
            $sql .= ":user_other_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->user_other_is_active,
                "user_other_member_id" => $this->user_other_member_id,
                "user_other_email" => $this->user_other_email,
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
            $sql = "select otherUser.user_other_member_id, ";
            $sql .= "otherUser.user_other_email, ";
            $sql .= "otherUser.user_other_is_active, ";
            $sql .= "otherUser.user_other_role_id, ";
            $sql .= "otherUser.user_other_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "role.role_aid, ";
            $sql .= "role.role_name ";
            $sql .= "from {$this->tblUserOther} as otherUser, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where otherUser.user_other_role_id = role.role_aid ";
            $sql .= "and otherUser.user_other_member_id = member.members_aid ";
            $sql .= "order by otherUser.user_other_is_active desc, ";
            $sql .= "otherUser.user_other_member_id asc ";
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

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_member_id = :user_other_member_id, ";
            $sql .= "user_other_email = :user_other_email, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_aid  = :user_other_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_member_id" => $this->user_other_member_id,
                "user_other_email" => $this->user_other_email,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_aid" => $this->user_other_aid,
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

    // reset
    public function reset()
    {
        try {
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_key = :user_other_key, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_email = :user_other_email ";
            $sql .= "and user_other_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_key" => $this->user_other_key,
                "user_other_datetime" => $this->user_other_datetime,
                "user_other_email" => $this->user_other_email,
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
            $sql .= "where user_other_key = :user_other_key ";
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
 

    // email
    public function checkEmail()
    {
        try {
            $sql = "select user_other_email from {$this->tblUserOther} ";
            $sql .= "where user_other_email = :user_other_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_email" => "{$this->user_other_email}",
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
            $sql = "select otherUser.user_other_aid, ";
            $sql .= "otherUser.user_other_is_active, ";
            $sql .= "otherUser.user_other_member_id, ";
            $sql .= "otherUser.user_other_email, ";
            $sql .= "otherUser.user_other_password, ";
            $sql .= "member.members_aid, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name, ";
            $sql .= "role.* ";
            $sql .= "from {$this->tblUserOther} as otherUser, ";
            $sql .= "{$this->tblMembers} as member, ";
            $sql .= "{$this->tblRole} as role ";
            $sql .= "where otherUser.user_other_role_id = role.role_aid ";
            $sql .= "and otherUser.user_other_member_id = member.members_aid ";
            $sql .= "and otherUser.user_other_email like :user_other_email ";
            $sql .= "and otherUser.user_other_is_active = 1 ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_email" => $this->user_other_email,
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
}
