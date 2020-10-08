const baseModel = (schema, options = {}) => {
  if (schema.options.typeKey !== '$type') {
    throw new Error(
      'Every schema must use $type as the typeKey, see https://mongoosejs.com/docs/guide.html#typeKey',
    );
  }

  if (options.timestamp) {
    schema.add({
      createdAt: {
        $type: Date,
        default: Date.now(),
      },
      updatedAt: {
        $type: Date,
        default: Date.now(),
      },
    });
  }

  if (options.timestamp) {
    schema.pre('save', function updateUpdatedAt(next) {
      if (!this.isNew) this.updatedAt = Date.now();
      next();
    });

    schema.pre('update', function preUpdateModel() {
      this.update({}, { $set: { updatedAt: new Date() } });
    });
  }

  const privateFields = ['__v'];

  if (Array.isArray(options.private)) privateFields.push(...options.private);

  if (!schema.options.toJSON) schema.options.toJSON = {};

  schema.options.toJSON.transform = function transformToObject(doc, plainObj) {
    // Remove private fields.
    privateFields.forEach((fieldPath) => {
      delete plainObj[fieldPath];
    });

    // Replace _id with id.
    plainObj.id = plainObj._id.toString(); // eslint-disable-line no-underscore-dangle
    delete plainObj._id; // eslint-disable-line no-underscore-dangle

    return { id: plainObj.id, ...plainObj };
  };
};

export default baseModel;
