$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="ChatMain__messageBox">
          <div class="ChatMain__messageBox-info">
            <div class="ChatMain__messageBox-info-name">
              ${message.user_name}
            </div>
            <div class="ChatMain__messageBox-info-date">
              ${message.created_at}
            </div>
          </div>
          <div class="ChatMain__messageBox-message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="ChatMain__messageBox">
        <div class="ChatMain__messageBox-info">
          <div class="ChatMain__messageBox-info-name">
            ${message.user_name}
          </div>
          <div class="ChatMain__messageBox-info-date">
            ${message.created_at}
          </div>
        </div>
        <div class="ChatMain__messageBox-message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.ChatMain__message-form-new').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.ChatMain__message-list').append(html);
      $('.ChatMain__message-list').animate({ scrollTop: $('.ChatMain__message-list')[0].scrollHeight});
      $('.ChatMain__message-form-new')[0].reset();
      $('.ChatMain__formBox-sendButton').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});