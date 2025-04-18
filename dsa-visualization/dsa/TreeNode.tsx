import {BTree_node} from "@/dsa/BTree"
import clsx from 'clsx';

function create_element_style(width? : string) {
    let style = "";
    style = style.concat(       // Sizing
        " ", "h-full", 
        " ", (width !== undefined) ? width : "w-full", 
    );
    style = style.concat(       // Border
        " ", "border",
        " ", "border-solid",
        " ", "border-green-500",
    );
    style = style.concat(       // Display
        " ", "flex",
        " ", "justify-center",
        " ", "items-center",
    );
    return style;
}

function create_node_style() {
    let style = "";
    style = style.concat(       // Border
        " ", "border",
        " ", "border-solid",
        " ", "border-purple-600",
    );
    style = style.concat(       // Display
        " ", "flex",
        " ", "justify-center",
        " ", "items-center",
    );
    style = style.concat()
}


export default function Node_Render(props : {
    node : BTree_node
}) {

    const node = props.node;

    const node_width = "w-[200px]";
    const node_height = "h-[50px]";
    // const element_width = "w-max";

    return (
        <div className={clsx(
            node_width, node_height, 
            "flex flex-row justify-center items-center",
            "border border-solid border-purple-600"
        )}>
            <div className={clsx(
                'flex flex-row justify-center items-center',
                "w-full h-full"
            )}>
                {node.elements.map((e, index) => {
                    return (
                        <p key={e} className={"bg-red-500"}>{e}</p>
                    )
                })}
            </div>
        </div>
    )
}