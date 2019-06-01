$('#2').on('click', function() {
    // var x = document.getElementsByClassName('btn btn-primary iDecided')[0].id
    document.getElementById('heroName').innerHTML = items[2].name;
    document.getElementById('heroAtk').innerHTML = items[2].price;
    var obj = document.getElementById('modal-img');　　
    obj.src = items[i].image;
    console.log('dfsafsdafsdff')
})