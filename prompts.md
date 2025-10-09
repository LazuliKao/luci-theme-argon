所有关键属性都使用 !important 强制覆盖 cascade.css 中的样式
需要在 fluent-dark 添加对应样式的暗色模式版本（注意实际加载时是先加载 fluent.css，再加载 fluent-dark.css 覆盖）

优化复选框样式，将其改成 Fluent UI 的 switch 样式，并添加动画效果，可参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts

对于在 table 等特殊场景里面的 checkbox 还是用勾选框样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts

优化文本输入、文本域的样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-textarea/library/src/components/Textarea/useTextareaStyles.styles.ts

这是一个下拉框示例的 HTML 结构，可以参考这个结构来编写 CSS 样式，注意这个下拉框是可以输入自定义内容的，并且有动画效果，参考样式
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Dropdown/useDropdownStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Listbox/useListboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/OptionGroup/useOptionGroupStyles.styles.ts

```html
<div
  id="cbid.passwall2.cfg0c3fd6.remote_dns"
  class="cbi-dropdown focus"
  optional=""
  tabindex="0"
  data-idref="467f079e"
  data-changed="true"
  open=""
>
  <ul
    tabindex="-1"
    class="dropdown"
    style="max-height: 413.99px; bottom: 39.9167px;"
  >
    <li placeholder="" tabindex="0">-- Please choose --</li>
    <li data-value="1.1.1.1" tabindex="0">1.1.1.1 (CloudFlare)</li>
    <li data-value="1.1.1.2" tabindex="0">1.1.1.2 (CloudFlare-Security)</li>
    <li data-value="8.8.4.4" tabindex="0">8.8.4.4 (Google)</li>
    <li data-value="8.8.8.8" tabindex="0">8.8.8.8 (Google)</li>
    <li data-value="9.9.9.9" tabindex="0">9.9.9.9 (Quad9-Recommended)</li>
    <li data-value="149.112.112.112" tabindex="0">
      149.112.112.112 (Quad9-Recommended)
    </li>
    <li data-value="208.67.220.220" tabindex="0">208.67.220.220 (OpenDNS)</li>
    <li data-value="208.67.222.222" class="" tabindex="0">
      208.67.222.222 (OpenDNS)
    </li>
    <li
      data-value="127.0.0.1:5336"
      class=""
      display="0"
      selected=""
      tabindex="0"
    >
      127.0.0.1:5336
    </li>
    <li data-value="-" unselectable="">
      <input
        type="text"
        class="create-item-input"
        placeholder="-- custom --"
        inputmode="text"
        enterkeyhint="done"
      />
    </li>
  </ul>
  <ul tabindex="-1" class="preview" style="">
    <li placeholder="">-- Please choose --</li>
    <li data-value="1.1.1.1">1.1.1.1 (CloudFlare)</li>
    <li data-value="1.1.1.2">1.1.1.2 (CloudFlare-Security)</li>
    <li data-value="8.8.4.4">8.8.4.4 (Google)</li>
    <li data-value="8.8.8.8">8.8.8.8 (Google)</li>
    <li data-value="9.9.9.9">9.9.9.9 (Quad9-Recommended)</li>
    <li data-value="149.112.112.112">149.112.112.112 (Quad9-Recommended)</li>
    <li data-value="208.67.220.220">208.67.220.220 (OpenDNS)</li>
    <li data-value="208.67.222.222" class="">208.67.222.222 (OpenDNS)</li>
    <li data-value="127.0.0.1:5336" class="" display="0" selected="">
      127.0.0.1:5336
    </li>
    <li data-value="-" unselectable="">
      <input
        type="text"
        class="create-item-input"
        placeholder="-- custom --"
        inputmode="text"
        enterkeyhint="done"
      />
    </li>
  </ul>
  <span class="more" tabindex="-1">···</span
  ><span class="open" tabindex="-1">▾</span>
  <div tabindex="0">
    <input
      type="hidden"
      name="cbid.passwall2.cfg0c3fd6.remote_dns"
      value="127.0.0.1:5336"
    />
  </div>
</div>
```

优化分组的 Tab
参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabs/library/src/components/Tab/useTabStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabs/library/src/components/TabList/useTabListStyles.styles.ts

结构：
（通常位于标题下方，为横向的 tab）

```html
<ul class="cbi-tabmenu">
  <li class="cbi-tab" data-tab="general"><a href="#">常规设置</a></li>
  <li class="cbi-tab-disabled" data-tab="logging"><a href="#">日志记录</a></li>
  <li class="cbi-tab-disabled" data-tab="timesync"><a href="#">时间同步</a></li>
  <li class="cbi-tab-disabled" data-tab="language">
    <a href="#">语言和界面</a>
  </li>
  <li class="cbi-tab-disabled" data-tab="zram"><a href="#">ZRam 设置</a></li>
</ul>
```

