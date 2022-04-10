import { Args, ConfigurationBase } from '@themost/common';
import { EntityTypeAnnotation, EntityLoaderStrategy } from '@themost/jspa';

class DefaultEntityLoaderStrategy extends EntityLoaderStrategy {

    constructor(config: ConfigurationBase) {
        super(config);
        const values = config.getSourceAt('settings/jspa/imports') || [];
        Args.check(Array.isArray(values), new Error('Invalid configuration. The persistent annotation imports, defined by `settings/jspa/imports`, must be an array of modules.'));
        this.imports = values.map((item: string) => require(item));
    }
}

export {
    DefaultEntityLoaderStrategy
}