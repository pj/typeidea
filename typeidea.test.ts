import * as typeidea from './typeidea';

it('hashTypes generates hashes for types', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const addField2 = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test2'
    ),
    new typeidea.AddAction(
      'asdf',
      null,
      'test_field2',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const hashes = typeidea.hashTypes([addField, addField2], []);
  expect(hashes).toHaveLength(2);

  const hashedAddField = typeidea.addHashes(addField, hashes[0]);
  expect(hashedAddField).toHaveLength(2);
  const hashedAddField2 = typeidea.addHashes(addField2, hashes[1]);
  expect(hashedAddField2).toHaveLength(2);

  for (const hashedAction of hashedAddField) {
    expect(hashedAction.hash).not.toBeNull();
  }
  for (const hashedAction of hashedAddField2) {
    expect(hashedAction.hash).not.toBeNull();
  }

});

it('Changing an action makes hashing invalid', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashes = typeidea.hashTypes([addField], []);
  const hashedAddField = typeidea.addHashes(addField, hashes[0]);
  hashedAddField[0].changeLog = "Don't do this!";
  expect(() => {
    typeidea.hashTypes([hashedAddField], []);
  }).toThrow(/Invalid hash at item \d+ .*, did you change something\?/);
});

it('Changing a hash makes hashing invalid', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashedAddField = typeidea.addHashes(
    addField,
    typeidea.hashTypes([addField], [])[0]
  );
  hashedAddField[0].hash = "Don't do this!";
  expect(() => {
    typeidea.hashTypes([hashedAddField], []);
  }).toThrow(/Invalid hash at item \d+ .*, did you change something\?/);
});

it('Add a field', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];

  const hashes = typeidea.hashTypes([addField], []);
  const hashedAddField = typeidea.addHashes(addField, hashes[0]);

  const types = typeidea.generateTypes([hashedAddField], []);
  expect(types).toHaveLength(1);
  const typescript = typeidea.generateTypescript(types);
  //console.log(typescript);

  expect(typescript[0][1]).toMatchSnapshot();
});

it('Add a field with a default value', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      'A value'
    )
  ];

  const hashes = typeidea.hashTypes([addField], []);
  const hashedAddField = typeidea.addHashes(addField, hashes[0]);

  const types = typeidea.generateTypes([hashedAddField], []);
  expect(types).toHaveLength(1);
  const typescript = typeidea.generateTypescript(types);
  //console.log(typescript);

  expect(typescript[0][1]).toMatchSnapshot();
});

it('Multiple types with type reference', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      null
    )
  ];
  const addField2 = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test2'
    ),
    new typeidea.ReferenceAction(
      'asdf',
      null,
      'test_field2',
      'A reference',
      true,
      'Test',
      // @ts-ignore
      null
    )
  ];

  const hashes = typeidea.hashTypes([addField], []);
  const hashedAddField = typeidea.addHashes(addField, hashes[0]);

  addField2[1].referenceHash = hashedAddField[1].hash;

  const hashes2 = typeidea.hashTypes([addField2], []);
  const hashedAddField2 = typeidea.addHashes(addField2, hashes2[0]);

  const types = typeidea.generateTypes([hashedAddField, hashedAddField2], []);
  const typescript = typeidea.generateTypescript(types);

  expect(typescript[0][1]).toMatchSnapshot();
  expect(typescript[1][1]).toMatchSnapshot();
});

it('Rename a field', () => {
  const addField = [
    new typeidea.NewAction(
      'Creating a new type',
      null,
      'Test'
    ),
    new typeidea.AddAction(
      'Adding a field',
      null,
      'test_field',
      'string',
      'A field that helps testing',
      true,
      'A value'
    ),
    new typeidea.RenameAction(
      'Renaming a field',
      null,
      'test_field',
      'renamed_field'
    )
  ];

  const hashes = typeidea.hashTypes([addField], []);
  const hashedAddField = typeidea.addHashes(addField, hashes[0]);

  const types = typeidea.generateTypes([hashedAddField], []);
  const typescript = typeidea.generateTypescript(types);

  expect(typescript[0][1]).toMatchSnapshot();
});

