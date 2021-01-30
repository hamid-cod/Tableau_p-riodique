
$(document).ready(function(){
	function getJson(){
		$.getJSON("data/tp.json", function (data) {
			var ele  = data['elements'];
			var rows = data['rows'];
			var cols = data['cols'];
			var x = '<table>';
			x += '<tr>';
			x += '<td class="periodes-groups"></td>';
			for (var i = 1; i <= cols; i++) {
				x += '<td class="group'+i+' groups">'+i+'</td>';
			}
			x += '</tr>';
			for (var r = 1; r <= rows; r++) {
				x += '<tr class="line'+ r +'">';
				if (r <= 8) { x += '<td class="periode">'+r+'</td>';}
				else {x += '<td class="periode"></td>';}
				for (var c = 1; c <= cols; c++) {
					if (r==1  && c==2) { c = 18; x += '<td class="vide" colspan="16"></td>';}
					if (r==2  && c==3) { c = 13; x += '<td class="vide" colspan="10"></td>';}
					if (r==3  && c==3) { c = 13; x += '<td class="vide" colspan="10"></td>';}
					if (r==6  && c==3) { c =  4; x += '<td class="Lanthanide">57-71</td>';}
					if (r==7  && c==3) { c =  4; x += '<td class="Actinide">89-103</td>';}
					if (r==9  && c==3) { c =  4; x += '<td class="vide"></td><td class="Lanthanide periode6" colspan="2">Lanthanide</td>';}
					if (r==10 && c==3) { c =  4; x += '<td class="vide"></td><td class="Actinide periode7" colspan="2">Actinide</td>';}
					var res = ele.filter(e => e.ypos == r && e.xpos == c);
					if (res && res.length > 0) {
						x += '<td class="element periode'+r+' groups'+c+'">';
						x += '<div class="number">'+res[0].number+'</div>';
						x += '<div class="symbol">'+res[0].symbol+'</div>';
						x += '<div class="name">'+res[0].name+'</div>';
						x += '</td>';
					}
				}
				x += '</tr>';
			}
			x += '</table>';
			$('#show').append(x);
		});
	}
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