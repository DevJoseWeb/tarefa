declare module "*.json" {
    export const content: any;
    export default content;
}
declare const $project: {
    app: string;
    domain: string;
    service: string;
    serviceDependencies: ServiceDependency[];
};

declare class ServiceDependency {
    service: string;
    version: string;
}

declare const $version: string;

declare const $name: string;

declare const $locales: string;
