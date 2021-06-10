const TYPES = {
    SampleService: Symbol.for('SampleService'),
    SampleRepository: Symbol.for('SampleRepository'),
    CrudRepository: Symbol.for('CrudRepository'),
    IRepository: Symbol.for('IRepository'),
    MongodbClient: Symbol.for('MongodbClient')
};

export default TYPES;
