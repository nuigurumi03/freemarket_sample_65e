$(document).on('turbolinks:load', function(){
  $(function(){

    //プレビューのhtmlを定義
    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="update-box">
                        <label class="edit_btn">編集</label>
                      </div>
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }

    // ラベルのwidth操作
    function setLabel() {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      setLabel();
      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新
      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        $(`#preview-box__${id}`).remove();
        var image = this.result;
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          //ラベルの直前のプレビュー群にプレビューを追加
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        //イメージを追加
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;
        //プレビューが5個あったらラベルを隠す 
        if (count == 5) { 
          $('.label-content').hide();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        if(count < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${count}`,for: `item_images_attributes_${count}_image`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      //item_images_attributes_${id}_image から${id}に入った数字のみを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();
      console.log("new")
      //フォームの中身を削除 
      $(`#item_images_attributes_${id}_image`).val("");

      //削除時のラベル操作
      var count = $('.preview-box').length;
      //5個めが消されたらラベルを表示
      if (count == 4) {
        $('.label-content').show();
      }
      setLabel(count);

      if(id < 5){
        //削除された際に、空っぽになったfile_fieldをもう一度入力可能にする
        $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      }
    });
  });
});


$(document).on('turbolinks:load', function(){
  $(function(){

    //プレビューのhtmlを定義
    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="update-box">
                        <label class="edit_btn">編集</label>
                      </div>
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }

    // 投稿編集時
    //items/:i/editページへリンクした際のアクション=======================================
    if (window.location.href.match(/\/product\/\d+\/edit/)){
      //登録済み画像のプレビュー表示欄の要素を取得する
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      //プレビューにidを追加
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })
      //削除ボタンにidを追加
      $('.delete-box').each(function(index, box){
        $(box).attr('id', `delete_btn_${index}`);
      })
      var count = $('.preview-box').length;
      //プレビューが5あるときは、投稿ボックスを消しておく
      if (count == 5) {
        $('.label-content').hide();
      }
    }
    //=============================================================================

    // ラベルのwidth操作
    function setLabel() {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      setLabel();

      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新

      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        var image = this.result;
        
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          //ラベルの直前のプレビュー群にプレビューを追加
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        //イメージを追加
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;
        //プレビューが5個あったらラベルを隠す 
        if (count == 5) { 
          $('.label-content').hide();
        }

        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        if(count < 5){
          $('.label-box').attr({id: `label-box--${count}`,for: `item_images_attributes_${count}_image`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $(`#preview-box__${id}`).remove();

      //新規登録時と編集時の場合分け==========================================================

      //新規投稿時
      //削除用チェックボックスの有無で判定
      if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
        //フォームの中身を削除 
        $(`#item_images_attributes_${id}_image`).val("");
        var count = $('.preview-box').length;
        //5個めが消されたらラベルを表示
        if (count == 4) {
          $('.label-content').show();
        }
        setLabel(count);
        if(id < 5){
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});

        }
      } else {

        //投稿編集時
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);
        //5個めが消されたらラベルを表示
        if (count == 4) {
          $('.label-content').show();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        //削除したプレビューのidによって、ラベルのidを変更する
        if(id < 5){
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
        }
      }
      //=============================================================================
    });
  });

  //ファイルを選択すると、class:preview-boxが消える
  $('.hidden-field').on('change',function(){
    console.log('OK')
    $('.preview-box').remove();
  });
});


// $(function(){

//   $('.file_field1').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box1").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
// })

//   $('.file_field2').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box2").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
//   })

//   $('.file_field3').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box3").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
//   })

//   $('.file_field4').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box4").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
//   })

//   $('.file_field5').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box5").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
//   })

//   $('.file_field6').on('change', function(e){
//     var file = e.target.files[0];
//     var reader = new FileReader();
//     reader.onload = (function(e){
//       var ar = new Uint8Array(reader.result);  
//       $(".img_box6").append($("<img class = photo_img>").attr("src", e.target.result));
//   })
//   reader.readAsDataURL(file);
//   })

//   $('.remove_btn1').on('click', function(){
//     $('#image').val('');
//     $('.img_box1').html('');
//   })

//   $('.remove_btn2').on('click', function(){
//     $('#image2').val('');
//     $('.img_box2').html('');
//   })

//   $('.remove_btn3').on('click', function(){
//     $('#image3').val('');
//     $('.img_box3').html('');
//   })

//   $('.remove_btn4').on('click', function(){
//     $('#image4').val('');
//     $('.img_box4').html('');
//   })

//   $('.remove_btn5').on('click', function(){
//     $('#image5').val('');
//     $('.img_box5').html('');
//   })

 

// });

// $(function(){
//   $('.exhibition-form-image-box__file').change(function(e){
//     //fileアップロードで発火
    
//   // var image = $('#show-image').val();
//   var file = e.target.files[0];
//   var reader = new FileReader();
//   reader.onload = (function(file){
//     return function(e){
//       $("#img1").attr("src", e.target.result);
//       //targetでイベント発生源の要素を取得する
//       //imgに属性”src”値#show-imageの返り値
//       $("#img1").attr("title", file.name);
//       var img_src = $('<img>').attr('src', reader.result);
//       $('.image-upload-list li').html(img_src);
      
      
//     };
//   })(file);
//   reader.readAsDataURL(file);
//     // $image.append($('<img>').attr({
//     //   width: "150px",
//     //   class: "preview",
//     // }));
//     // $('.image-upload-list li').clone().appendTo($('.image-upload-list'));
    
  
//   });
// });
// 
// カリキュラム
// $(document).on('turbolinks:load', ()=> {
//   // 画像用のinputを生成する関数
//   const buildFileField = (index)=> {
//     const html = `<div data-index="${index}" class="js-file_group">
//                     <input class="js-file" type="file"
//                     name="product[images_attributes][${index}][image]"
//                     id="product_images_attributes_${index}_src"><br>
//                     <div class="js-remove">削除</div>
//   </div>`;
//     return html;
//   }
//   // プレビュー用のimgタグを生成する関数
//   const buildImg = (index, url)=> {
//     const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
//     return html;
//   }

//   // file_fieldのnameに動的なindexをつける為の配列
//   let fileIndex = [1,2,3,4,5,6,7,8,9,10];
//   // 既に使われているindexを除外
//   lastIndex = $('.js-file_group:last').data('index');
//   fileIndex.splice(0, lastIndex);

//   $('.hidden-destroy').hide();

//   $('#image-box').on('change', '.js-file', function(e) {
//     console.log('OK')
//     const targetIndex = $(this).parent().data('index');
//     // ファイルのブラウザ上でのURLを取得する
//     const file = e.target.files[0];
//     const blobUrl = window.URL.createObjectURL(file);

//     // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
//     if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
//       img.setAttribute('src', blobUrl);
//     } else {  // 新規画像追加の処理
//       $('#previews').append(buildImg(targetIndex, blobUrl));
//       // fileIndexの先頭の数字を使ってinputを作る
//       $('#image-box').append(buildFileField(fileIndex[0]));
//       fileIndex.shift();
//       // 末尾の数に1足した数を追加する
//       fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
//     }
//   });
//   $('#image-box').on('click', '.js-remove', function() {
//     const targetIndex = $(this).parent().data('index');
//     // 該当indexを振られているチェックボックスを取得する
//     const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
//     // もしチェックボックスが存在すればチェックを入れる
//     if (hiddenCheck) hiddenCheck.prop('checked', true);

//     $(this).parent().remove();
//     $(`img[data-index="${targetIndex}"]`).remove();

//     // 画像入力欄が0個にならないようにしておく
//     if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
//   });
// });