## index.ts/run
1. 创建了渲染管线
2. 绑定光栅器(普通，深度，三角形)到管线里面
3. 设置一些全局数据
4. runOnce逻辑
    1. 执行调度器
    2. render(secene, glData, pipeline)

## index.ts/render
1. 构建MVP矩阵（可以阅读这篇文章：https://zhuanlan.zhihu.com/p/261097735）
2. 给管线绑定scene里面每个node的顶点着色器和片元着色器还有纹理
3. 调用pipeline.run(node.getVBO(), node.getIndices(), glData);传入顶点数据，顶点索引和全局数据

## rendering-pipeline.ts
1. 绑定几个属性
    1. vertex shader
    2. fragment shader
    3. rasterizer[]
2. 背面剔除
    1. 按照顶点的设置顺序来判断是否是正面还是背面（逆时针是正面，顺时针是背面）(https://learnopengl-cn.github.io/04%20Advanced%20OpenGL/04%20Face%20culling/)
    2. 利用向量的叉积的正负性来判断是否逆时针（本程序是左手系，因此<0是逆时针）(https://blog.csdn.net/u013453970/article/details/38419233)
3. run函数逻辑
    1. 针对每个顶点，在运行顶点着色器之前，会准备好一个着色器传递变量对象
    2. 对每个点调用顶点着色器计算新的顶点位置
    3. 拿到索引数据后，根据索引数据拿到每一个三角的顶点和顶点存储的变量，传入光栅器中进行计算