或者：
（通常为卡片顶部）

```html
<div id="tabmenu" style="">
  <ul class="tabs">
    <li class="tabmenu-item-syslog ">
      <a href="/cgi-bin/luci/admin/status/logs/syslog">系统日志</a>
    </li>
    <li class="tabmenu-item-dmesg  active">
      <a href="/cgi-bin/luci/admin/status/logs/dmesg">内核日志</a>
    </li>
  </ul>
</div>
```

请重写并实现 FluentUI 的 button 样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/SplitButton/useSplitButtonStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/MenuButton/useMenuButtonStyles.styles.ts

请尝试优化侧边栏菜单样式，实现 FluentUI 风格

先参考 cascade.css 中对应部分，然后在 fluent.css 中编写新的样式，并对 cascade 中已有的样式进行覆盖(!important)

结构

```html
<ul class="nav active">
    <li>
        <a href="/cgi-bin/luci/admin/dashboard" class="food" data-title="Dashboard">主页</a>
    </li>
    <li>
        <a href="/cgi-bin/luci/admin/network_guide" class="food" data-title="NetworkGuide">网络向导</a>
    </li>
    <li class="slide">
        <a href="/cgi-bin/luci/admin/status" class="menu" data-title="Status">
            状态</a>
        <ul class="slide-menu">
            <li>
                <a href="/cgi-bin/luci/admin/status/overview" class="food" data-title="Overview">概览</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/status/routes" class="food" data-title="Routing">路由</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/status/nftables" class="food" data-title="Firewall">防火墙</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/status/logs" class="food" data-title="System_Log">系统日志</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/status/processes" class="food" data-title="Processes">系统进程</a>
            </li>  </ul>
    </li>
    <li class="slide active">
        <a href="/cgi-bin/luci/admin/system" class="menu active" data-title="System">系统</a>
        <ul class="slide-menu active">
            <li>
                <a href="/cgi-bin/luci/admin/system/system" class="food" data-title="System">系统</a>
            </li>
            <li class="null active">
                <a href="/cgi-bin/luci/admin/system/admin" class="food active" data-title="Administration">管理权</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/system/package-manager" class="food" data-title="Software">软件包</a>
            </li>
            <li>
                <a href="/cgi-bin/luci/admin/system/startup" class="food" data-title="Startup">启动项</a>
            </li> </ul>
    </li> 
    <li>
        <a href="/cgi-bin/luci/admin/logout" class="food" data-title="Log_out">退出</a>
    </li>
</ul>
```

---

## Fluent UI 设计规范与实现要点

### 1. 整体设计原则

- **一致性优先**: 所有组件必须遵循 Microsoft Fluent UI Design System 的设计语言
- **双主题支持**: 所有样式必须同时实现 Light 和 Dark 两个主题版本
- **样式隔离**: 使用 `!important` 强制覆盖 cascade.css 中的默认样式
- **精确选择器**: 避免过于宽泛的 CSS 选择器影响不相关元素，使用 `:has()`, `:not()` 等进行精确匹配

### 2. 核心设计参数

#### 尺寸规范

- **按钮高度**: 32px (medium), 24px (small)
- **输入框高度**: 32px (min-height)
- **文本域高度**: 52px (min-height)
- **圆角半径**: 4px (标准组件)
- **间距单位**: 基于 4px 网格系统

#### 颜色系统

**Light Theme:**

- Primary: `#0078d4` (蓝色)
- Text: `#323130` (深灰)
- Border: `#8a8886` (中灰)
- Border-Bottom: `#201f1e` (深灰 - 强调底边)
- Disabled: `#c8c6c4` (浅灰)

**Dark Theme:**

- Primary: `#0078d4` (保持一致)
- Text: `#f5f5f5` (亮白)
- Border: `#5c5c5c` (中灰)
- Border-Bottom: `#dadada` (亮灰 - 强调底边)
- Disabled: `#3d3d3d` (深灰)

#### 动画参数

- **快速交互**: `cubic-bezier(0.33, 0, 0.67, 1)` - 持续时间 0.05s-0.1s
- **平滑过渡**: `cubic-bezier(0.4, 0, 0.23, 1)` - 持续时间 0.2s
- **波纹效果**: `scaleX(0)` → `scaleX(1)` 用于焦点指示器

### 3. 组件设计逻辑

#### 输入控件 (Input/Textarea)

