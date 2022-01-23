import { ColumnAnnotation } from './Column';

declare interface AttributeOverrideAnnotation {
    name: string;
    column: ColumnAnnotation;
}

declare interface EntityAttributeOverrideAnnotation {
    AttributeOverrides?: AttributeOverrideAnnotation[];
}

function AttributeOverride(annotation?: AttributeOverrideAnnotation) {
    return (target: any) => {
        const entity = target as EntityAttributeOverrideAnnotation;
        entity.AttributeOverrides = entity.AttributeOverrides || [];
        entity.AttributeOverrides.push(annotation);
    };
}

export {
    AttributeOverrideAnnotation,
    EntityAttributeOverrideAnnotation,
    AttributeOverride
}