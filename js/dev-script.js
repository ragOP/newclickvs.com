$(document).ready(function(){

    if($('.schedule-widget .schedule-widget__text-wrap').innerHeight() <= 200){
        $('.schedule-widget .show-all-btn').hide();
    } else {
        $('.schedule-widget .show-all-btn').on("click", function(){
            let parent = $(this).closest('.schedule-widget__wrap'),
                text = parent.find('.schedule-widget__text');
            
            if(!text.hasClass("open")){
                text.addClass("open");
            } else {
                text.removeClass("open");
            }
        });
    }

	if($('.single-post-content')){
		//$('.single-post-content h1, .single-post-content h2, .single-post-content h3, .single-post-content h4, .single-post-content h5, .single-post-content h6, .single-post-content p, .single-post-content ul, .single-post-content ol, .single-post-content div, .single-post-content img, .single-post-content blockquote').addClass('wow fadeInUp');
	}	

    function sendAjaxForm(result_form, ajax_form, url) {
        $.ajax({
            url:     url, 
            type:     'POST', 
            dataType: 'html', 
            data: $(ajax_form).serialize(),  
            success: function(response) {            
                $('.wpf-chimp-status').empty();
                $(result_form).append('<div class="wpf-success">Success</div>');
            },
            error: function(response) { 
                $('.wpf-chimp-status').empty();
                $(result_form).append('<div class="wpf-error">Error</div>');
            }
        });
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }


    $('.ajax-form input[type="submit"]').click(
        function(){
            $('.wpf-chimp-status').empty();
            $('.wpf-chimp-status').append('<div class="loading"></div>');

            if( $('.ajax-form input[name="email"]').val() != '' ){                
                if(validateEmail($('.ajax-form input[name="email"]').val())){
                    sendAjaxForm('.wpf-chimp-status', '.ajax-form', $('.ajax-form').data('action'));
                    return false; 
                } else{
                    $('.wpf-chimp-status').empty();
                    $('.wpf-chimp-status').append('<div class="wpf-error">Error</div>');
                }                

            } else{
                if($('.wpf-chimp-status .wpf-error').length == 0 ){
                    $('.wpf-chimp-status').empty();
                    $('.wpf-chimp-status').append('<div class="wpf-error">Error</div>');
                }
            }   

        }
    );
});