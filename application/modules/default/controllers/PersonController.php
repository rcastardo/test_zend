<?php

class Default_PersonController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        //        // mapper
//        $mapper = new Mapper_Person();
//
//        // get all users
//        $this->view->assign('persons', $mapper->fetchAll());


        $person = new Person();
        $personArray[] = $person->setId(1)->setSex('M')->setAge('30')->setName('Mario Josá');

        $this->view-> assign('persons', $personArray);
    }

    public function createAction()
    {
        // model
        $person = new Person();
        $person->setName('Diogo Matheus')
            ->setAge('23')
            ->setSex('M')
        ;

        // mapper
        $mapper = new Mapper_Person();
        try{
            // insert person
            $mapper->saveOrUpdate($person);
        }
        catch(Exception $e){
            $this->view->assign('message', $e->getMessage());
        }
    }



}

