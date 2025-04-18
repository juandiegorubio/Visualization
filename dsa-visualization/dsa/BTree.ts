import { lightningCssTransformStyleAttribute } from "next/dist/build/swc/generated-native";

type elem_type = number;

export class BTree_node {

    /*** Properties ***/
    min_degree  : number = 1; 
    elements    : elem_type[];
    
    children    : (BTree_node | null)[];
    parent      : BTree_node | undefined;


    constructor(min_degree? : number, elements? : elem_type[], node? : BTree_node) {
        if(node !== undefined) this.copy(node);
        if(min_degree !== undefined) this.set_degree(min_degree);
        
        this.elements = new Array(this.min_degree);
        if(elements !== undefined) {
            if(elements.length == this.min_degree) this.elements = elements;
            else console.error(`Invalid elements. Must be of size ${this.min_degree}`);
        }

        this.children = new Array(this.min_degree).fill(null);
    }

    copy(node : BTree_node) {
        this.set_degree(node.get_degree());
        this.set_elements(node.get_elements());
        this.set_children(node.get_children());
        this.set_parent(node.get_parent()!);
    }

    get_degree()    : number        { return this.min_degree; }
    get_elements()  : elem_type[]   { return this.elements; }
    get_children()  : (BTree_node | null)[]       { return this.children; }
    get_parent()    : (BTree_node | undefined)    { return this.parent; }
    get_child(pos: number) : (BTree_node | null) {
        return this.children[pos];
    }


    set_degree(degree : number) {
        this.min_degree = degree;
    }
    set_elements(elements : elem_type[]) {
        this.elements = elements;
    }
    set_children( children : (BTree_node | null)[] ) {
        this.children = children;
    }
    set_parent( node : BTree_node ) {
        this.parent = node;
    }
    set_child(child : BTree_node, pos: number) {
        this.children.splice(pos, 0, child);
    }

    
    push(e: number) {
        let pos = this.elements.indexOf(e);
        if(pos != -1) {
            console.error(`${e} already exists in the node`);
            return;
        }
        pos = this.elements.findIndex((x) => (x > e));
        if(pos == -1) pos = 0;
        this.elements.splice(pos, 0, e);
        return pos;
    }








};



export default class Tree {
    
    /*** Properties ***/
    root: BTree_node;
    min_degree: number;
    total_nodes: number;

    constructor(min_degree: number) {
        this.root = new BTree_node();
        this.min_degree = min_degree;
        this.total_nodes = 1;
    }

    find_leaf( element: number, node: BTree_node = this.root) : BTree_node {
        let pos : number = node.elements.findIndex( (x) => (x > element) );
        if(pos == -1) console.error(`Error: empty node ${node}`);
        const child : (BTree_node | null) = this.root.get_child(pos);
        if(child == null) return node;
        else return this.find_leaf(element, child);
    }

    insert_in_node(node: BTree_node, element: number) : ({
        node : BTree_node; 
        position : number;
    }[]) {
        const position = node.elements.findIndex((e) => e > element);
        node.elements.splice(position, 0, element);                 // <--- check if this is correct for nodes with children
        let result = [{node, position}];
        if(node.elements.length > 2 * this.min_degree - 1) {
            const new_parent_elem = node.elements[this.min_degree];
            const left_child : BTree_node = new BTree_node;
            const right_child : BTree_node = new BTree_node;

            left_child.elements = node.elements.slice(0, this.min_degree);
            right_child.elements = node.elements.slice(this.min_degree+2, node.elements.length);

            left_child.children = node.children.slice(0, this.min_degree+1);
            right_child.children = node.children.slice(this.min_degree+2, node.children.length);

            // Root case
            if(node.parent === undefined) {
                node.parent = new BTree_node;  
                node.parent.children.push(node);  
            }
            const parent : BTree_node = node.parent;
            const node_pos = parent.children.findIndex((child_node) => child_node === node);
            parent.children.splice(node_pos, 1, left_child, right_child);
            left_child.parent = node.parent;
            right_child.parent = node.parent;

            left_child.min_degree = node.min_degree;
            right_child.min_degree = node.min_degree;

            const parent_result = this.insert_in_node(parent, new_parent_elem);
            result = result.concat(parent_result);
        }
        return result;
    }

    insert(element: number) : ({
        node: BTree_node, 
        position: number
    }[]) {
        const node : BTree_node = this.find_leaf(element);
        const result = this.insert_in_node(node, element);
        return result;
    }

    retrieve_elements(node: BTree_node) : number[] {
        let list : number[] = [];
        for(let i = 0; i < node.elements.length; ++i) {
            if(node.children[i] != null)
                list = list.concat(this.retrieve_elements(node.children[i]!))
            list.push(node.elements[i]);
        }
        return list;
    }
};