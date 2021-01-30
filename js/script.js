
$(document).ready(function(){
	function htpRequest(file, selector) {
		var url = file;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
	      var data = JSON.parse(this.responseText);
	      var ele  = data['elements'];
				var rows = data['rows'];
				var cols = data['cols'];
				var result;
				var x = '<table>';
				x += '<tr>';
				for (var i = 0; i <= cols; i++){
					if (i==0) {x += '<td class="vide group"></td>';}
					else {x += '<td class="group">'+ i +'</td>';}
				}
				x += '</tr>';
				for (var r = 1; r <= rows; r++) {
					x += '<tr>';
					x += '<td class="period">'+r+'</td>';
					for (var c = 1; c <= cols; c++) {
						result = ele.filter(ele => ele.ypos == r && ele.xpos == c);
						if (result[0] === undefined) { x += '<td class="vide"></td>'; }
						else{ 
							x += '<td>';
							x += '<div class="z"><span>'+result[0].number+'</span><span class="z">'+result[0].phase+'</span></div>';
							x += '<div class="symbol"><span>'+result[0].symbol+'</span></div>';
							x += '<div class="name"><span>'+result[0].name+'</span></div>';
							x += '</td>';
						}
					}
					x += '</tr>';
				}
				x += '</table>';
				$(selector).append(x);
		  }
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}
	htpRequest("data/tp.json", "#show");
});