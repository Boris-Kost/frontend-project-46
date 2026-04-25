import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node
      .map((item) => {
        const fullPath = path === '' ? item.key : `${path}.${item.key}`;

        switch (item.type) {
          case 'nested':
            return iter(item.children, fullPath);
          case 'added':
            return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`;
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`;
          case 'unchanged':
            return null;
          default:
            throw new Error(`Unknown type: ${item.type}`);
        }
      })
      .filter((line) => line !== null);

    return lines.join('\n');
  };

  return iter(tree, '');
};

export default plain;
