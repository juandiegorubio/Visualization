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

    set_child(child : TreeNode, pos: number) {
        this.children.splice(pos, 0, child);
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
    node_max_size: number;
    total_nodes: number;

    constructor(node_max_size: number) {
        this.root = new TreeNode();
        this.node_max_size = node_max_size;
        this.total_nodes = 1;
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
        node: TreeNode, 
        position: number
    }) {
        let node : TreeNode = this.find_leaf(element);
        let pos : number = node.push(element);
        if(node.length() > this.node_max_size) {
            this.split_leaf(node);
        }
        return {node: node, position: pos};
    }

    split_leaf(node: TreeNode) {

        if(node.parent == null) node.parent = new TreeNode();
        const parent : TreeNode = node.parent;
        
        if(parent.length() == this.node_max_size) { // We need to split parent
            // TODO
        }
        
        else {
            const middle = Math.floor(node.length() / 2);
            const pos = parent.push(middle);
            const right_node : TreeNode = new TreeNode();
            for(let i = middle+1; i < node.length(); ++i) 
                right_node.push(node.elements[i]);
            right_node.parent = parent;
            right_node.depth = parent.depth+1;
            parent.set_child(right_node, pos+1);
        }
    }

    // TODO: related to balance in split function
    find_min_depth() : number {
        return 0;
    }


    balance(node: TreeNode) {
        let balance_root : TreeNode = node;
        while(balance_root.parent != null && balance_root.parent.length() == this.node_max_size) 
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