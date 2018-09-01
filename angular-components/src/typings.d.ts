/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

declare module "json-cycle" {
    function retrocycle(json: any): any;
    function decycle(json: any): any;
}

declare module "*.json" {
    export const content: any;
    export default content;
}
