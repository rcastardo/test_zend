// confirma��o de a��es
(function($){
    $('.confirm-action').click(function(e){
        // previne a a��o padr�o
        e.preventDefault();

        // limpa o conte�do da modal
        $('#confirm-modal .confirm-message').empty();
        $('#confirm-modal .btn-confirm').attr('href', '#');

        // verifica a exist�ncia do atributo 'href'
        if($(this).attr('href') !== undefined){
            // caso positivo define que o link ser� o valor de tal atributo
            var url = $(this).attr('href');
        }
        else{
            // caso contr�rio define que o link ser� o valor do atributo 'data-href'
            var url = $(this).attr('data-href');
        }

        // define a mensagem a ser exibida ao usu�rio
        var mensagem = $(this).attr('data-message');

        // insere o conte�do na modal
        $('#confirm-modal .confirm-message').html(mensagem);
        $('#confirm-modal .btn-confirm').attr('href', url);

        // exibe a modal
        $('#confirm-modal').modal('show');
    });

// carregar conte�do em modal

    $('.carregar-conteudo-modal').click(function(event){
        // previne o comportamento padr�o (abrir link)
        event.preventDefault();

        // modal
        var modalConteudo = $('#modal-conteudo');

        // container do t�tulo da modal
        var tituloModal = $('#modal-conteudo .modal-header h4');

        // container do corpo da modal
        var corpoModal = $('#modal-conteudo .modal-body');

        // resgata o t�tulo
        var titulo = $(this).attr('data-title');

        // resgata a url
        var url = $(this).attr('href');

        // apaga qualquer conte�do existente no t�tulo
        tituloModal.empty();

        // insere o novo t�tulo na modal
        tituloModal.html(titulo);

        // insere �cone de carregando no corpo da modal
        corpoModal.html('<p class="carregando text-center lead"><i class="fa fa-spinner fa-spin"></i> Carregando...</p>');

        // exibe a modal
        modalConteudo.modal('show');

        // verifica se o atributo href � diferente de #
        if(url != '#'){
            // caso positivo exibe o retorno da URL
            $.get(url, function(data){
                corpoModal.html(data);
            }).done(function(data){
                    $('#modal-conteudo .modal-body .carregando').remove();
                }).fail(function(){
                    corpoModal.html(
                        '<div class="alert alert-icon alert-danger">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">�</button>' +
                            '<i class="fa fa-exclamation-triangle fa-4x"></i>' +
                            '<div>' +
                                '<h4>Erro</h4>' +
                                '<p>Ocorreu um erro com a requisi��o, tente novamente.</p>' +
                            '</div>' +
                        '</div>'
                    );
                });
        }
        else{
            // caso contr�rio exibe o definido no atributo "data-content"
            var conteudo = $(this).attr('data-content');
            corpoModal.html(conteudo);
            $('#modal-conteudo .modal-body .carregando').remove();
        }
    });

// adicionar estado de "carregando" � bot�es de submiss�o de formul�rios

    $('form:not(.validar-formulario)').submit(function (){
        var btn = $(this).find('button[type="submit"]');
        btn.attr('data-loading-text', '<i class="fa fa-spinner fa-spin fa-lg"></i> aguarde...');
        btn.button('loading');
    });
})(jQuery);