const keyBtnList = document.querySelectorAll('.btn-key');
const content = document.querySelector('.content');

var isActive = false;
var valueBefore = '';
var valueAfter = '';
var cal = '';

function reset(x){
    content.innerText = x;
    valueBefore = valueAfter = cal = '';
}

keyBtnList.forEach(function(keyBtn){
    keyBtn.onmousedown = function(){
        if(this.classList.contains('on')){
            isActive = true;
            this.classList.add('light');
            reset('0');
        }
        else if(this.classList.contains('off')){
            isActive = false;
            this.parentElement.querySelector('.on').classList.remove('light');
            reset('');
        }
        else{
            if(isActive){
                this.classList.add('mouse-down');
            }
        }
    }

    keyBtn.onmouseup = function(){
        if(isActive && !this.classList.contains('on')){
            this.classList.remove('mouse-down');
            if(this.classList.contains('number')||this.classList.contains('cham')){
                if(cal == ''){
                    valueBefore += this.innerText;
                }
                else{
                    valueAfter += this.innerText;
                }
                content.innerText = (valueBefore + cal + valueAfter);
            }
            else if(this.classList.contains('cal')){
                cal += this.innerText;
                content.innerText = (valueBefore + cal + valueAfter);
            }
            else if(this.classList.contains('show')){
                var left = parseFloat(valueBefore);
                var right = parseFloat(valueAfter);
                switch(cal){
                    case '*':
                        valueBefore = left * right;
                        break;
                    case '-':
                        valueBefore = left - right;
                        break;
                    case '+':
                        valueBefore = left + right;
                        break;
                    case ':':
                        valueBefore = left / right;
                        break;        
                }
                cal = '';
                valueAfter = '';
                localStorage.setItem('ans',valueBefore.toString());
                content.innerText = (valueBefore + cal + valueAfter);
            }
            else if(this.classList.contains('del')){
                if(cal == '' && valueBefore.toString() != '') {
                    valueBefore = valueBefore.toString().slice(0,-1);
                }
                else if(cal != '' && valueAfter.toString() != '') {
                    valueAfter = valueAfter.toString().slice(0,-1);
                }
                content.innerText = (valueBefore + cal + valueAfter);
            }
            else if(this.classList.contains('ans')){
                valueBefore = localStorage.getItem('ans');
                content.innerText = valueBefore;
            }
        }
        
    }
});