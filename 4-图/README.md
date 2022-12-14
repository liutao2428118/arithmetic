### 无向图
- 边仅仅是两个顶点之间的连接，顶点可是各种类型，v-w 表示一条边
- 如果从任意顶点都存在一条路径到达另外一个任意顶点，我们称这幅图是连通图。
- 表示无向图的数据类型
   - 领接表的数据结构，将每个顶点的所有相邻的顶点保存到该顶点对应的元素所指向的一张链表中
   - Graph 的实现一下特定
      - 使用的空间和 V + E 成正比
      - 添加的一条边所需的时间为常数
      - 遍历顶点 V 的所有相邻顶点所需时间和 V 的度数（边）成正比
- **深度优先搜索寻找路径**
   - 在一幅图图中找寻一个顶点到达其他的顶点的路径，使用深度优先搜索类似于优先找儿子和孙子（子子孙孙）节点，而不是先找兄弟节点。
- **广度优先搜索寻找路径**
   - 在图中优先寻找兄弟节点，广度优先的搜索明显的是往外扩散
- **连通分量**
   - 在一幅图中找出若干独立的子图
- **符号图**
   - 把其他的类型的顶点转换为索引类型的顶点。
   - 间隔度数，A 间隔 C 不直接相连，可是通过间隔的 B 或者 D 顶点让它们有了某种关系，我距离你有多少度数（边）

| 问题 | 解决方法 | 参阅 |
| --- | --- | --- |
| 单点连通性 | DepthFirstSearch | 4.1.3.2节 |
| 单点路径 | DepthFirstPaths | 算法4.1 |
| 单点最短路径 | BreadthFirstPaths | 算法4.2 |
| 连通分量 | CC | 算法4.3 |

### 有向图

- 一幅有方向性的图是由一组顶点和一组有方向的边组成的，每条有方向的边都连接着有序的一对顶点
- 表示有向图的数据类型
   - 和无向图相比，有向图的数据类型更简单，也是用的领接表的方式，只不过 w 在 v 链表中，并一定 v 也在 w 的链表中
- **有向图的寻找路径**
   - 无向图一样，DepthFirstPaths 和  BreadthFirstPaths 中的数据类型改成 Digraph 就可以了
- **环和有向无环图**
   - 现实生活中常遇到的调度问题，我要先做完某一件事才做去做下一件事，如果在着当着存在一个环，那样就不存在调度问题了，因为这两是个悖论。
   - 所以在此要在一幅图中找出有向环，再看是否在继续调度问题处理
   - 调度问题本质是我应该先做什么在做什么，通过顶点的深度优先次序的排序来解决这个问题。（拓扑排序 算法4.5）。排序有分为一下三种
      - 前序：在递归调用之前将顶点加入队列
      - 后序：在递归调用之后将顶点加了队列（队列先进先出）
      - 逆后序：在递归调用之后将顶点压入栈（栈是先进后出）
- **有向图的强连通性**
   - 和无向图的连通性一样，有向图的中的强连通也是一种登记关系，不同的子集称为强连通分量。
   - 计算强连通的分量的算法 Kosaraju

| 问题 | 解决方法 | 参阅 |
| --- | --- | --- |
| 单点和多点的可达性 | DirecteDFS | 算法4.4 |
| 单点有向路径 | DepthFirstDirectedPaths | 4.2.3.2 |
| 单点最短有向路径 | BreadthFirstDirectedPaths | 4.2.3.2 |
| 有向环检测 | DirectedCycle |  |
| 深度优先的顶点排序 | DepthFirstOrder |  |
| 优先级限制下的调度问题(拓扑排序) | Topological |  |

### 最小生成树

- 给一幅无向图加上权重，通过权重找到顶点与顶点之间的最短路径，也就是最小生成树。
- 算法的实现原理，切分定理，图的一种切分是将图的所有顶点分为两个非空且不重叠的两个集合。横切边是一条连接两个属于不同集合的顶点的边。
- 加权无向图的数据类型
   - 因为多了一个权重属性，不能像无向图那样直接通过顶点索引来表示一条边了
   - 通过 Edge 类（对象）来表示一条边
   - 同样也是通过领接链表的形式来表示加权无向图的数据结构，不同的是现在每个顶点元素下存放边是 Edge 对象
- **最小生成树的 Prim 算法（延时版）**
   - 算法的原理也是上面所说的，深度搜索的方式遍历每个顶点，标记顶 点 v 并将所以连接 v 和未被标记顶点的边都加入到优先队列中，再从优先队列中取出权重最小的边（最小横切边），添加到树中。
- **最小生成树的 Prim 算法（即时版）**
   - 即时版的不同是，可以尝试从优先队列中删除失效的边，这样优先队列就只包含有树顶点和非树顶点之间的横切边
- **Krunskal 算法**
   - 第二种最小生成树的算法的主要思想是按照边的权重顺序（从小到大）处理他们。将边加入最小生成树中，加入的边不会与加入的边构成环，直到树中含有的 V-1 边为止。
### 最短路径

- 算法的基本原理，放松顶点来找到起始顶点到达其他顶点的最短路径，distTo(v) > distTo[v] + e.weigth() 就更新这条起始顶点到 w 的最短路径。也就是找离起始顶点最近的一条边。最小生成树同样是找寻权重最小的横切边添加到树中
- 加权有向图中寻找最短路径，也就是找出最短路径树（SPT）
- 其中解决边权重非负的最短路径问题的经典算法 Dijkstra
- 无环加权有向图+拓扑排序 也可以解决最短路径问题，同样也可以通过找出最长路径来解决优先级限行下并行任务调度问题。
- 解决一般情况的经典算法 Bellman-Ford ，包括有向环，权重是负值，找出负权重环等问题

