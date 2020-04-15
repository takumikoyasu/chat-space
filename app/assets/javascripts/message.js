$(function(){
    function buildHTML(message){
      if (message.content && message.image) {
        var html =
         `<div class="messages">
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
        var html =
         `<div class="messages">
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
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-messages').append(html);
      $('.chat-messages').animate({ scrollTop: $('.chat-messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
})
});

