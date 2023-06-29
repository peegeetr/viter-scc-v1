<?php
class Members
{
    public $members_aid;
    public $members_id;
    public $members_is_approved;
    public $members_is_cancel;
    public $members_is_active;
    public $members_picture;
    public $members_first_name;
    public $members_last_name;
    public $members_middle_name;
    public $members_contact_no;
    public $members_email;
    public $members_civil_status;
    public $members_gender;
    public $members_birth_place;
    public $members_birth_date;
    public $members_education_attainment;
    public $members_permanent_address;
    public $members_permanent_zip_code;
    public $members_permanent_mobile_no;
    public $members_present_address;
    public $members_present_zip_code;
    public $members_present_mobile_no;
    public $members_position;
    public $members_income_gross;
    public $members_income_net;
    public $members_other_source_income;
    public $members_other_income;
    public $members_spouse_occupation;
    public $members_spouse_income;
    public $members_spouse_net_income;
    public $members_properties_owned;
    public $members_pre_membership_date;
    public $members_subscribe_capital_id;
    public $members_created;
    public $members_datetime;

    public $connection;
    public $lastInsertedId;
    public $members_start;
    public $members_total;
    public $members_search;
    public $currentYear;
    public $tblMembers;
    public $tblUserOther;
    public $tblOrders;
    public $tblSales;
    public $tblCapitalShare;
    public $tblSubscribeCapital;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblMembers = "sccv1_members";
        $this->tblOrders = "sccv1_orders";
        $this->tblSales = "sccv1_sales";
        $this->tblUserOther = "sccv1_settings_user_other";
        $this->tblCapitalShare = "sccv1_capital_share";
        $this->tblSubscribeCapital = "sccv1_settings_subscribe_capital";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblMembers} ";
            $sql .= "( members_id, ";
            $sql .= "members_pre_membership_date, ";
            $sql .= "members_is_active, ";
            $sql .= "members_first_name, ";
            $sql .= "members_last_name, ";
            $sql .= "members_email, ";
            $sql .= "members_middle_name, ";
            $sql .= "members_gender, ";
            $sql .= "members_birth_date, ";
            $sql .= "members_subscribe_capital_id, ";
            $sql .= "members_created, ";
            $sql .= "members_datetime ) values ( ";
            $sql .= ":members_id, ";
            $sql .= ":members_pre_membership_date, ";
            $sql .= ":members_is_active, ";
            $sql .= ":members_first_name, ";
            $sql .= ":members_last_name, ";
            $sql .= ":members_email, ";
            $sql .= ":members_middle_name, ";
            $sql .= ":members_gender, ";
            $sql .= ":members_birth_date, ";
            $sql .= ":members_subscribe_capital_id, ";
            $sql .= ":members_created, ";
            $sql .= ":members_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_id" => $this->members_id,
                "members_pre_membership_date" => $this->members_pre_membership_date,
                "members_is_active" => $this->members_is_active,
                "members_first_name" => $this->members_first_name,
                "members_last_name" => $this->members_last_name,
                "members_email" => $this->members_email,
                "members_middle_name" => $this->members_middle_name,
                "members_gender" => $this->members_gender,
                "members_birth_date" => $this->members_birth_date,
                "members_subscribe_capital_id" => $this->members_subscribe_capital_id,
                "members_created" => $this->members_created,
                "members_datetime" => $this->members_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all active and approved members
    public function readAllApproved()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 1 ";
            $sql .= "and members_is_active = 1 ";
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit active and approved members
    public function readLimitApproved()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 1 ";
            $sql .= "and members_is_cancel = 0 ";
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->members_start - 1,
                "total" => $this->members_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search active and approved members
    public function searchApproved()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 1 ";
            $sql .= "and members_is_cancel = 0 ";
            $sql .= "and (members_last_name like :members_last_name ";
            $sql .= "or members_id like :members_id ";
            $sql .= "or members_first_name like :members_first_name) ";
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_last_name" => "%{$this->members_search}%",
                "members_first_name" => "%{$this->members_search}%",
                "members_id" => "%{$this->members_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all 
    public function readLastMemberId()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "order by members_aid desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all not approved members
    public function readAll()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 0 ";
            $sql .= "order by members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit not approved members
    public function readLimit()
    {
        try {
            $sql = "select * from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 0 ";
            $sql .= "order by members_last_name, ";
            $sql .= "members_first_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->members_start - 1,
                "total" => $this->members_total,
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
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_is_approved = 0 ";
            $sql .= "and (members_last_name like :members_last_name ";
            $sql .= "or members_id like :members_id ";
            $sql .= "or members_first_name like :members_first_name) ";
            $sql .= "order by members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_last_name" => "%{$this->members_search}%",
                "members_first_name" => "%{$this->members_search}%",
                "members_id" => "%{$this->members_search}%",
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
            $sql = "select member.*, ";
            $sql .= "subscribeCapital.subscribe_capital_amount, ";
            $sql .= "subscribeCapital.subscribe_capital_date ";
            $sql .= "from {$this->tblMembers} as member, ";
            $sql .= "{$this->tblSubscribeCapital} as subscribeCapital ";
            $sql .= "where member.members_aid = :members_aid ";
            $sql .= "and member.members_subscribe_capital_id = subscribeCapital.subscribe_capital_aid  ";
            $sql .= "order by member.members_is_active desc, ";
            $sql .= "member.members_last_name, ";
            $sql .= "member.members_first_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readNameById()
    {
        try {
            $sql = "select ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name ";
            $sql .= "from ";
            $sql .= "{$this->tblMembers} ";
            $sql .= "where members_aid = :members_aid ";
            $sql .= "order by members_is_active desc, ";
            $sql .= "members_last_name, ";
            $sql .= "members_first_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update basic info
    public function update()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_id = :members_id, ";
            $sql .= "members_pre_membership_date = :members_pre_membership_date, ";
            $sql .= "members_first_name = :members_first_name, ";
            $sql .= "members_last_name = :members_last_name, ";
            $sql .= "members_middle_name = :members_middle_name, ";
            $sql .= "members_gender = :members_gender, ";
            $sql .= "members_picture = :members_picture, ";
            $sql .= "members_birth_date = :members_birth_date, ";
            $sql .= "members_subscribe_capital_id = :members_subscribe_capital_id, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_id" => $this->members_id,
                "members_pre_membership_date" => $this->members_pre_membership_date,
                "members_first_name" => $this->members_first_name,
                "members_last_name" => $this->members_last_name,
                "members_middle_name" => $this->members_middle_name,
                "members_gender" => $this->members_gender,
                "members_picture" => $this->members_picture,
                "members_birth_date" => $this->members_birth_date,
                "members_subscribe_capital_id" => $this->members_subscribe_capital_id,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update addtional info
    public function updateAdditionalInfo()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_civil_status = :members_civil_status, ";
            $sql .= "members_birth_place = :members_birth_place, ";
            $sql .= "members_email = :members_email, ";
            $sql .= "members_contact_no = :members_contact_no, ";
            $sql .= "members_education_attainment = :members_education_attainment, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_civil_status" => $this->members_civil_status,
                "members_birth_place" => $this->members_birth_place,
                "members_email" => $this->members_email,
                "members_contact_no" => $this->members_contact_no,
                "members_education_attainment" => $this->members_education_attainment,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // update present address info
    public function updatePresentAddress()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_present_address = :members_present_address, ";
            $sql .= "members_present_zip_code = :members_present_zip_code, ";
            $sql .= "members_present_mobile_no = :members_present_mobile_no, ";;
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_present_address" => $this->members_present_address,
                "members_present_zip_code" => $this->members_present_zip_code,
                "members_present_mobile_no" => $this->members_present_mobile_no,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update permanent address info
    public function updatePermanentAddress()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_permanent_address = :members_permanent_address, ";
            $sql .= "members_permanent_zip_code = :members_permanent_zip_code, ";
            $sql .= "members_permanent_mobile_no = :members_permanent_mobile_no, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_permanent_address" => $this->members_permanent_address,
                "members_permanent_zip_code" => $this->members_permanent_zip_code,
                "members_permanent_mobile_no" => $this->members_permanent_mobile_no,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update spouse info
    public function updateSpouseInfo()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_spouse_occupation = :members_spouse_occupation, ";
            $sql .= "members_spouse_income = :members_spouse_income, ";
            $sql .= "members_spouse_net_income = :members_spouse_net_income, ";
            $sql .= "members_properties_owned = :members_properties_owned, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_spouse_occupation" => $this->members_spouse_occupation,
                "members_spouse_income" => $this->members_spouse_income,
                "members_spouse_net_income" => $this->members_spouse_net_income,
                "members_properties_owned" => $this->members_properties_owned,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update job info
    public function updateJobInfo()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_position = :members_position, ";
            $sql .= "members_income_gross = :members_income_gross, ";
            $sql .= "members_income_net = :members_income_net, ";
            $sql .= "members_other_source_income = :members_other_source_income, ";
            $sql .= "members_other_income = :members_other_income, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid  = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_position" => $this->members_position,
                "members_income_gross" => $this->members_income_gross,
                "members_income_net" => $this->members_income_net,
                "members_other_source_income" => $this->members_other_source_income,
                "members_other_income" => $this->members_other_income,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
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
            $sql = "select members_last_name,  ";
            $sql .= "members_first_name, ";
            $sql .= "members_middle_name ";
            $sql .= "from {$this->tblMembers} ";
            $sql .= "where members_last_name = :members_last_name ";
            $sql .= "and members_first_name = :members_first_name ";
            $sql .= "and members_middle_name = :members_middle_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_first_name" => $this->members_first_name,
                "members_last_name" => $this->members_last_name,
                "members_middle_name" => $this->members_middle_name,
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
            $sql = "select members_email ";
            $sql .= "from {$this->tblMembers} ";
            $sql .= "where members_email = :members_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_email" => $this->members_email,
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
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_is_active = :members_is_active, ";
            $sql .= "members_is_cancel = '0', ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_is_active" => $this->members_is_active,
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active User Other
    public function activeUserOther()
    {
        try {
            $sql = "update {$this->tblUserOther} set ";
            $sql .= "user_other_is_active = :user_other_is_active, ";
            $sql .= "user_other_datetime = :user_other_datetime ";
            $sql .= "where user_other_member_id = :user_other_member_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_is_active" => $this->members_is_active,
                "user_other_datetime" => $this->members_datetime,
                "user_other_member_id" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    //member cancelation
    public function cancel()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_is_active = 0, ";
            $sql .= "members_is_cancel = 1, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //member approved
    public function approved()
    {
        try {
            $sql = "update {$this->tblMembers} set ";
            $sql .= "members_is_approved = 1, ";
            $sql .= "members_datetime = :members_datetime ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_datetime" => $this->members_datetime,
                "members_aid" => $this->members_aid,
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
            $sql = "delete from {$this->tblMembers} ";
            $sql .= "where members_aid = :members_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "members_aid" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all in account
    public function checkAssociation()
    {
        try {
            $sql = "select user_other_member_id from ";
            $sql .= "{$this->tblUserOther} ";
            $sql .= "where user_other_member_id = :user_other_member_id ";
            $sql .= "order by user_other_member_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_other_member_id" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read all in account
    public function checkAssociationToPatronage()
    {
        try {
            $sql = "select orders.orders_member_id, ";
            $sql .= "member.members_aid, ";
            $sql .= "sales.sales_member_id ";
            $sql .= "from {$this->tblOrders} as orders, ";
            $sql .= "{$this->tblSales} as sales, ";
            $sql .= "{$this->tblMembers} as member ";
            $sql .= "where orders.orders_member_id = :orders_member_id ";
            $sql .= "and orders.orders_aid = sales.sales_order_id ";
            $sql .= "and orders.orders_member_id = member.members_aid ";
            $sql .= "order by sales.sales_is_paid, ";
            $sql .= "sales.sales_date desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "orders_member_id" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all in account
    public function checkAssociationToCapital()
    {
        try {
            $sql = "select capital_share_member_id from ";
            $sql .= "{$this->tblCapitalShare} ";
            $sql .= "where capital_share_member_id = :capital_share_member_id ";
            $sql .= "order by capital_share_member_id desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "capital_share_member_id" => $this->members_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
