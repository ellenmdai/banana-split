declare module "*.json" {
    const value: any;
    export default value;
}

declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}