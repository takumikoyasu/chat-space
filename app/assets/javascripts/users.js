$(function() {
  function findUser(user) {
    const html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`
    $("#user-search-result").append(html);
  }
  function noFindUser() {
    const html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`
    $("#user-search-result").append(html);
  }
  function deleteAdd (userId, userName) {
    const html =
          `<div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${userId}'>
            <p class='chat-group-user__name'>${userName}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>`
    $(".js-add-user").append(html);
  }
  function deleteGroupUser (userId) {
    const html =
          `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    const input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            findUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          noFindUser();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    const userName = $(this).data("user-name");
    const userId = $(this).data("user-id");
    $(this).parent().remove();
    deleteAdd(userId, userName);
    deleteGroupUser(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});


