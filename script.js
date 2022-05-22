async function updateSoil(val){
    var prog = document.getElementById("progresssoil");
    prog.parentNode.style.width = `${val}%`;
    if(val > 40){
        prog.parentNode.style.backgroundColor = "#55e9d5";
    }else {
        prog.parentNode.style.backgroundColor = "#e06031";
    }
    prog.innerText = `${val}%`;
}

async function updateAir(val){
    var prog = document.getElementById("progressair");
    if(val < 100){
        prog.parentNode.style.width = `${val}%`;
    }else {
        prog.parentNode.style.width = `100%`;
    }
    if(val > 40){
        prog.parentNode.style.backgroundColor = "#55e9d5";
    }else {
        prog.parentNode.style.backgroundColor = "#e06031";
    }
    prog.innerText = `${val}%`;
}

async function updateTemp(val){
    var prog = document.getElementById("progresstemp");
    prog.parentNode.style.width = `${val*2}%`;
    if(val > 25){
        prog.parentNode.style.backgroundColor = "#e06031";
    }else {
        prog.parentNode.style.backgroundColor = "#55e9d5"; 
    }
    prog.innerText = `${val} ํC`;
}

setTimeout(function(){
    updateSoil(70);
    updateAir(20);
    updateTemp(40);
    setTimeout(function(){
        updateSoil(0);
        updateAir(80);
        updateTemp(10);
    }, 500); 
}, 500); 

window.updateSoil = updateSoil;

/*Dropdown Menu*/
$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/