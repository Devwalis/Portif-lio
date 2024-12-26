
    document.getElementById('btn-send').addEventListener('click', function() {
        // Captura os valores dos campos
        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var celular = document.getElementById('celular').value;
        var mensagem = document.getElementById('mensagem').value;

        // Formata a mensagem que será enviada
        var texto = `Olá, meu nome é ${nome}.\nMeu e-mail é ${email}.\nMeu celular é ${celular}.\nMensagem: ${mensagem}`;

        // Codifica a mensagem para uso em URL
        var textoCodificado = encodeURIComponent(texto);

        // Cria o link do WhatsApp
        var linkWhatsApp = `https://wa.me/5581983986561?text=${textoCodificado}`;

        // Redireciona para o WhatsApp
        window.open(linkWhatsApp, '_blank');
    });
