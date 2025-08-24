# I/O操作

I/O(输入/输出)操作是Java程序与外部世界交互的重要方式，包括文件读写、网络通信、键盘输入、屏幕输出等。Java提供了丰富的I/O类库，位于`java.io`包中。

## I/O操作概述

### 什么是I/O操作
I/O操作是指程序与外部设备之间的数据传输，如读取文件、写入文件、网络通信等。

### I/O操作的分类
根据数据传输的单位，I/O操作可以分为：
- 字节流：以字节为单位传输数据，适用于所有类型的文件。
- 字符流：以字符为单位传输数据，适用于文本文件。

根据数据传输的方向，I/O操作可以分为：
- 输入流：从外部设备读取数据到程序。
- 输出流：从程序写入数据到外部设备。

## 字节流

字节流是以字节为单位传输数据的流，主要包括`InputStream`和`OutputStream`两个抽象类。

### InputStream
`InputStream`是所有字节输入流的父类，定义了读取字节的基本方法：

```java
public abstract class InputStream implements Closeable {
    // 读取一个字节
    public abstract int read() throws IOException;

    // 读取多个字节到数组
    public int read(byte[] b) throws IOException {
        return read(b, 0, b.length);
    }

    // 读取多个字节到数组的指定位置
    public int read(byte[] b, int off, int len) throws IOException {
        // ...
    }

    // 跳过指定字节数
    public long skip(long n) throws IOException {
        // ...
    }

    // 可用字节数
    public int available() throws IOException {
        return 0;
    }

    // 关闭流
    public void close() throws IOException {
    }

    // ... 其他方法
}
```

### OutputStream
`OutputStream`是所有字节输出流的父类，定义了写入字节的基本方法：

```java
public abstract class OutputStream implements Closeable, Flushable {
    // 写入一个字节
    public abstract void write(int b) throws IOException;

    // 写入数组中的所有字节
    public void write(byte[] b) throws IOException {
        write(b, 0, b.length);
    }

    // 写入数组中的指定字节
    public void write(byte[] b, int off, int len) throws IOException {
        // ...
    }

    // 刷新流
    public void flush() throws IOException {
    }

    // 关闭流
    public void close() throws IOException {
    }

    // ... 其他方法
}
```

### 常用字节流实现类

#### FileInputStream和FileOutputStream
`FileInputStream`用于从文件读取字节，`FileOutputStream`用于向文件写入字节。

```java
// 文件输入流
try (FileInputStream fis = new FileInputStream("input.txt")) {
    int data;
    while ((data = fis.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 文件输出流
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String content = "Hello, World!";
    fos.write(content.getBytes());
} catch (IOException e) {
    e.printStackTrace();
}
```

#### BufferedInputStream和BufferedOutputStream
缓冲流可以提高I/O性能，通过减少磁盘访问次数来实现。

```java
// 缓冲输入流
try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("input.txt"))) {
    int data;
    while ((data = bis.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 缓冲输出流
try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("output.txt"))) {
    String content = "Hello, World!";
    bos.write(content.getBytes());
    bos.flush();  // 刷新缓冲区
} catch (IOException e) {
    e.printStackTrace();
}
```

#### DataInputStream和DataOutputStream
数据流可以读写基本数据类型。

```java
// 数据输入流
try (DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"))) {
    int intValue = dis.readInt();
    double doubleValue = dis.readDouble();
    String stringValue = dis.readUTF();
    System.out.println("Int: " + intValue);
    System.out.println("Double: " + doubleValue);
    System.out.println("String: " + stringValue);
} catch (IOException e) {
    e.printStackTrace();
}

// 数据输出流
try (DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.txt"))) {
    dos.writeInt(100);
    dos.writeDouble(3.14);
    dos.writeUTF("Hello, World!");
    dos.flush();
} catch (IOException e) {
    e.printStackTrace();
}
```

#### ObjectInputStream和ObjectOutputStream
对象流可以读写序列化的对象。

```java
// 序列化对象
public class Person implements Serializable {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 对象输出流
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
    Person person = new Person("John", 25);
    oos.writeObject(person);
    System.out.println("Object serialized");
} catch (IOException e) {
    e.printStackTrace();
}

// 对象输入流
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
    Person person = (Person) ois.readObject();
    System.out.println("Object deserialized: " + person);
} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}
```

## 字符流

字符流是以字符为单位传输数据的流，主要包括`Reader`和`Writer`两个抽象类。

### Reader
`Reader`是所有字符输入流的父类，定义了读取字符的基本方法：

```java
public abstract class Reader implements Readable, Closeable {
    // 读取一个字符
    public abstract int read() throws IOException;

    // 读取多个字符到数组
    public int read(char[] cbuf) throws IOException {
        return read(cbuf, 0, cbuf.length);
    }

    // 读取多个字符到数组的指定位置
    public abstract int read(char[] cbuf, int off, int len) throws IOException;

    // 跳过指定字符数
    public long skip(long n) throws IOException {
        // ...
    }

    // 是否准备好读取
    public boolean ready() throws IOException {
        return false;
    }

    // 标记和重置
    public void mark(int readAheadLimit) throws IOException {
        throw new IOException("mark not supported");
    }

    public void reset() throws IOException {
        throw new IOException("reset not supported");
    }

    public boolean markSupported() {
        return false;
    }

    // 关闭流
    public void close() throws IOException {
    }

    // ... 其他方法
}
```

### Writer
`Writer`是所有字符输出流的父类，定义了写入字符的基本方法：

```java
public abstract class Writer implements Appendable, Closeable, Flushable {
    // 写入一个字符
    public abstract void write(int c) throws IOException;

    // 写入字符数组
    public void write(char[] cbuf) throws IOException {
        write(cbuf, 0, cbuf.length);
    }

    // 写入字符数组的指定部分
    public abstract void write(char[] cbuf, int off, int len) throws IOException;

    // 写入字符串
    public void write(String str) throws IOException {
        write(str, 0, str.length());
    }

    // 写入字符串的指定部分
    public void write(String str, int off, int len) throws IOException {
        // ...
    }

    // 追加字符序列
    public Writer append(CharSequence csq) throws IOException {
        // ...
    }

    public Writer append(CharSequence csq, int start, int end) throws IOException {
        // ...
    }

    public Writer append(char c) throws IOException {
        // ...
    }

    // 刷新流
    public abstract void flush() throws IOException;

    // 关闭流
    public abstract void close() throws IOException;

    // ... 其他方法
}
```

### 常用字符流实现类

#### FileReader和FileWriter
`FileReader`用于从文件读取字符，`FileWriter`用于向文件写入字符。

