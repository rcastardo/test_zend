<?php

class Default_PersonController extends Zend_Controller_Action
{
    private $person = null;

    public function init()
    {
        $this->person = new Default_Model_Person();
    }

    public function indexAction()
    {
        //        // mapper
//        $mapper = new Mapper_Person();
//
//        // get all users
//        $this->view->assign('persons', $mapper->fetchAll());



        $personArray[] = $this->person->setId(1)->setSex('M')->setAge('30')->setName('Mario Josá');
        $this->view-> assign('personArray', $personArray);
    }

    public function createAction()
    {
        $this->person->setName('Diogo Matheus')
            ->setAge('23')
            ->setSex('M')
        ;

        // mapper
        //$mapper = new Mapper_Person();
        //try{
            // insert person
        //    $mapper->saveOrUpdate($person);
        //}
        //catch(Exception $e){
        //    $this->view->assign('message', $e->getMessage());
        //}
    }



}

