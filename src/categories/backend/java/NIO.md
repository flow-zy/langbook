# Java NIO

Java NIO（New I/O）是Java SE 1.4引入的一个新的I/O API，它提供了与标准I/O不同的I/O处理方式，主要用于高性能、高并发的I/O操作。Java NIO的核心组件包括通道（Channel）、缓冲区（Buffer）和选择器（Selector）。

## Java NIO概述

### 什么是Java NIO
Java NIO是一个基于通道和缓冲区的I/O API，它提供了非阻塞I/O操作的能力，使程序能够在同一时间处理多个I/O操作。

### Java NIO与标准I/O的区别
- **标准I/O**：基于流（Stream），是阻塞的，一次只能处理一个I/O操作。
- **Java NIO**：基于通道（Channel）和缓冲区（Buffer），支持非阻塞I/O，一次可以处理多个I/O操作。

### Java NIO的核心组件
- **通道（Channel）**：用于数据的读取和写入。
- **缓冲区（Buffer）**：用于存储数据。
- **选择器（Selector）**：用于监听多个通道的事件。

## 缓冲区（Buffer）

### 什么是缓冲区
缓冲区是一个连续的内存块，用于存储数据。缓冲区可以被读取和写入，并且可以设置位置（position）、限制（limit）和容量（capacity）。

### 缓冲区的类型
Java NIO提供了以下几种缓冲区类型：
- `ByteBuffer`：存储字节数据。
- `CharBuffer`：存储字符数据。
- `ShortBuffer`：存储短整型数据。
- `IntBuffer`：存储整型数据。
- `LongBuffer`：存储长整型数据。
- `FloatBuffer`：存储浮点型数据。
- `DoubleBuffer`：存储双精度浮点型数据。

### 缓冲区的使用

```java
// 创建缓冲区
ByteBuffer buffer = ByteBuffer.allocate(1024);

// 写入数据到缓冲区
String data = "Hello, Java NIO!";
buffer.put(data.getBytes());

// 切换到读取模式
buffer.flip();

// 从缓冲区读取数据
byte[] readData = new byte[buffer.remaining()];
buffer.get(readData);
System.out.println(new String(readData));
```

### 缓冲区的核心方法
- `allocate(int capacity)`：创建一个指定容量的缓冲区。
- `put(byte[] src)`：将数据写入缓冲区。
- `flip()`：切换到读取模式，设置limit为position，position为0。
- `get(byte[] dst)`：从缓冲区读取数据到目标数组。
- `clear()`：清空缓冲区，设置position为0，limit为capacity。
- `rewind()`：重置position为0，保持limit不变。
- `remaining()`：返回剩余可读取的字节数。

## 通道（Channel）

### 什么是通道
通道是一个双向的数据传输管道，它可以用于读取和写入数据。通道可以连接到文件、网络套接字等数据源或数据目标。

### 通道的类型
Java NIO提供了以下几种通道类型：
- `FileChannel`：用于文件的读取和写入。
- `SocketChannel`：用于TCP套接字的客户端。
- `ServerSocketChannel`：用于TCP套接字的服务器端。
- `DatagramChannel`：用于UDP套接字。
- `Pipe.SinkChannel`和`Pipe.SourceChannel`：用于管道的两端。

### 通道的使用

```java
// 创建文件通道
RandomAccessFile file = new RandomAccessFile("data.txt", "rw");
FileChannel channel = file.getChannel();

// 创建缓冲区
ByteBuffer buffer = ByteBuffer.allocate(1024);

// 从通道读取数据到缓冲区
int bytesRead = channel.read(buffer);

// 切换到读取模式
buffer.flip();

// 从缓冲区读取数据
byte[] data = new byte[buffer.remaining()];
buffer.get(data);
System.out.println(new String(data));

// 清空缓冲区
buffer.clear();

// 写入数据到缓冲区
String newData = "New data to write";
buffer.put(newData.getBytes());

// 切换到写入模式
buffer.flip();

// 从缓冲区写入数据到通道
channel.write(buffer);

// 关闭通道和文件
channel.close();
file.close();
```

### 通道的核心方法
- `read(Buffer buffer)`：从通道读取数据到缓冲区。
- `write(Buffer buffer)`：从缓冲区写入数据到通道。
- `transferFrom(ReadableByteChannel src, long position, long count)`：从源通道传输数据到当前通道。
- `transferTo(long position, long count, WritableByteChannel target)`：从当前通道传输数据到目标通道。
- `close()`：关闭通道。

## 选择器（Selector）

