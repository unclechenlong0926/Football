	
window.onload = function() {
	var wHeight = $(window).height(),
		hHeight = $("header").height(),
		nHeight = $(".nav").height(),
		fHeight = $("footer").height(),
		arr = [0,1,2],
		index = 0;
		scroll = new iScroll("wrapper", {
			hScrollbar: false,
			vScrollbar: false,
		});
	$("#wrapper").height(wHeight - hHeight - fHeight - nHeight);
	scroll.refresh();
	
	getajax(index+1);

	$('header span').click(function() {
		$(this).css({
			'color': '#fff',
			'background': '#79c1df'
		}).siblings().css({
			'color': '#b1e4f8',
			'background': '#57b2d7'
		})
	})
	$('.nav span').eq(0).addClass('active2');
	$('.nav span').tap(function() {
		index = $(this).index();
		$('.page1').css('display', 'none').eq(index).css('display', 'block');
		$(this).addClass('active2').siblings().removeClass('active2');
		if(index==arr[index]){
			getajax(index+1);
			arr[index] = 5;
		}else{
			scroll.refresh();
			scroll.scrollTo(0, 0, 0, false);
		}
	})
function getajax(num){
		$.ajax({
			url: 'http://10.10.160.44:8080/Proxy/FootBall/tweet/json/query/hotspot.do',
			data: {
				'category': num
			},
			success: function(d) {
				var data = JSON.parse(d);
				for(var i=0; i<data.data.tweetlist.length; i++){
						var img = $('<img/>');
						img.attr("src" , "http://101.200.173.217:8080/FootBall"+data.data.tweetlist[i].defaultFilePath+data.data.tweetlist[i].thumbnailname);
						var p = $('<p>');
						p.html(data.data.tweetlist[i].content);
						var a = $('<a href="javascript:;"></a>')
						var li = $('<li>');
						a.append(img);
						a.append(p);
						li.append(a);
					if(i<2){
						$('.page1').eq(index).find('ul').eq(i).append(li);
					}else{
						var h1 = $('.page1').eq(index).find('ul').eq(0).height(),
							h2 = $('.page1').eq(index).find('ul').eq(1).height();
						if(h1>h2){
							$('.page1').eq(index).find('ul').eq(1).append(li);
						}else{
							$('.page1').eq(index).find('ul').eq(0).append(li);
						}
					}
					
				};
				scroll.refresh();
				scroll.scrollTo(0, 0, 0, false);
			}
		})
	}
}