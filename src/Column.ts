import 'reflect-metadata';
import { ColumnType } from './ColumnType';

declare interface ColumnAnnotation {
    name?: string;
    nullable?: boolean;
    unique?: boolean;
    length?: number;
    precision?: number;
    scale?: number;
    insertable?: boolean;
    updatable?: boolean;
    type?: string;
}

declare interface EntityColumnAnnotation {
    Column?: Map<string, ColumnAnnotation>;
}

function Column(annotation?: ColumnAnnotation) {
    return (target: any, propertyKey: string) => {
        const columns: EntityColumnAnnotation = target.constructor as EntityColumnAnnotation;
        if (columns.Column == null) {
            columns.Column = new Map();
        }
        const column = columns.Column.get(propertyKey);
        const value: ColumnAnnotation = Object.assign({
            name: propertyKey,
            nullable: true,
            insertable: true,
            updatable: true
        }, column, annotation);
        if (value.type == null) {
            // get metadata
            const r: { name?: string; prototype?: any } = Reflect.getMetadata('design:type', target, propertyKey);
            if (r && r.name) {
                value.type = r.name;
            }
        }
        columns.Column.set(propertyKey, value);
      };
}

function Basic() {
    return Column();
}

export {
    ColumnAnnotation,
    EntityColumnAnnotation,
    Column,
    Basic
}