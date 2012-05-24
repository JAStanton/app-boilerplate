<?php if ( ! defined( 'BASEPATH' ) ) exit( 'No direct script access allowed' );

	class Welcome extends CI_Controller {

		public function __construct() {
			parent::__construct();

			$this->load->library( array("carabiner") );
			$this->load->helper( "url" );

			$this->carabiner->js(
				array(
					array( "bootstrap.js" ),
					array( "helper.js" ),
					array( "app.js" )
				)
			);

			$this->carabiner->css(
				array(
					array( "bootstrap.css", "screen" ),
					array( "app.css", "screen" )
				)
			);

			$this->response = array(
				"success" => 1,
				"fail"	  => 0,
				"denied"  => -1
			);
		}


		public function index(){
			$data["header"] = $this->load->view("partials/header",NULL,TRUE);
			$data["footer"] = $this->load->view("partials/footer",array(
				"modal"	=> $this->load->view("partials/modal",NULL,TRUE),
				"settings_js" => $this->load->view("partials/settings",array(
					"settings"=> array(
						"base_url" => base_url(),
						"ajax_url" => base_url("ajax")
					)
				),TRUE)
			),TRUE);


			$this->load->view("app",$data);
		}

	}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */