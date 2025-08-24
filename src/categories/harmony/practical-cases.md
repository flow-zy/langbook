# 鸿蒙开发实战案例分析

## 案例概述：待办事项应用

本案例将开发一个简单的待办事项（Todo List）应用，帮助你掌握鸿蒙应用开发的完整流程。该应用具有以下功能：
- 添加新的待办事项
- 标记待办事项为已完成
- 删除待办事项
- 查看所有待办事项

## 项目结构

使用DevEco Studio创建的待办事项应用项目结构如下：

```
entry/
├── src/
│   ├── main/
│   │   ├── ets/
│   │   │   ├── entryability/
│   │   │   │   └── EntryAbility.ts
│   │   │   ├── pages/
│   │   │   │   └── Index.ets
│   │   │   └── app.ets
│   │   ├── resources/
│   │   │   ├── base/
│   │   │   │   ├── element/
│   │   │   │   ├── media/
│   │   │   │   └── profile/
│   │   │   └── rawfile/
│   │   └── config.json
│   └── test/
└── build.gradle
```

## UI设计

应用界面主要包含以下元素：
- 顶部标题栏
- 待办事项输入框和添加按钮
- 待办事项列表
- 每个待办事项包含文本和操作按钮

## 功能实现

### 步骤1：创建页面布局

在`Index.ets`中创建页面布局：

```typescript
@Entry
@Component
struct Index {
  @State todos: Todo[] = [];
  @State newTodoText: string = '';

  build() {
    Column({
      space: 10
    }) {
      // 标题栏
      Text('待办事项')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .width('100%')
        .textAlign(TextAlign.Center)
        .padding(20)
        .backgroundColor('#007AFF')
        .color(Color.White)

      // 输入框和添加按钮
      Row({
        space: 10
      }) {
        TextField({
          text: this.newTodoText,
          placeholder: '请输入待办事项'
        })
          .width('70%')
          .height(40)
          .onChange((value: string) => {
            this.newTodoText = value;
          })

        Button('添加')
          .width('30%')
          .height(40)
          .backgroundColor('#007AFF')
          .onClick(() => {
            this.addTodo();
          })
      }
      .padding(10)

      // 待办事项列表
      List({
        space: 10
      }) {
        ForEach(this.todos, (todo: Todo) => {
          ListItem() {
            Row({
              space: 10
            }) {
              Checkbox()
                .selected(todo.completed)
                .onChange((isSelected: boolean) => {
                  this.toggleTodoStatus(todo.id);
                })

              Text(todo.text)
                .width('70%')
                .fontSize(16)
                .decoration({ type: todo.completed ? TextDecorationType.LineThrough : TextDecorationType.None })

              Button('删除')
                .width('20%')
                .height(30)
                .backgroundColor(Color.Red)
                .onClick(() => {
                  this.deleteTodo(todo.id);
                })
            }
            .padding(10)
            .backgroundColor(Color.White)
            .borderRadius(10)
            .shadow({
              radius: 5,
              color: '#00000020',
              offsetX: 2,
              offsetY: 2
            })
          }
        })
      }
      .width('100%')
      .padding(10)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  // 添加待办事项
  addTodo() {
    if (this.newTodoText.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: new Date().getTime(),
      text: this.newTodoText,
      completed: false
    };

    this.todos.push(newTodo);
    this.newTodoText = '';
    this.saveTodos();
  }

  // 切换待办事项状态
  toggleTodoStatus(id: number) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos[i].completed = !this.todos[i].completed;
        this.saveTodos();
        break;
      }
    }
  }

  // 删除待办事项
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  // 保存待办事项到存储
  saveTodos() {
    // 将待办事项列表转换为JSON字符串
    const todosJson = JSON.stringify(this.todos);
    // 使用轻量级存储保存
    PreferencesUtil.putString('todos', todosJson);
  }

  // 从存储加载待办事项
  loadTodos() {
    const todosJson = PreferencesUtil.getString('todos', '[]');
    this.todos = JSON.parse(todosJson) as Todo[];
  }

  // 页面加载时执行
  onPageShow() {
    this.loadTodos();
  }
}

// 待办事项接口定义
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

### 步骤2：创建偏好设置工具类

创建一个`PreferencesUtil.ts`工具类，用于简化轻量级存储的操作：

```typescript
import preferences from '@ohos.data.preferences';

class PreferencesUtil {
  private static PREFERENCES_NAME = 'todo_preferences';
  private static preferences: preferences.Preferences | null = null;

  // 初始化偏好设置
  private static async initPreferences() {
    if (!this.preferences) {
      try {
        this.preferences = await preferences.getPreferences(globalThis.abilityContext, this.PREFERENCES_NAME);
      } catch (error) {
        console.error('Failed to initialize preferences:', error);
      }
    }
  }

  // 存储字符串
  static async putString(key: string, value: string) {
    await this.initPreferences();
    if (this.preferences) {
      await this.preferences.putString(key, value);
      await this.preferences.flush();
    }
  }

  // 获取字符串
  static async getString(key: string, defaultValue: string = ''): Promise<string> {
    await this.initPreferences();
    if (this.preferences) {
      return this.preferences.getString(key, defaultValue) || defaultValue;
    }
    return defaultValue;
  }
}

export default PreferencesUtil;
```

### 步骤3：修改应用配置

确保`config.json`中包含必要的权限：

```json
{
  "app": {
    "bundleName": "com.example.todo",
    "vendor": "example",
    "version": {
      "code": 1000000,
      "name": "1.0.0"
    }
  },
  "deviceConfig": {},
  "module": {
    "package": "com.example.todo",
    "name": ".MyApplication",
    "mainAbility": "EntryAbility",
    "deviceType": ["phone", "tablet"],
    "distro": {
      "deliveryWithInstall": true,
      "moduleName": "entry",
      "moduleType": "entry"
    },
    "abilities": [
      {
        "skills": [
          {
            "entities": ["entity.system.home"],
            "actions": ["action.system.home"]
          }
        ],
        "orientation": "unspecified",
        "name": "EntryAbility",
        "icon": "$media:icon",
        "description": "$string:description",
        "label": "$string:label",
        "type": "page",
        "launchType": "standard"
      }
    ]
  }
}
```

## 运行效果

1. 启动应用后，会显示一个带有标题栏的界面
2. 在输入框中输入待办事项，点击"添加"按钮，待办事项会显示在列表中
3. 点击复选框可以标记待办事项为已完成，已完成的项会显示删除线
4. 点击"删除"按钮可以删除待办事项
5. 应用会自动保存待办事项，下次打开时会恢复之前的待办事项

## 代码解析

1. **UI组件使用**：使用了Text、TextField、Button、Checkbox、List等UI组件
2. **状态管理**：使用@State装饰器管理组件状态
3. **数据存储**：使用轻量级存储保存待办事项
4. **事件处理**：处理了按钮点击、复选框变更等事件
5. **生命周期**：使用onPageShow生命周期方法加载数据

## 扩展建议

1. 添加待办事项分类功能
2. 实现待办事项搜索功能
3. 添加待办事项优先级标记
4. 实现待办事项提醒功能
5. 优化UI设计，添加动画效果

通过这个案例，你已经掌握了鸿蒙应用开发的基本流程和核心技能。在实际开发中，你可以根据需求扩展更多功能。