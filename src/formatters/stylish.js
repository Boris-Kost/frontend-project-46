import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }

  const lines = Object.entries(data).map(
    ([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const { key, type, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${children
          .map((child) => iter(child, depth + 1))
          .join('\n')}\n${indent(depth)}  }`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'changed': {
        const line1 = `${indent(depth)}- ${key}: ${stringify(oldValue, depth)}`;
        const line2 = `${indent(depth)}+ ${key}: ${stringify(newValue, depth)}`;
        return `${line1}\n${line2}`;
      }
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };

  return `{\n${tree.map((node) => iter(node, 1)).join('\n')}\n}`;
};

export default stylish;
