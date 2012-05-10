<?php if ( !defined ( 'BASEPATH' ) ) { exit( 'No direct script access allowed' ); }

class Ajax extends CI_Controller {

	function __construct() {
		parent::__construct ();
		$this->response = array(
			"success" => 1,
			"error"   => 0,
			"denied"  => -1
		);
	}

	public function hello_world(){

		echo json_encode(array(				
			"code" => $this->response["success"],
			"message" => array(
				"div"   => "<strong>Hello World</strong>"
			)
		));
		
	}
	public function hello_world_2(){

		$this->load->helper('form');

		echo json_encode(array(				
			"code" => $this->response["success"],
			"message" => array(
				"modal" => array(
					"title"   => "great",
					"message" => "success: '".set_value('test-input')."'"
				)
			)
		));
		
	}

	private function isAjax() {
		return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
	}

} //end AJAX

/* End of file ajax.php */
/* Location: ./application/controllers/ajax.php */
