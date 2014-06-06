<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initConfig()
    {
        $config = new Zend_Config($this->getOptions(), true);
        Zend_Registry::set('config', $config);
        return $config;
    }

    protected function _initDatabase()
    {
        // get config from config/application.ini
        $config = $this->getOptions();
        $db = Zend_Db::factory($config['resources']['db']['adapter'], $config['resources']['db']['params']);
        //set default adapter
        Zend_Db_Table::setDefaultAdapter($db);
        //save Db in registry for later use
        Zend_Registry::set("db", $db);
    }

    protected function _initZFDebug()
    {
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $autoloader->registerNamespace('ZFDebug');
        $this->bootstrap('db');
        //$db = $this->getPluginResource('db')->getDbAdapter();

        $this->bootstrap('FrontController');

        $config = Zend_Registry::get('config');
        $ZFDebugConfig = $config->ZFDebug;

        if( $ZFDebugConfig->enabled ){
            $options = array( 'plugins' => array('Variables'
            //, 'Database' => array('adapter' => array('standard' => $db))
            , 'File' => array('basePath' => '/'),'Memory'
            , 'Time'
            , 'Registry'
            , 'Exception'));

            $debug = new ZFDebug_Controller_Plugin_Debug($options);

            $this->bootstrap('frontController');
            $frontController = $this->getResource('frontController');
            $frontController->registerPlugin($debug);
        }
    }
}