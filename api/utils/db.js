const fs = require('fs').promises;
const uuid4 = require('uuid').v4;

const COLLECTIONS_PATH = 'data/';

const removeUndefinedProps = data => JSON.parse(JSON.stringify(data));

const readDataFrom = async collection => {
  let data = [];
  const filePath = COLLECTIONS_PATH + collection;
  try {
    const temp = await fs.readFile(filePath);
    data = JSON.parse(temp.toString()) || [];
  } catch { }
  return data;
};

const writeDataTo = async (collection, data) => {
  const filePath = COLLECTIONS_PATH + collection;
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const insertManyHOF = collection => async entityData => {
  const data = await readDataFrom(collection);
  const entities = entityData.map(entity => ({
    ...removeUndefinedProps(entity),
    id: uuid4(),
  }));
  data.push(...entities);
  await writeDataTo(collection, data);
  return entities;
};

const insertOneHOF = collection => async entityData => {
  const data = await readDataFrom(collection);
  const entity = {
    ...removeUndefinedProps(entityData),
    id: uuid4(),
  };
  data.push(entity);
  await writeDataTo(collection, data);
  return entity;
};

const findHOF = collection => async (query = {}, { skip = 0, limit = Infinity } = {}) => {
  const data = await readDataFrom(collection);

  const filteredData = data
    .filter(entity => {
      let result = true;
      for (const key of Object.keys(query)) {
        if (query[key] !== entity[key]) {
          result = false;
          break;
        }
      }
      return result;
    });

  return {
    total: filteredData.length,
    data: filteredData.slice((+skip), (+skip) + (+limit))
  };
};

const findByIdHOF = collection => async id => {
  const data = await readDataFrom(collection);
  return data.find(entity => entity.id === id);
};

const updateByIdHOF = collection => async (id, entityData) => {
  const data = await readDataFrom(collection);
  const entity = data.find(entity => entity.id === id);
  if (entity)
    Object.assign(entity, removeUndefinedProps(entityData));
  await writeDataTo(collection, data);
  return entity;
};

const deleteByIdHOF = collection => async id => {
  const data = await readDataFrom(collection);
  let result = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data.splice(i, 1);
      result = true;
      break;
    }
  }
  await writeDataTo(collection, data);
  return result;
};

const getCollection = collection => ({
  insertMany: insertManyHOF(collection + '.json'),
  insertOne: insertOneHOF(collection + '.json'),
  find: findHOF(collection + '.json'),
  findById: findByIdHOF(collection + '.json'),
  updateById: updateByIdHOF(collection + '.json'),
  deleteById: deleteByIdHOF(collection + '.json'),
});

const dropCollection = async collection => {
  const filePath = COLLECTIONS_PATH + collection + '.json';
  try {
    await fs.unlink(filePath);
  } catch { }
};

module.exports = {
  getCollection,
  dropCollection,
};