- **底部指示器**: 使用 `background-image: linear-gradient()` 创建 2px 高的底部焦点线
- **动画**: 通过 `background-size: 0 → 100%` 实现波纹扩散效果
- **状态层次**: Normal → Hover (加深边框) → Focus (蓝色底边 + 波纹) → Disabled (透明背景)

#### 复选框 (Checkbox)

- **双场景设计**:
  - 表单场景: Switch 样式 (40x20px，滑动动画)
  - 表格场景: 传统勾选框 (18x18px，checkmark 图标)
- **动画**: `translateX(20px)` 滑块移动 + SVG checkmark 显示/隐藏

#### 下拉控件 (Dropdown/Select)

- **箭头统一**: 所有下拉组件使用相同的 SVG 箭头 (12x12px 容器，V 形路径)
- **箭头规格**: `stroke-width: 1.5px`, 路径 `M 3,4.5 L 6,7.5 L 9,4.5`
- **定位**: `right 13px center` 确保在 padding 区域内不突出
- **旋转动画**: `.cbi-dropdown` 打开时箭头 180° 旋转

#### 按钮系统

- **选择器隔离**: 使用 `:not(.cbi-button)` 排除 LuCI 原生按钮，避免样式冲突
- **变体设计**:
  - Subtle (默认): 透明背景，hover 时浅色背景
  - Primary: 蓝色背景，白色文字
  - Danger: 红色文字，hover 时浅红背景
  - Outline: 边框样式

#### 密码输入组 (Password Input with Toggle)

- **容器**: `.control-group:has(> input.cbi-input-password)` 精确选择
- **布局**: Flexbox，输入框 `flex: 1`，按钮固定 32x32px
- **连接**: 输入框右侧圆角为 0，按钮左侧圆角为 0，移除中间边框
- **焦点同步**: 输入框聚焦时，按钮边框颜色同步变化

#### Tab 分组

- **双结构支持**: `.cbi-tabmenu` 和 `.tabmenu` 两种 HTML 结构
- **指示器**: `::after` 伪元素实现底部 2px 高的蓝色指示线
- **波纹动画**: 选中时指示器从 `scaleX(0)` 扩展到 `scaleX(1)`
- **状态区分**: `.cbi-tab` (选中), `.cbi-tab-disabled` (未选中但可点击)

### 4. 实现技术要点

#### 使用 `:has()` 选择器

- 精确匹配包含特定子元素的父元素
- 避免样式泄漏到不相关组件
- 示例: `.control-group:has(> input.cbi-input-password)` 只影响密码输入组

#### SVG Data URI 技术

- 用于复杂图形 (checkmark, 箭头)
- 优势: 清晰锐利，颜色可动态调整，无需外部文件
- 编码: 使用 `%23` 代替 `#` (颜色值)

#### 伪元素动画

- `::before` / `::after` 创建装饰性元素
- 结合 `transform`, `opacity`, `scaleX` 实现流畅动画
- 独立于主元素，不影响布局

#### 渐变技巧

- 焦点指示器: `linear-gradient(0deg, color, color)` + `background-size` 动画
- 边框模拟: 多个渐变叠加创建复杂边框效果

### 5. 常见问题解决方案

#### 箭头突出问题

- **原因**: 使用 `calc(100% - Xpx)` 计算位置不够精确
- **解决**: 改用 `right Xpx center` 关键字定位
- **验证**: 确保箭头在 padding 区域内 (padding-right: 32px → 箭头位置 right 13px)

#### 对齐问题

- **原因**: 固定高度与弹性布局冲突
- **解决**: 使用 `align-self: stretch` 或 `height: auto` + flexbox
- **容器**: `align-items: center` 实现垂直居中

#### 样式冲突

- **原因**: 选择器过于宽泛
- **解决**: 使用组合选择器 `:has()`, `:not()`, 直接子选择器 `>`
- **测试**: 验证不影响其他相似结构的元素

### 6. 开发流程建议

1. **设计先行**: 参考 Fluent UI 官方组件规范和 TypeScript 样式文件
2. **双主题同步**: Light 主题完成后立即实现 Dark 主题对应样式
3. **边界测试**: 测试 hover, focus, active, disabled 所有状态
4. **场景验证**: 在实际页面中验证，确保不影响其他组件
5. **文档记录**: 记录关键设计决策和特殊处理方案

### 7. 参考资源

- Fluent UI React Components: https://github.com/microsoft/fluentui/tree/master/packages/react-components
- Windows 11 Design Principles: https://docs.microsoft.com/en-us/windows/apps/design/
- CSS Grid & Flexbox: 用于精确布局控制
- CSS Custom Properties: 考虑使用 CSS 变量统一管理颜色和尺寸（未来优化）

```

```
