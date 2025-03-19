const [w, h] = getViewport();




class Node {
    constructor() {
        this.elements = [10, 1, 1, 1, 1, 1];
        this.left_child = null;
        this.right_child = null;
    }


    printElements(node_elem) {
        const container = document.createElement('div');
        container.classList.add('node_content');
        for(let i=0; i < this.elements.length; ++i) {
            const elem = document.createElement('p');
            elem.classList.add("node_element")
            elem.textContent = this.elements[i].toString();
            elem.style.width = (100 / this.elements.length).toString() + "%";
            elem.style.height = (100).toString() + "%";
            container.appendChild(elem);
        }
        node_elem.appendChild(container);
    }

    printNode(parentElem, type = 'rounded_square') {
        const node = document.createElement('div');
        node.classList.add('node');
        node.classList.add(type);

        this.width = 50 * this.elements.length;
        this.height = 50;
        node.style.width = this.width.toString() + "px";
        node.style.height = this.height.toString() + "px";

        node.style.left = (w/2 - this.width/2).toString() + "px";
        node.style.top = (h/2 - this.height/2).toString() + "px";


        this.printElements(node);
        parentElem.appendChild(node);
    }
};


let test = new Node();
const tree_content = document.getElementsByClassName('tree_content')[0];
test.printNode(tree_content);
tree_content.style.position = "absolute";
tree_content.style.left = (w/2 - tree_content.offsetWidth/2).toString() + "px";
tree_content.style.top = (h/2 - tree_content.offsetHeight/2).toString() + "px";





function canvasTest() {
  const canvas = document.createElement('canvas');
  const body = document.getElementsByTagName('body');
  body.width = w
  body.height = h

  canvas.width = body.width / 1;
  canvas.height = body.height / 1;
  const size = Math.min(canvas.width, canvas.height);
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const rad = (size / 2) - (size / 20);

  // ctx.arc(canvas.width / 2, canvas.height / 2, rad, 0, Math.PI * 2);

  let array = [1, 2, 3, 4];

  const rect_w = 50;
  const rect_h = 50;
  const array_w = rect_w * array.length
  const offset = canvas.width / 2 - array_w / 2;

  for(let i=0; i < array.length; ++i) {
    let x = offset + i * rect_w;
    let y = canvas.height / 2 - (rect_h / 2);
    console.log(array.length);
    ctx.strokeRect( 
        x, 
        y,
        rect_w, 
        rect_h
    );

    ctx.strokeText(i, offset + i * rect_w + rect_w/2.15, canvas.height / 2);
  }
}


function getViewport() {

    var viewPortWidth;
    var viewPortHeight;
   
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
      viewPortWidth = window.innerWidth,
      viewPortHeight = window.innerHeight
    }
   
   // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
       viewPortWidth = document.documentElement.clientWidth,
       viewPortHeight = document.documentElement.clientHeight
    }
   
    // older versions of IE
    else {
      viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
      viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}