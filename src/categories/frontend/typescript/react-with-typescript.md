# React 与 TypeScript

React 与 TypeScript 的结合可以带来更好的开发体验和代码质量。TypeScript 提供的类型系统可以帮助我们在开发过程中发现错误，提高代码的可维护性和可读性。本章将详细介绍如何在 React 项目中使用 TypeScript，包括项目初始化、组件定义、状态管理、事件处理等。

## 项目初始化
### 1. 使用 Create React App 创建 TypeScript 项目
```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

### 2. 手动配置现有 React 项目支持 TypeScript
```bash
# 安装必要依赖
npm install --save-dev typescript @types/react @types/react-dom @types/node

# 创建 tsconfig.json 文件
npx tsc --init
```

配置 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 组件定义
### 1. 函数组件
```typescript
import React from 'react';

// 定义组件属性类型
interface GreetingProps {
  name: string;
  age?: number; // 可选属性
}

// 函数组件
const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

export default Greeting;
```

### 2. 类组件
```typescript
import React, { Component } from 'react';

// 定义组件属性类型
interface CounterProps {
  initialCount?: number;
}

// 定义组件状态类型
interface CounterState {
  count: number;
}

// 类组件
class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: props.initialCount || 0
    };
  }

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

## 状态管理
### 1. 使用 useState Hook
```typescript
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // 定义状态类型
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: inputText, completed: false }
      ]);
      setInputText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

### 2. 使用 useReducer Hook
```typescript
import React, { useReducer } from 'react';

// 定义动作类型
type ActionType = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_VALUE'; payload: number };

// 定义状态类型
interface CounterState {
  count: number;
}

//  reducer 函数
const reducer = (state: CounterState, action: ActionType): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET_VALUE':
      return { count: action.payload };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'SET_VALUE', payload: 10 })}>Set to 10</button>
    </div>
  );
};

export default Counter;
```

## 事件处理
### 1. 基本事件处理
```typescript
import React from 'react';

const Button: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event);
  };

  return <button onClick={handleClick}>Click me</button>;
};

export default Button;
```

### 2. 表单事件处理
```typescript
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', { name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
```

## 高级主题
### 1. 泛型组件
```typescript
import React from 'react';

// 泛型组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T extends unknown>({ items, renderItem }: ListProps<T>): React.ReactElement => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

// 使用泛型组件
const NumberList: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5];
  return <List<number> items={numbers} renderItem={n => <span>{n}</span>} />;
};

const StringList: React.FC = () => {
  const strings = ['hello', 'world', 'typescript'];
  return <List<string> items={strings} renderItem={s => <span>{s}</span>} />;
};

export default NumberList;
```

### 2. 高阶组件
```typescript
import React, { ComponentType } from 'react';

// 定义高阶组件属性
interface WithLoadingProps {
  isLoading: boolean;
}

// 高阶组件
function withLoading<T extends object>(WrappedComponent: ComponentType<T>) {
  return function WithLoadingComponent(
    props: Omit<T, keyof WithLoadingProps> & WithLoadingProps
  ) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...(props as T)} />;
  };
}

// 使用高阶组件
interface UserListProps {
  users: { id: number; name: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const UserListWithLoading = withLoading<UserListProps>(UserList);

// 在其他组件中使用
const App: React.FC = () => {
  return <UserListWithLoading isLoading={false} users={[{ id: 1, name: 'John' }]} />;
};

export default App;
```

## React 与 TypeScript 最佳实践
1. 为组件属性和状态定义明确的类型。
2. 使用 `React.FC` 或 `React.FunctionComponent` 定义函数组件。
3. 为类组件明确指定 `Props` 和 `State` 类型参数。
4. 使用泛型组件提高代码重用性。
5. 为事件处理函数指定正确的事件类型。
6. 使用 `Omit`、`Pick` 等工具类型简化类型定义。
7. 启用 `strict: true` 编译选项，提高类型安全性。
8. 避免过度使用 `any` 类型。
9. 使用 `useState` 和 `useReducer` 时明确指定状态类型。
10. 为自定义 Hooks 定义返回类型。

## 练习
1. 创建一个使用 TypeScript 的 React 项目。
2. 实现一个带有类型的函数组件和类组件。
3. 使用 `useState` 和 `useReducer` 管理状态，明确指定类型。
4. 处理表单输入，为事件处理函数指定正确的类型。
5. 实现一个泛型组件。
6. 创建一个高阶组件，增强组件功能。
7. 探索其他 React 与 TypeScript 结合的高级用法。

通过本章节的学习，你应该掌握了在 React 项目中使用 TypeScript 的基本方法和最佳实践，能够创建类型安全的 React 组件，提高代码质量和可维护性。