// confirmação de ações
(function($){
    $('.confirm-action').click(function(e){
        // previne a ação padrão
        e.preventDefault();

        // limpa o conteúdo da modal
        $('#confirm-modal .confirm-message').empty();
        $('#confirm-modal .btn-confirm').attr('href', '#');

        // verifica a existência do atributo 'href'
        if($(this).attr('href') !== undefined){
            // caso positivo define que o link será o valor de tal atributo
            var url = $(this).attr('href');
        }
        else{
            // caso contrário define que o link será o valor do atributo 'data-href'
            var url = $(this).attr('data-href');
        }

        // define a mensagem a ser exibida ao usuário
        var mensagem = $(this).attr('data-message');

        // insere o conteúdo na modal
        $('#confirm-modal .confirm-message').html(mensagem);
        $('#confirm-modal .btn-confirm').attr('href', url);

        // exibe a modal
        $('#confirm-modal').modal('show');
    });

// carregar conteúdo em modal

    $('.carregar-conteudo-modal').click(function(event){
        // previne o comportamento padrão (abrir link)
        event.preventDefault();

        // modal
        var modalConteudo = $('#modal-conteudo');

        // container do título da modal
        var tituloModal = $('#modal-conteudo .modal-header h4');

        // container do corpo da modal
        var corpoModal = $('#modal-conteudo .modal-body');

        // resgata o título
        var titulo = $(this).attr('data-title');

        // resgata a url
        var url = $(this).attr('href');

        // apaga qualquer conteúdo existente no título
        tituloModal.empty();

        // insere o novo título na modal
        tituloModal.html(titulo);

        // insere ícone de carregando no corpo da modal
        corpoModal.html('<p class="carregando text-center lead"><i class="fa fa-spinner fa-spin"></i> Carregando...</p>');

        // exibe a modal
        modalConteudo.modal('show');

        // verifica se o atributo href é diferente de #
        if(url != '#'){
            // caso positivo exibe o retorno da URL
            $.get(url, function(data){
                corpoModal.html(data);
            }).done(function(data){
                    $('#modal-conteudo .modal-body .carregando').remove();
                }).fail(function(){
                    corpoModal.html(
                        '<div class="alert alert-icon alert-danger">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                            '<i class="fa fa-exclamation-triangle fa-4x"></i>' +
                            '<div>' +
                                '<h4>Erro</h4>' +
                                '<p>Ocorreu um erro com a requisição, tente novamente.</p>' +
                            '</div>' +
                        '</div>'
                    );
                });
        }
        else{
            // caso contrário exibe o definido no atributo "data-content"
            var conteudo = $(this).attr('data-content');
            corpoModal.html(conteudo);
            $('#modal-conteudo .modal-body .carregando').remove();
        }
    });

// adicionar estado de "carregando" à botões de submissão de formulários

    $('form:not(.validar-formulario)').submit(function (){
        var btn = $(this).find('button[type="submit"]');
        btn.attr('data-loading-text', '<i class="fa fa-spinner fa-spin fa-lg"></i> aguarde...');
        btn.button('loading');
    });
})(jQuery);