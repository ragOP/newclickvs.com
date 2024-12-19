jQuery(function($){
	$(document).ready(function () {
		if(typeof true_posts !== 'undefined'){
			$(window).scroll(function(){
				var bottomOffset = 1000;
				var data = {
					'action': 'loadmore',
					'query': true_posts,
					'page' : current_page
				};
				if( $(document).scrollTop() > ($(document).height() - bottomOffset) && !$('body').hasClass('loading')){

					console.log('scrolling');

					$.ajax({
						url: ajaxurl,
						data: data,
						type:'POST',
						beforeSend: function( xhr){
							$('body').addClass('loading');
						},
						success:function(data){
							if( data ) {
								$('#scroll_loadmore').before(data);
								current_page++;
								$('body').removeClass('loading');
							}
							else {
								$('body').addClass('load-all');
								$('body').removeClass('loading');
							}
						}
					});
				}
			});
		}
	});
});