```java
// 文件字符输入流
try (FileReader fr = new FileReader("input.txt")) {
    int data;
    while ((data = fr.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 文件字符输出流
try (FileWriter fw = new FileWriter("output.txt")) {
    String content = "Hello, World!";
    fw.write(content);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### BufferedReader和BufferedWriter
缓冲字符流可以提高字符I/O的性能。

```java
// 缓冲字符输入流
try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 缓冲字符输出流
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    String content = "Hello, World!";
    bw.write(content);
    bw.newLine();  // 写入换行符
    bw.write("Welcome to Java I/O.");
    bw.flush();
} catch (IOException e) {
    e.printStackTrace();
}
```

#### InputStreamReader和OutputStreamWriter
转换流用于将字节流转换为字符流，可以指定字符编码。

```java
// 输入转换流
try (InputStreamReader isr = new InputStreamReader(new FileInputStream("input.txt"), "UTF-8")) {
    int data;
    while ((data = isr.read()) != -1) {
        System.out.print((char) data);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 输出转换流
try (OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("output.txt"), "UTF-8")) {
    String content = "Hello, World!";
    osw.write(content);
    osw.flush();
} catch (IOException e) {
    e.printStackTrace();
}
```

## 文件操作

### File类
`File`类用于表示文件和目录，可以进行文件和目录的创建、删除、重命名等操作。

```java
// 创建File对象
File file = new File("test.txt");

// 创建文件
try {
    boolean created = file.createNewFile();
    System.out.println("File created: " + created);
} catch (IOException e) {
    e.printStackTrace();
}

// 删除文件
boolean deleted = file.delete();
System.out.println("File deleted: " + deleted);

// 判断文件是否存在
boolean exists = file.exists();
System.out.println("File exists: " + exists);

// 判断是否是文件
boolean isFile = file.isFile();
System.out.println("Is file: " + isFile);

// 判断是否是目录
boolean isDirectory = file.isDirectory();
System.out.println("Is directory: " + isDirectory);

// 获取文件长度
long length = file.length();
System.out.println("File length: " + length + " bytes");

// 获取文件绝对路径
String absolutePath = file.getAbsolutePath();
System.out.println("Absolute path: " + absolutePath);

// 重命名文件
File newFile = new File("new_test.txt");
boolean renamed = file.renameTo(newFile);
System.out.println("File renamed: " + renamed);
```

### 目录操作

```java
// 创建目录
File dir = new File("test_dir");
boolean created = dir.mkdir();
System.out.println("Directory created: " + created);

// 创建多级目录
File multiDir = new File("test_dir/sub_dir/sub_sub_dir");
boolean multiCreated = multiDir.mkdirs();
System.out.println("Multi-level directory created: " + multiCreated);

// 列出目录中的文件和子目录
File[] files = dir.listFiles();
if (files != null) {
    for (File f : files) {
        System.out.println(f.getName() + (f.isDirectory() ? " (directory)" : " (file)"));
    }
}
```

## NIO

Java NIO(New I/O)是Java 4引入的新I/O机制，提供了更高效的I/O操作方式，包括通道(Channel)、缓冲区(Buffer)、选择器(Selector)等。

### 通道和缓冲区
通道用于连接数据源和目标，缓冲区用于存储数据。

```java
// 使用NIO读取文件
try (FileChannel channel = new FileInputStream("input.txt").getChannel()) {
    ByteBuffer buffer = ByteBuffer.allocate(1024);
    int bytesRead;
    while ((bytesRead = channel.read(buffer)) != -1) {
        buffer.flip();  // 切换到读模式
        while (buffer.hasRemaining()) {
            System.out.print((char) buffer.get());
        }
        buffer.clear();  // 切换到写模式
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 使用NIO写入文件
try (FileChannel channel = new FileOutputStream("output.txt").getChannel()) {
    String content = "Hello, World!";
    ByteBuffer buffer = ByteBuffer.wrap(content.getBytes());
    channel.write(buffer);
} catch (IOException e) {
    e.printStackTrace();
}
```

### 选择器
选择器用于多路复用，可以同时监控多个通道的事件。

```java
// 创建选择器
Selector selector = Selector.open();

// 注册通道到选择器
ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
serverSocketChannel.bind(new InetSocketAddress(8080));
serverSocketChannel.configureBlocking(false);
serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

// 监控选择器
while (true) {
    int readyChannels = selector.select();
    if (readyChannels == 0) {
        continue;
    }

    Set<SelectionKey> selectedKeys = selector.selectedKeys();
    Iterator<SelectionKey> keyIterator = selectedKeys.iterator();

    while (keyIterator.hasNext()) {
        SelectionKey key = keyIterator.next();

        if (key.isAcceptable()) {
            // 处理接受连接事件
        } else if (key.isReadable()) {
            // 处理读事件
        } else if (key.isWritable()) {
            // 处理写事件
        }

        keyIterator.remove();
    }
}
```

##  I/O操作的最佳实践

### 使用try-with-resources语句
`try-with-resources`语句可以自动关闭实现了`AutoCloseable`接口的资源，避免资源泄露。

```java
// 好的做法
try (FileReader fr = new FileReader("input.txt")) {
    // 读取文件内容
} catch (IOException e) {
    e.printStackTrace();
}

// 不好的做法
FileReader fr = null;
try {
    fr = new FileReader("input.txt");
    // 读取文件内容
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) {
        try {
            fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 选择合适的流类型
- 文本文件：使用字符流(`Reader`/`Writer`)
- 二进制文件：使用字节流(`InputStream`/`OutputStream`)
- 提高性能：使用缓冲流(`BufferedInputStream`/`BufferedOutputStream`、`BufferedReader`/`BufferedWriter`)

### 明确指定字符编码
在处理文本文件时，明确指定字符编码，避免因编码不一致导致的问题。

```java
// 明确指定字符编码
try (InputStreamReader isr = new InputStreamReader(new FileInputStream("input.txt"), StandardCharsets.UTF_8)) {
    // 读取文件内容
} catch (IOException e) {
    e.printStackTrace();
}
```

### 避免频繁的I/O操作
频繁的I/O操作会降低性能，应尽量减少I/O操作的次数，如使用缓冲流、批量读写等。

### 及时关闭资源
使用完资源后应及时关闭，避免资源泄露。`try-with-resources`语句可以自动关闭资源，推荐使用。

### 处理异常
I/O操作可能会抛出异常，应正确处理异常，提供有意义的错误信息。

###  合理设置缓冲区大小
缓冲区大小过小会增加I/O操作的次数，过大则会浪费内存，应根据实际情况合理设置缓冲区大小。