const saveEl = document.getElementById('save-el');
const DEFAULT_SAVE = 'Previous entries: ';
const countEl = document.getElementById('count-el');
const ones = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']

let count = 0;
let letters = true;

let previousCounts = localStorage.getItem("previousCounts");
saveEl.textContent = previousCounts || DEFAULT_SAVE;

function increment(x) {
    if( !x ) x = 1;
    count += x;
    countEl.textContent = translate(count);
}

function translate(num) {
    if(num === 0) return 'zero'
    return translateThousands(num)
}

function translateThousands(num) {
    let th = ones[Math.floor(num/1000)];
    if(th !== '') {
        th += " thousand "
    }
    return th + translateHundreds(num%1000);
}

function translateHundreds(num) {
    let h = ones[Math.floor(num/100)];
    if(h !== '') {
        h += " hundred"
    }
    let t = translateTens(num%100);
    if(t ==='') return h;
    if(h ==='') return t;
    return h + ' and ' + t;
}

function translateTens(num) {
    if(num >= 20) {
        let t = tens[Math.floor(num/10)]
        let o = ones[num%10];
        if(o === '') {
            return t;
        }
        return t + '-' + o;
    } else {
        return ones[num];
    }
}

function reset() {
    countEl.textContent = 'zero'
    count = 0
    saveEl.textContent = DEFAULT_SAVE
    localStorage.setItem("previousCounts",'');
}

function save() {
    let countStr = count + ' - '
    saveEl.textContent += countStr
    countEl.textContent = 'zero'
    count = 0
    localStorage.setItem("previousCounts",saveEl.textContent);
}
