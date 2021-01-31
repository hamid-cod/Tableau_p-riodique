
$(document).ready(function(){
	function tableau_periodique(file, selector) {
		var url = file;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
	      var data = JSON.parse(this.responseText);
	      var ele  = data['elements'];
				var rows = data['rows'];
				var cols = data['cols'];
				var result;
				var x = '';
				x += '<table>';
				x += '<thead>';
				x += '<tr>';
				for (var i = 0; i <= cols; i++){
					if (i==0) {x += '<th class="vide group period"></th>';}
					else {x += '<th class="group col'+i+'">'+ i +'</th>';}
				}
				x += '</tr>';
				x += '</thead>';
				x += '<tbody>';
				for (var r = 1; r <= rows; r++) {
					x += '<tr>';
					if (r <= 7) {x += '<td class="period row'+r+'">'+r+'</td>';}
					else if (r == 8) {
						x += '<td class="vide period"></td>';
					}
					else if (r == 9) {
						x += '<td class="vide period"></td><td colspan="2" class="Lanthanide">'+ele[56].category+'</td>';
					}
					else if (r == 10) {
						x += '<td class="vide period"></td><td colspan="2" class="Actinide">'+ele[88].category+'</td>';
					}
					// else {x += '<td class="vide"></td>';}
					for (var c = 1; c <= cols; c++) {
						result = ele.filter(ele => ele.ypos == r && ele.xpos == c);
						if (result[0] === undefined) { 
							if (r == 9 || r == 10) {}
							else {x += '<td class="vide"></td>';}
						}
						else{ 
							x += '<td class="element row'+((r>7)?(r-3):r)+' col'+((r>7)?3:c)+' '+ ((r>8&&r==9)?'lanthanide':'')+((r>8&&r==10)?'actinide':'') +'">';
								x += '<div class="z">';
									x += '<span class="number">'+result[0].number+'</span>';
									x += '<span class="phase">'+result[0].phase+'</span>';
								x += '</div>';
								x += '<div class="symbol"><span>'+result[0].symbol+'</span></div>';
								x += '<div class="name"><span>'+result[0].nom+'</span></div>';
							x += '</td>';
						}
					}
					x += '</tr>';
				}
				x += '</tbody>';
				x += '</table>';
				$(selector).append(x);
				$('.group').hover(
					function() {
						$('.col'+$(this).html()).css('background-color','rgba(255,0,0,0.5)');
					},
					function() {
						$('.col'+$(this).html()).removeAttr('style');
					}
				);
				$('.period').hover(
					function() {
						$('.row'+$(this).html()).css('background-color','rgba(255, 242, 0, 0.7)');
					},
					function() {
						$('.row'+$(this).html()).removeAttr('style');
					}
				);
				$('.Lanthanide').hover(
					function() {
						$('.Lanthanide,.lanthanide').css('background-color','orange');
					},
					function() {
						$('.Lanthanide,.lanthanide').removeAttr('style');
					}
				);
				$('.Actinide').hover(
					function() {
						$('.Actinide,.actinide').css('background-color','#fdcb6e');
					},
					function() {
						$('.Actinide,.actinide').removeAttr('style');
					}
				);
				$('.element').click(function() {
					var n = $(this).find(".number").html() - 1;
					Swal.fire({
					  title: '<strong><u>'+ele[n].nom+'</u></strong>',
					  html:
					  	'<table class="table table-striped">'+
						    '<tr><td>Nombre atomique </td><td><b>'+ele[n].number+'</b></td></tr>' +
						    '<tr><td>Symbole </td><td><b>'+ele[n].symbol+'</b></td></tr>' +
						    '<tr><td>Configuration electronique </td><td><b>'+ele[n].electron_configuration_semantic+'</b></td></tr>' +
						    '<tr><td>Etat physique </td><td><b>'+((ele[n].phase != 'Gas')?ele[n].phase+'e':ele[n].phase)+'</b></td></tr>'+
					    '</table>',
					  showCloseButton: true,
  					showCancelButton: true,
					  confirmButtonText:
					    '<a href="'+ele[n].source+'" target="_blank"> Plus d\'info</a>',
					  cancelButtonText: 'No'
					});
				});
		  }
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}
	tableau_periodique("data/tp.json", "#show");
	
});