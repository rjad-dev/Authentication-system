import { RouterClass } from "../api/classes";

export interface IRouteInterface {
  segment: string;
  provider: any | RouterClass;
  serializable?: boolean;
}