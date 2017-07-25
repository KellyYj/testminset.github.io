//打天后台页面时，发送请求，刷新新闻列表
$(document).ready(function() {
	var $newTable = $('#newTable tbody')
	refreshNews();

	//添加新闻
	$('#btnsubmit').click(function(e) {
		e.preventDefault();

		//输入判断
		if($('#newstitle').val() === "" || $('#newsimg').val() === "" || $('#newssrc').val() === "" || $('#newstime').val() === "") {

			if($('#newstitle').val() === "") {
				$('#newstitle').parent().addClass('has-error');
			} else {
				$('#newstitle').parent().removeClass('has-error');
			}
			if($('#newsimg').val() === "") {
				$('#newsimg').parent().addClass('has-error');
			} else {
				$('#newsimg').parent().removeClass('has-error');
			}
			if($('#newssrc').val() === "") {
				$('#newssrc').parent().addClass('has-error');
			} else {
				$('#newssrc').parent().removeClass('has-error');
			}
			if($('#newstime').val() === "") {
				$('#newstime').parent().addClass('has-error');
			} else {
				$('#newstime').parent().removeClass('has-error');
			}
		} else {
			//提交添加
			var jsonNews = {
				newstitle: $('#newstitle').val(),
				newstype: $('#newstype').val(),
				newsimg: $('#newsimg').val(),
				newssrc: $('#newssrc').val(),
				newstime: $('#newstime').val()
			}
			$.ajax({
				type: "post",
				url: "/admin/insertnews",
				data: jsonNews,
				datatype: 'json',
				success: function(data) {
					console.log(data);
					
					refreshNews();
					//清空
					$('#newstitle').val('');
					$('#newsimg').val('');
					$('#newssrc').val('');
					$('#newstime').val('');
				}
			});
		}
	});

	//delete news 
	var deleteId = null;
	$newTable.on('click', '.btn-danger', function(e) {
		$('#deleteModal').modal('show');
		deleteId = $(this).parent().prevAll().eq(3).html();
	});
	$('#deleteconfirm').click(function(e) {
		if(deleteId) {
			$.ajax({
				type: "post",
				url: "/admin/deletenews",
				data: {
					newsid: deleteId
				},
				success: function(e) {
					console.log('删除成功');
					$('#deleteModal').modal('hide');
					refreshNews();
				}
			});
		}
	})

	//修改
	var changeId = null;
	$newTable.on('click', '.btn-primary', function(e) {
		$('#updateModal').modal('show');
		changeId = $(this).parent().prevAll().eq(3).html();
		$.ajax({
			type: "get",
			url: "/admin/currentews",
			datatype: 'json',
			data: {
				newsid: changeId
			},
			success: function(data) {
				console.log(data);
				$('#unewstitle').val(data[0].newstitle);
				$('#unewsimg').val(data[0].newsimg);
				$('#unewssrc').val(data[0].newssrc);
				var utime = data[0].newstime.split(' ')[0];
				$('#unewstime').val(utime);
				$('#unewstype').val(data[0].newstype);
			}
		});
	});

	$('#updateModal #updateconfirm').click(function(e) {
		$.ajax({
			type: "post",
			url: "/admin/update",
			data:{
				newstitle: $('#unewstitle').val(),
				newstype: $('#unewstype').val(),
				newsimg: $('#unewsimg').val(),
				newstime: $('#unewstime').val(),
				newssrc: $('#unewssrc').val(),
				id:changeId

			},
			success: function(e) {
				console.log(e);
				$('#updateModal').modal('hide');
				refreshNews();
			}
		});

	});

	function refreshNews() {
		//empty table
		$newTable.empty();
		$.ajax({
			url: "/admin/getnews",
			type: "get",
			datatype: 'json',
			success: function(data) {
				data.forEach(function(item, index, array) {
					var $tdid = $('<td>').html(item.id);
					var $tdtype = $('<td>').html(item.newstype);
					var $tdtitle = $('<td>').html(item.newstitle);
					var $tdtime = $('<td>').html(item.newstime);
					var $tdctrl = $('<td>');
					var $tdbtnupdate = $('<button>').addClass('btn btn-primary btn-xs').html('修改');
					var $tdbtndelete = $('<button>').addClass('btn btn-danger btn-xs').html('删除');

					$tdctrl.append($tdbtnupdate, $tdbtndelete);
					var $tRow = $('<tr>');
					$tRow.append($tdid, $tdtype, $tdtitle, $tdtime, $tdctrl);
					$newTable.append($tRow);
				});
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//				alert(XMLHttpRequest.status);
				//				alert(XMLHttpRequest.readyState);
				//				alert(textStatus+"11");
			}
		});
	}
});