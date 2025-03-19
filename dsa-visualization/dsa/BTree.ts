export class TreeNode {

    /*** Properties ***/
    elements: number[];
    children: (TreeNode | null)[];
    parent: TreeNode | null;
    depth: number;


    constructor(size: number = 2) {
        this.elements = [];
        this.children = [null];
        this.parent = null; 
        this.depth = 0;
    }

    get_child(
        pos: number
    ) : (TreeNode | null) {
        return this.children[pos];
    }

    find_interval(
        element: number
    ) : number {
        let i: number = 0;
        while( i < this.elements.length && element > this.elements[i] ) i++;
        return i;
    }

    find(
        element: number
    ) : number {
        const pos : number = this.find_interval(element);
        if(pos == this.elements.length || element != this.elements[pos]) return -1;
        else return pos;
    }

    push(
        element: number
    ) : number {
        const pos : number = this.find_interval(element);
        this.elements.splice(pos, 0, element);
        return pos;
    }

    length() : number {
        return this.elements.length;
    }

};



export default class Tree {
    
    /*** Properties ***/
    root: TreeNode;
    max_size: number;


    constructor(max_size: number) {
        this.root = new TreeNode();
        this.max_size = max_size;
    }

    find_leaf(
        element: number, 
        node: TreeNode = this.root
    ) : TreeNode {
        const pos : number = node.find_interval(element);
        const child : (TreeNode | null) = this.root.get_child(pos);
        if(child == null) return node;
        else return this.find_leaf(element, child);
    }


    insert(element: number) : ({
        leaf: TreeNode, 
        position: number
    }) {
        let leaf : TreeNode = this.find_leaf(element);
        const pos : number = leaf.push(element);
        if(leaf.length() > this.max_size) leaf = this.split(leaf);
        return {leaf, position: pos};
    }

    split(leaf: TreeNode) : TreeNode {
        const middle : number = Math.floor(leaf.length() / 2);

        // Left leaf
        const left_child : TreeNode = new TreeNode();
        for(let i=0; i < middle; ++i) left_child.push(leaf.elements[i]);
        left_child.parent = leaf;
        left_child.depth = leaf.depth+1;
        leaf.children.push(left_child);
        
        // Right leaf
        const right_child : TreeNode = new TreeNode();
        for(let i=middle+1; i < leaf.length(); ++i) right_child.push(leaf.elements[i]);
        right_child.parent = leaf;
        right_child.depth = leaf.depth+1;
        leaf.children.push(right_child);

        // TODO: balance if deepest leaf is way deeper than expected
        return leaf;
    }

    // TODO: related to balance in split function
    find_min_depth() : number {
        return 0;
    }


    balance(node: TreeNode) {
        let balance_root : TreeNode = node;
        while(balance_root.parent != null && balance_root.parent.length() == this.max_size) 
            balance_root = balance_root.parent;
        
        const tree_elements : number[] = this.retrieve_elements(balance_root);


        console.log("BTree balanced!");
    }


    retrieve_elements(node: TreeNode) : number[] {
        let list : number[] = [];
        for(let i = 0; i < node.length(); ++i) {
            if(node.children[i] != null)
                list = list.concat(this.retrieve_elements(node.children[i]!))
        }
        return [];
    }
};