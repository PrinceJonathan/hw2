// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {


    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()
    $('#search-bar').hide();

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i], i)
        }
    }

    $('#input').on('click', () => {
        var name = $('#input-text').val()
        $.get('https://js.kchen.club/B04502062/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    // 資料庫有回傳資料
                    items = response.items
                    for (var i = 0; i <= items.length; i++) {
                        if (name == items[i].name) {
                            document.getElementById('heroName').innerHTML = items[i].name;
                            document.getElementById('heroAtk').innerHTML = 'Atk: ' + items[i].price;
                            var obj = document.getElementById('modal-img');　　
                            obj.src = items[i].image;
                            console.log('英雄在此')
                            break
                        } else {
                            console.log('英雄尚未招募')
                            $('#exampleModal').modal('show')
                        }
                    }

                } else {
                    $('#heroName').text('查無相關資料')
                    $('#heroPrice').hide()
                    $('#exampleModal').modal('show')
                }
            } else {
                $('#heroName').text('伺服器出錯')
                $('#exampleModal').modal('show')
            }

            console.log(response)
        }, "json")
    })


    var newItem = (item, i) => {
        var btnId = i
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('ATK: ' + item.price)


        $flipCardFront = $('<div>').attr('class', 'flip-card-front').append($img)
        $flipCardEnd = $('<div>').attr('class', 'flip-card-back').append($h3).append($p)
        $flipCardInner = $('<div>').attr('class', 'flip-card-inner').append($flipCardFront).append($flipCardEnd)
        $item = $('<div>').attr('class', 'item').addClass('flip-card').append($flipCardInner)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
            })

            $li = $('<li>').attr('class', 'page-item').append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
    }

    $('#infinityGlove').on('click', function() {
        $('#fingerText').hide()
        $('#search-bar').show()
        $.get('https://js.kchen.club/B04502062/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})