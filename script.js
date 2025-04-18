



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

const [w, h] = getViewport();

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


class Node {
    constructor(max_size) {
        this.elements = [10, 1, 1, 1, 1, 1];
        this.left_child = null;
        this.right_child = null;
        this.max_size = max_size;
    }

    add_element(elem) {
        const count = this.elements.push(elem);
        if(count > max_size) console.log("Needs balance!");
    }

    remove_element(elem) {
        const pos = this.elements.find(elem);
        if(pos != undefined) this.elements.po
    }

    set_children(left_child, right_child) {
        if(left_child != null) this.left_child = left_child;
        if(right_child != null) this.right_child = right_child;
    }

    create_content_container(node_elem) {
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
        return container;
    }

    create_node_container(parentElem, type = 'rounded_square') {
        const node = document.createElement('div');
        node.classList.add('node');
        node.classList.add(type);

        this.width = 50 * this.elements.length;
        this.height = 50;
        node.style.width = this.width.toString() + "px";
        node.style.height = this.height.toString() + "px";

        node.style.left = (w/2 - this.width/2).toString() + "px";
        node.style.top = (h/2 - this.height/2).toString() + "px";

        const content_container = this.create_content_container(node);
        node.appendChild(content_container);
        return node;
    }
};


class Tree {
  constructor() {
    const root = new Node();

  }
};






let test = new Node();
const tree_content = document.getElementsByClassName('tree_content')[0];
const node_container = test.create_node_container(tree_content);
tree_content.appendChild(node_container);
tree_content.style.position = "absolute";
tree_content.style.left = (w/2 - tree_content.offsetWidth/2).toString() + "px";
tree_content.style.top = (h/2 - tree_content.offsetHeight/2).toString() + "px";







