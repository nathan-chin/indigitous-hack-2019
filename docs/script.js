// target elements with the "draggable" class
interact('.bible-container')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p')

      textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px')
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

var BOOKS = {
"Genesis": 50,
"Exodus": 40,
"Leviticus": 27,
"Numbers": 36,
"Deuteronomy": 34,
"Joshua": 24,
"Judges": 21,
"Ruth": 4,
"1 Samuel": 31,
"2 Samuel":	24,
"1 Kings": 22,
"2 Kings": 25,
"1 Chronicles":	29,
"2 Chronicles":	36,
"Ezra": 10,
"Nehemiah":	13,
"Esther": 10,
"Job": 42,
"Psalm": 150,
"Proverbs":	31,
"Ecclesiastes":	12,
"The Song of Solomon": 8,
"Isaiah": 66,
"Jeremiah":	52,
"Lamentations": 5,
"Ezekiel": 48,
"Daniel": 12,
"Hosea": 14,
"Joel": 3,
"Amos": 9,
"Obadiah": 1,
"Jonah": 4,
"Micah": 7,
"Nahum": 3,
"Habakkuk": 3,
"Zephaniah": 3,
"Haggai": 12,
"Zechariah": 14,
"Malachi": 4,
"Matthew": 28,
"Mark": 16,
"Luke": 24,
"John": 21,
"Acts": 28,
"Romans": 16,
"1 Corinthians": 16,
"2 Corinthians": 13,
"Galatians": 6,
"Ephesians": 6,
"Philippians": 4,
"Colossians": 4,
"1 Thessalonians": 5,
"2 Thessalonians": 3,
"1 Timothy": 6,
"2 Timothy": 4,
"Titus": 3,
"Philemon":	1,
"Hebrews": 13,
"James": 5,
"1 Peter": 5,
"2 Peter": 3,
"1 John": 5,
"2 John": 1,
"3 John": 1,
"Jude":	1,
"Revelation": 22,
}

var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    txt = xmlhttp.response;
    //console.log(txt)
  }
};
xmlhttp.open("GET","../Bible",true);
xmlhttp.send();

window.onload = function () {
    var bookDrop = document.getElementById('book')
    for (var i in BOOKS) {
        console.log(i, BOOKS[i])
        var bEl = document.createElement("option")
        bEl.textContent = i;
        bEl.value = i;
        bookDrop.appendChild(bEl)
    }
};

function showChapters() {
    var bookDrop = document.getElementById('book').value
    var chapDrop= document.getElementById('chapter')
    var count = 1
    for (var i = 0; i < chapDrop.options.length; i++) {
        chapDrop.remove(i)
    }
    while (count <= BOOKS[bookDrop]) {
        var cEl = document.createElement("option")
        cEl.textContent = count;
        cEl.value = count;
        chapDrop.appendChild(cEl)
        count++
    }
}
