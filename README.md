# React 框架模仿kahoot前端
这是我在学校学习前端期间的最后一个项目，经历了前一个JS的作业之后，采用react框架，避免了像原生js一样一直操作DOM. 历时3 周（实际上课程紧张加之需要实习，只用了一周）
主要使用了antd的组件库. 实现了管理员的注册登录，游戏的增闪改查，一些通知和删除的double check类似的UE设计,游戏的开始和结束，还有发出问题的下一题，玩家通过指定id可以加入游戏等。

# 使用
	分别进入frontend 和backend 文件夹，进行 npm install 安装依赖, 然后 npm start 或者 yarn start. 

## 注意
本项目用的是最新的 react 18 和 React-Route-Dom 6, 这个路由版本和5有很大的不一样，我使用了一个路由表文件（routes.jsx）来管理所有路由.
并且现在React 已经渐渐弃用类式组件，鼓励使用函数式组件，所以这个项目没有类式组件.（没有this）
# 功能模块
### 登录注册,退出登录, 管理员Auth

### 管理员的 Dashboard  游戏列表
	-每一个游戏可以有n个question，对应的question需要设置答题时间和相应分数
### 管理员对游戏的增删改查
	-也可以对游戏里面的question 里的内容进行操作，包含数量和类型（单选or多选），最多可以有6个答案
### 管理员开始或一个 game
	- 会抛出一个特定 url 和一个粘贴按钮， 管理者可以提供给 player，从而进行游玩
	- 相应的游戏状态会变成 started， 出现对应按钮，控制出题（next question）
### 管理员结束一个 game
	- 结算所有玩家得分并且展示player得分 （still waiting for solve）

### player 进入游戏 （无需登录）
	- 需要设置 name 和 输入游戏ID （粘贴url会自动输入ID）
### player 进行答题
	- 每道题会计时，时间到了无法选择答案，如果没有回答，则不得分.
