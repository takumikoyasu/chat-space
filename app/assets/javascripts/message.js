$(function(){
    function buildHTML(message){
      if (message.content && message.image) {
        const html =
         `<div class="messages" data-message-id=${message.id}>
            <div class="message">
              <div class="message__user-name">
                ${message.user_name}
              </div>
              <div class="message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-text">
              <p class="content">
                ${message.content}
              </p>
            </div>
            　<img class="message-text__image" src=${message.image} ></img>
          </div>`
          return html;
      } else {
        const html =
         `<div class="messages" data-message-id=${message.id}>
            <div class="message">
              <div class="message__user-name">
                ${message.user_name}
              </div>
              <div class="message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-text">
              <p class="content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
      const formData = new FormData(this);
      const url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(data){
      const html = buildHTML(data);
      $('.chat-messages').append(html);
      $('.chat-messages').animate({ scrollTop: $('.chat-messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    }) 
  })

  const reloadMessages = function() {
    const last_message_id = $('.messages:last').data("message-id");
    $.ajax({
      url: `api/messages#index {:format=>"json"}`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      const insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-messages').append(insertHTML);
      $('.chat-messages').animate({ scrollTop: $('.chat-messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

