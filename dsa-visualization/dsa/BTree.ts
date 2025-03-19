class TreeNode {

    /*** Properties ***/
    elements: number[];
    left_child: TreeNode | null;
    right_child: TreeNode | null;


    constructor(elements: number[] = [1,2,3,4,5]) {
        this.elements = elements;
        this.left_child = null;
        this.right_child = null;
    }

    set_children(
        left_child: TreeNode | null = null, 
        right_child: TreeNode | null = null
    ) {
        this.left_child = left_child;
        this.right_child = right_child;
    }

    find_position(element: number) : number {
        let i: number = 0;
        while( i < this.elements.length && element > this.elements[i] ) i++;
        return i;
    }

    find(element: number) : number {
        const pos : number = this.find_position(element);
        if( element === this.elements[pos] ) return pos;
        else return -1;
    }


};



class Tree {
    
    /*** Properties ***/
    root: TreeNode;
    max_node_size: number;
    tree_depth: number;


    constructor(max_size: number) {
        this.root = new TreeNode();
        this.max_node_size = max_size;
        this.tree_depth = 1;
    }

    _find_leaf(element: number, node: TreeNode) {
        const pos : number = node.find()

    }

    find_leaf(element: number) {

    }


    insert(element: number) {

    }

};