### 什么是选择器
选择器是一个可以监听多个通道事件的组件。通过选择器，一个线程可以处理多个通道的I/O操作，提高程序的并发性能。

### 选择器的使用

```java
// 创建选择器
Selector selector = Selector.open();

// 创建服务器套接字通道
ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
serverSocketChannel.bind(new InetSocketAddress(8080));
serverSocketChannel.configureBlocking(false);

// 注册通道到选择器
serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

// 循环监听事件
while (true) {
    // 等待事件发生
    int readyChannels = selector.select();
    if (readyChannels == 0) {
        continue;
    }

    // 获取选择键集合
    Set<SelectionKey> selectionKeys = selector.selectedKeys();
    Iterator<SelectionKey> iterator = selectionKeys.iterator();

    while (iterator.hasNext()) {
        SelectionKey key = iterator.next();

        // 处理接受连接事件
        if (key.isAcceptable()) {
            ServerSocketChannel serverChannel = (ServerSocketChannel) key.channel();
            SocketChannel clientChannel = serverChannel.accept();
            clientChannel.configureBlocking(false);
            clientChannel.register(selector, SelectionKey.OP_READ);
        }

        // 处理读取数据事件
        else if (key.isReadable()) {
            SocketChannel clientChannel = (SocketChannel) key.channel();
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            int bytesRead = clientChannel.read(buffer);

            if (bytesRead == -1) {
                clientChannel.close();
                key.cancel();
            } else if (bytesRead > 0) {
                buffer.flip();
                byte[] data = new byte[buffer.remaining()];
                buffer.get(data);
                System.out.println("Received: " + new String(data));

                // 响应客户端
                buffer.clear();
                buffer.put("Hello, Client!".getBytes());
                buffer.flip();
                clientChannel.write(buffer);
            }
        }

        // 移除已处理的选择键
        iterator.remove();
    }
}
```

### 选择器的核心方法
- `open()`：创建一个选择器。
- `select()`：等待至少一个通道准备好进行I/O操作。
- `selectNow()`：立即返回准备好的通道数量，不阻塞。
- `selectedKeys()`：返回准备好进行I/O操作的通道的选择键集合。
- `wakeup()`：唤醒正在阻塞的select()方法。
- `close()`：关闭选择器。

## Java NIO的高级特性

### 非阻塞I/O
非阻塞I/O允许程序在等待I/O操作完成的同时执行其他任务，提高程序的并发性能。

### 内存映射文件
内存映射文件允许将文件的一部分映射到内存中，通过内存操作来读写文件，提高文件操作的性能。

```java
// 创建内存映射文件
RandomAccessFile file = new RandomAccessFile("data.txt", "rw");
FileChannel channel = file.getChannel();
ByteBuffer buffer = channel.map(FileChannel.MapMode.READ_WRITE, 0, file.length());

// 读取数据
byte[] data = new byte[buffer.remaining()];
buffer.get(data);
System.out.println(new String(data));

// 写入数据
buffer.clear();
buffer.put("New data".getBytes());

// 关闭通道和文件
channel.close();
file.close();
```

### 管道（Pipe）
管道用于在两个线程之间传输数据，一个线程写入数据到管道的一端，另一个线程从管道的另一端读取数据。

```java
// 创建管道
Pipe pipe = Pipe.open();

// 获取写入通道和读取通道
Pipe.SinkChannel sinkChannel = pipe.sink();
Pipe.SourceChannel sourceChannel = pipe.source();

// 写入数据到管道
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.put("Hello, Pipe!".getBytes());
buffer.flip();
sinkChannel.write(buffer);

// 从管道读取数据
buffer.clear();
sourceChannel.read(buffer);
buffer.flip();
byte[] data = new byte[buffer.remaining()];
buffer.get(data);
System.out.println(new String(data));

// 关闭通道
sinkChannel.close();
sourceChannel.close();
```

## Java NIO的应用场景

- **高性能服务器**：如Web服务器、数据库服务器等，需要处理大量并发连接。
- **文件操作**：特别是大文件的读写操作，可以利用内存映射文件提高性能。
- **网络编程**：需要处理多个客户端连接的网络应用程序。
- **异步I/O操作**：需要非阻塞I/O的应用程序。

## Java NIO的注意事项

- Java NIO的API相对复杂，需要一定的学习成本。
- 非阻塞I/O并不总是比阻塞I/O更好，需要根据具体的应用场景来选择。
- 正确处理缓冲区的position、limit和capacity是使用Java NIO的关键。
- 在多线程环境下使用Java NIO需要注意线程安全问题。
- 记得关闭通道和选择器，以释放系统资源。