# 并发编程

并发编程是Java中一个重要且复杂的领域，涉及多线程、同步机制、并发集合等内容。本章将深入探讨Java并发编程的核心概念和实践。

## 并发基础

### 什么是并发
并发是指多个任务在同一时间间隔内执行，通过时间分片或多核处理器实现。

### 并发与并行的区别
- **并发**：多个任务在同一时间段内交替执行
- **并行**：多个任务在同一时间点同时执行

### 并发编程的挑战
- 线程安全问题
- 死锁
- 活锁
- 线程饥饿
- 竞态条件

## 线程基础

### 线程的创建与启动
线程创建的三种方式：

```java
// 方式1：继承Thread类
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running");
    }
}

// 方式2：实现Runnable接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running");
    }
}

// 方式3：实现Callable接口
class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "Callable result";
    }
}
```

### 线程生命周期
线程的六种状态：
- 新建（New）
- 就绪（Runnable）
- 运行（Running）
- 阻塞（Blocked）
- 等待（Waiting）
- 超时等待（Timed Waiting）
- 终止（Terminated）

## 线程同步机制

### synchronized关键字
`synchronized`可以修饰方法或代码块，确保同一时间只有一个线程可以执行临界区代码。

```java
// 同步方法
public synchronized void synchronizedMethod() {
    // 临界区代码
}

// 同步代码块
public void synchronizedBlock() {
    synchronized (this) {
        // 临界区代码
    }
}
```

### ReentrantLock
`ReentrantLock`是Java 5引入的显式锁，提供了比`synchronized`更灵活的同步控制。

```java
ReentrantLock lock = new ReentrantLock();

try {
    lock.lock();
    // 临界区代码
} finally {
    lock.unlock();
}
```

### 读写锁
`ReadWriteLock`允许多个线程同时读取共享资源，但写入时需要独占访问。

```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
Lock readLock = rwLock.readLock();
Lock writeLock = rwLock.writeLock();

// 读操作
readLock.lock();
try {
    // 读取共享资源
} finally {
    readLock.unlock();
}

// 写操作
writeLock.lock();
try {
    // 修改共享资源
} finally {
    writeLock.unlock();
}
```

## 并发工具类

### CountDownLatch
`CountDownLatch`用于等待一组线程完成操作。

```java
CountDownLatch latch = new CountDownLatch(3);

// 线程1
new Thread(() -> {
    // 执行任务
    latch.countDown();
}).start();

// 等待所有线程完成
latch.await();
```

### CyclicBarrier
`CyclicBarrier`用于让一组线程在某个共同点上同步，之后再继续执行。

```java
CyclicBarrier barrier = new CyclicBarrier(3);

// 线程1
new Thread(() -> {
    // 执行任务
    barrier.await(); // 等待其他线程
    // 继续执行
}).start();
```

### Semaphore
`Semaphore`用于控制同时访问某个资源的线程数量。

```java
Semaphore semaphore = new Semaphore(5); // 允许5个线程同时访问

semaphore.acquire();
try {
    // 访问共享资源
} finally {
    semaphore.release();
}
```

## 并发集合

### ConcurrentHashMap
`ConcurrentHashMap`是线程安全的`HashMap`实现，支持高并发读写。

### CopyOnWriteArrayList
`CopyOnWriteArrayList`是线程安全的`ArrayList`实现，适合读多写少的场景。

### BlockingQueue
`BlockingQueue`是阻塞队列，支持线程安全的入队和出队操作。

## 线程池

### 线程池的优势
- 重用线程，减少线程创建和销毁的开销
- 控制线程数量，避免资源耗尽
- 提供任务排队和管理机制

### 线程池的创建

```java
// 创建固定大小的线程池
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);

// 创建单线程线程池
ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();

// 创建缓存线程池
ExecutorService cachedThreadPool = Executors.newCachedThreadPool();

// 创建定时线程池
ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(3);
```

### 线程池的参数
`ThreadPoolExecutor`的核心参数：
- corePoolSize：核心线程数
- maximumPoolSize：最大线程数
- keepAliveTime：非核心线程的空闲超时时间
- unit：超时时间的单位
- workQueue：任务队列
- threadFactory：线程工厂
- handler：拒绝策略

## 并发编程最佳实践

1. 优先使用并发工具类而非手动创建线程
2. 使用`try-with-resources`语句管理锁资源
3. 减少锁的持有时间，提高并发性能
4. 避免不必要的同步，使用无锁数据结构
5. 使用`volatile`关键字确保变量的可见性
6. 正确使用`final`关键字，避免引用逃逸
7. 采用防御性编程，处理并发异常
8. 使用线程池管理线程生命周期
9. 避免使用`ThreadLocal`存储可变状态
10. 对并发代码进行充分测试

## Java并发新特性

### Java 8的并发增强
- 新增`CompletableFuture`，支持异步编程
- `StampedLock`提供乐观读模式

### Java 9的并发增强
- 新增`Flow` API，支持响应式编程

### Java 11的并发增强
- `HttpClient`支持异步请求

### Java 16的并发增强
- `Vector`和`Hashtable`的现代化改进