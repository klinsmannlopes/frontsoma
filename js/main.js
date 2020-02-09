$(document).ready(function(){
    $("#div-extrato").css("display", "");
  });

$(function(){

    var requestSaldo = $.ajax({
        method:"GET",
        url:"http://localhost:8080/backapisoma/api/saldo",
        data:{listAll:"list"},
        dataType:"json"
    });

    var requestExtrato = $.ajax({
        method:"GET",
        url:"http://localhost:8080/backapisoma/api/extrato",
        data:{listAll:"list"},
        dataType:"json"
    });

    var requestList = $.ajax({
        method:"GET",
        url:"http://localhost:8080/backapisoma/api/funcionario",
        data:{listAll:"list"},
        dataType:"json"
    });
    requestList.done(function(e){
        console.log(e);
        var table = '<thead class="thead-dark"><tr><th scope="col">Matrícula</th><th scope="col">Nome</th><th scope="col">Função</th></tr></thead><tbody>';
        for(var k in e){
            table += '<td>'+e[k].matricula+'</td>';
            table += '<td>'+e[k].nome+'</td>';
            table += '<td>'+e[k].funcao+'</td></tr>';
        }
        table +='</tbody>';
        $('#extratos').html(table);
    });
    

    

    $("#extrato").click(function() {
        requestExtrato.done(function(e){
            console.log(e);
            var table = '<thead class="thead-dark"><tr><th scope="col">Data Operação</th><th scope="col">Tipo Operação</th><th scope="col">Valor Operação</th></tr></thead><tbody>';
            for(var k in e){
                table += '<td>'+e[k].data+'</td>';
                table += '<td>'+e[k].operacacao+'</td>';
                if(e[k].valor > 0) {
                    console.log();
                    table += '<td class="text-success">'+e[k].valor+'</td></tr>';
                } else {
                    table += '<td class="text-danger">'+e[k].valor+'</td></tr>';
                }
                
            }
            table +='</tbody>';
            $('#extratos').html(table);
            
        });
        
        requestSaldo.done(function(e){

            if(e > 0) {
                var saldo = '<h2 >Saldo: R$ <span class="text-success"">'+e+'</span></h2>'
            } else {
                var saldo = '<h2 >Saldo: R$ <span class="text-danger">'+e+'</span></h2>'
            }

            $('#saldo').html(saldo);
            
        });
    });

    $("#funcionario").click(function() {
        
        requestList.done(function(e){
            var table = '<thead class="thead-dark"><tr><th scope="col">Matrícula</th><th scope="col">Nome</th><th scope="col">Função</th></tr></thead><tbody>';
            for(var k in e){
                table += '<td>'+e[k].matricula+'</td>';
                table += '<td>'+e[k].nome+'</td>';
                table += '<td>'+e[k].funcao+'</td></tr>';
            }
            table +='</tbody>';
            $('#extratos').html(table);
        });

        var saldo = '';
        $('#saldo').html(saldo);

    });
});


