import { InjectionToken } from "@angular/core";

export const RESOURCES = new InjectionToken<Resources>("RESOURCES");
export type Resources = Resource[];

export class Resource {
    public name: string;
    public actions: string[];
    public uri: string;
}
