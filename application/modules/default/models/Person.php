<?php

class Default_Model_Person
{
    private $id;
    private $name;
    private $sex;
    private $age;

    public function getId(){
        return $this->id;
    }

    public function setId($id){
        $this->id = $id;
        return $this;
    }

    public function getName(){
        return $this->name;
    }

    public function setName($name){
        $this->name = $name;
        return $this;
    }

    public function getSex(){
        return $this->sex;
    }

    public function setSex($sex){
        $this->sex = $sex;
        return $this;
    }

    public function getAge(){
        return $this->age;
    }

    public function setAge($age){
        $this->age = $age;
        return $this;
    }
}

