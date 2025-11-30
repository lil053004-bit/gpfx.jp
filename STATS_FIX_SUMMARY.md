# 用户统计数据显示问题修复总结

## 问题诊断

### 根本原因
1. **字段名不匹配**：后端使用 camelCase（如 `totalSessions`），前端期望 snake_case（如 `total_sessions`）
2. **缺失统计数据**：后端未统计特定事件类型（page_load、diagnosis_click、report_download）
3. **数据库未初始化**：服务器未启动导致数据库文件不存在
4. **SessionId 不一致**：前端在某些地方使用 sessionStorage，但未正确设置

## 已实施的修复

### 1. 后端修复（server/database/sqliteHelpers.js）

修改了 `getSessionSummary()` 函数：

**修复前：**
```javascript
return {
  totalSessions,
  convertedSessions,
  totalEvents,
  conversionRate
};
```

**修复后：**
```javascript
return {
  total_sessions: totalSessions,
  total_events: totalEvents,
  page_loads: pageLoads,              // 新增
  diagnoses: diagnoses,                // 新增
  conversions: convertedSessions,
  conversion_rate: parseFloat(conversionRate.toFixed(2)),
  report_downloads: reportDownloads    // 新增
};
```

**新增的统计查询：**
- `page_loads`: 统计 event_type = 'page_load' 的事件
- `diagnoses`: 统计 event_type = 'diagnosis_click' 的事件
- `report_downloads`: 统计 event_type = 'report_download' 的事件

### 2. 前端修复（src/lib/userTracking.ts）

确保 sessionId 同步到 sessionStorage：

```javascript
function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    sessionStorage.setItem('sessionId', sessionId);  // 新增
  } else {
    sessionStorage.setItem('sessionId', sessionId);  // 新增
  }
  return sessionId;
}
```

## 数据流程

### 用户操作 → 数据库 → Admin显示

1. **页面加载**
   - 触发: `userTracking.trackPageLoad()`
   - 存储: `user_events` 表，`event_type='page_load'`
   - 显示: Admin Dashboard "总访问量"

2. **诊断点击**
   - 触发: `userTracking.trackDiagnosisClick()`
   - 存储: `user_events` 表，`event_type='diagnosis_click'`
   - 显示: Admin Dashboard "诊断次数"

3. **报告下载**
   - 触发: `userTracking.trackEvent()` with `event_type='report_download'`
   - 存储: `user_events` 表，`event_type='report_download'`
   - 显示: Admin Dashboard "レポートダウンロード数"

4. **转化事件**
   - 触发: `userTracking.trackConversion()`
   - 存储: `user_sessions` 表，`converted=1`
   - 显示: Admin Dashboard "转化次数" 和 "转化率"

## 启动和测试

### 1. 启动服务器（首次运行）

```bash
# 开发模式（同时启动前端和后端）
npm run dev:all

# 或仅启动后端
npm run server
```

服务器启动时会自动：
- 创建 `server/data/database.db` 文件
- 初始化所有数据表
- 创建必要的索引

### 2. 生成测试数据

访问前端应用并执行以下操作：
1. 打开浏览器访问 `http://localhost:5173`
2. 输入股票代码（如 7203）
3. 点击"診断する"按钮
4. 下载报告
5. 点击 LINE 转化按钮

### 3. 检查数据库统计

```bash
node test-stats.js
```

这个脚本会显示：
- 总会话数
- 总事件数
- 各类事件数量
- 最近的会话记录

### 4. 验证 Admin Dashboard

1. 访问 `http://localhost:5173/adsadmin`
2. 使用管理员账号登录
3. 查看"总览"标签页
4. 验证所有统计数据正确显示：
   - 总访问量
   - 诊断次数
   - レポートダウンロード数
   - 转化次数
   - 转化率

## API 端点

### 获取统计数据
```
GET /api/admin/stats?days=7
Authorization: Bearer <admin_token>
```

**响应格式：**
```json
{
  "summary": {
    "total_sessions": 100,
    "total_events": 250,
    "page_loads": 100,
    "diagnoses": 80,
    "conversions": 20,
    "conversion_rate": 20.00,
    "report_downloads": 15
  },
  "popularStocks": [
    {
      "stock_code": "7203",
      "stock_name": "トヨタ自動車",
      "view_count": 50,
      "conversions": 10
    }
  ]
}
```

## 故障排除

### 问题：Admin Dashboard 仍然显示 0

**可能原因：**
1. 数据库是空的（没有用户访问数据）
2. 服务器未重启（仍使用旧代码）
3. 前端缓存未清除

**解决方案：**
1. 确保服务器已重启：`npm run server`
2. 访问前端生成测试数据
3. 清除浏览器缓存或使用隐身模式
4. 检查浏览器控制台是否有错误
5. 检查服务器日志是否有错误

### 问题：TypeError: Cannot read property 'xxx' of null

**原因：** 后端返回的数据格式不正确

**解决方案：**
1. 检查 `server/database/sqliteHelpers.js` 是否已更新
2. 重启服务器
3. 检查 `/api/admin/stats` 接口返回的 JSON 格式

### 问题：sessionId 不一致

**原因：** localStorage 和 sessionStorage 不同步

**解决方案：**
1. 清除浏览器所有 storage：开发者工具 → Application → Clear site data
2. 刷新页面
3. 检查 localStorage 中的 `user_session_id` 和 sessionStorage 中的 `sessionId` 是否相同

## 技术细节

### 数据库表结构

**user_sessions 表：**
- `id`: 主键
- `session_id`: 会话ID（唯一）
- `stock_code`: 股票代码
- `stock_name`: 股票名称
- `converted`: 是否转化（0/1）
- `first_visit_at`: 首次访问时间
- `last_activity_at`: 最后活动时间

**user_events 表：**
- `id`: 主键
- `session_id`: 关联会话ID
- `event_type`: 事件类型（page_load, diagnosis_click, report_download, conversion）
- `event_data`: 事件数据（JSON）
- `stock_code`: 股票代码
- `stock_name`: 股票名称
- `created_at`: 创建时间

### 统计计算逻辑

**转化率计算：**
```
转化率 = (转化会话数 / 总会话数) × 100%
```

**时间范围：**
- 默认统计最近 7 天的数据
- 可通过 `?days=N` 参数调整

## 后续改进建议

1. **实时统计更新**：添加 WebSocket 或轮询机制
2. **更多维度统计**：按时间段、按股票分类等
3. **数据可视化**：添加图表展示趋势
4. **导出功能**：支持导出统计报告为 CSV/Excel
5. **性能优化**：添加统计数据缓存机制

## 相关文件

- `server/database/sqliteHelpers.js` - 统计查询函数
- `server/routes/admin.js` - Admin API 路由
- `src/pages/AdminDashboard.tsx` - Admin 前端界面
- `src/lib/userTracking.ts` - 用户跟踪库
- `server/routes/tracking.js` - 跟踪 API 路由

## 变更历史

- 2025-11-26: 修复字段名不匹配问题
- 2025-11-26: 添加 page_loads、diagnoses、report_downloads 统计
- 2025-11-26: 修复 sessionId 存储一致性问题
