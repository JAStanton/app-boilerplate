/* Author: Jonathan Stanton

*/

/**
 * myApp description
 * @return obj returns application
 */
var myApp = function() {
	
	var isFunction = function (functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
	};

	var consolelog = function (response) {
		if (console && console.log) {
			console.log(response);
		}
	};

	var modal = function(data){
		var id = Math.random().toString(36).substring(3);
		$(".modal.template").clone().removeClass("template").attr("id",id).appendTo("body");
		var $el = $("#"+id);
		$(".modal-header h3",$el).html(data.title);
		$(".modal-body p",$el).html(data.message);
		$el.modal();
		$(".btn-close",$el).on("click",function(){
			$el.modal('hide').remove();
		});
	};

	/**
	* ajax does an ajax request, takes the response from the server (jSON) and decodes then response
	* @param  obj params.url is required, and .onSuccess, .onFail, and .onDenied are all optional functions
	*/
	var ajax = function (params) {

		$.ajax({
			type: "POST",
			data : params.data,
			url: params.url,
			success: function (response) {
				var resp = '';
				try {
					resp = $.parseJSON(response);
					if (typeof resp.code === 'undefined') throw "No Return Code";
				} catch (e) {
					//todo retry 3 times. then submit attempt errors to logger
					alert("server parsing error " + e.message);
					if (myApp.debug) consolelog(response);
					return;
				}
				if(isFunction(params.response)){
					params.response(resp.message);
				}

				switch (resp.code) {
					case 1:
						if (myApp.debug) consolelog("success!");
						if (isFunction(params.onSuccess)) {
							params.onSuccess(resp.message);
						}
						break;
					case 0:
						if (myApp.debug) consolelog("fail!");

						if (isFunction(params.onFail)) {
							params.onError(resp.message);
						}
						if(params.display_in_div){
							$("#" + params.display_div).html(resp.message);
						}
						/**
						* Attach Errors to form fields
						* expecting resp.errors as an object with index being the input name,
						* and value being the error message
						*/
						
						if(resp.errors){
							$.each(resp.errors,function(index,value){
								var $controlGroup = $(".control-group:has(*[name='" +  index + "'])");
								$controlGroup.addClass("error");
								$("*[name='" +  index + "']",$controlGroup).popover({title:"error",content:value,placement:"top"});
								$("*[name='" +  index + "']",$controlGroup).popover('enable');
								$controlGroup.click(function(){
									$(this).removeClass("error");
									$("*[name='" +  index + "']",this).popover('disable');
								});
							});
						}
						break;
					case -1:
						if (myApp.debug) consolelog("denied!");
						if (isFunction(params.onDenied)) {
							params.onDenied(resp.message);
						}
						break;
				}


				if(resp.message.modal){ modal(resp.message.modal); }
				
				if(resp.message.div){ $("#" + params.display_div_id).html(resp.message.div); }
			}
		});
	};

	return {

		init : function() {

			myApp.debug = true;
			this.bind_events();
			$("form.ajax button[type='submit']").button();

		},

		bind_events : function(){

			$(document).on("click","a.ajax,button.ajax",function(event){
				event.preventDefault();
				$that = $(this);
				ajax({
					url : SETTINGS.ajax_url + "/" + $that.attr("data-url"),
					display_div_id : $that.attr("data-display-id")
				});
			});

			$(document).on("submit","form.ajax",function(event){
				event.preventDefault();
				
				$that = $(this);
				$("button[type='submit']",$that).button('loading');
				ajax({
					url : SETTINGS.ajax_url + "/" + $that.attr("action"),
					data : $that.serialize(),
					response : function(){
						$("button[type='submit']",$that).button('reset');
					}
				});
			});

		}


	};
		
}();

$(function () { myApp.init(); }); //scripts loaded ready to rock and roll
